const ort = require('onnxruntime-node');
const path = require('path');

// Token to chord mapping from token_to_chord.ts
const tokenToChord = {
  0: 'N.C.',
  1: 'C:maj',
  2: 'C#:maj',
  3: 'D:maj',
  4: 'D#:maj',
  5: 'E:maj',
  6: 'F:maj',
  7: 'F#:maj',
  8: 'G:maj',
  9: 'G#:maj',
  10: 'A:maj',
  11: 'A#:maj',
  12: 'B:maj',
  13: 'C:min',
  14: 'C#:min',
  15: 'D:min',
  16: 'D#:min',
  17: 'E:min',
  18: 'F:min',
  19: 'F#:min',
  20: 'G:min',
  21: 'G#:min',
  22: 'A:min',
  23: 'A#:min',
  24: 'B:min',
  // Add all other tokens up to 383
};

// Genres and decades from conditions.ts
const genres = ['Rock', 'Folk', 'Pop', 'Soundtrack', 'R&B, Funk & Soul', 'Country', 'Jazz', 'Experimental', 'Religious Music', 'Reggae & Ska', 'Hip Hop', 'Electronic', 'Comedy', 'Metal', 'Blues', 'World Music', 'Disco', 'Classical', 'New Age', 'Darkwave'];
const decades = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

// Mood to genre mapping
const moodToGenre = {
  'happy': 'Pop',
  'sad': 'Folk',
  'energetic': 'Rock',
  'calm': 'New Age',
  // Add more
};

function getStyleVector(genre, decade) {
  const style = new Float32Array(genres.length + decades.length).fill(0);
  const genreIndex = genres.indexOf(genre);
  if (genreIndex !== -1) style[genreIndex] = 1;
  const decadeIndex = decades.indexOf(decade) + genres.length;
  if (decadeIndex >= genres.length) style[decadeIndex] = 1;
  return style;
}

function detokenize(token) {
  const baseToken = token % 384;
  const variant = Math.floor(token / 384);
  let chord = tokenToChord[baseToken] || 'C:maj';
  if (variant > 0) chord += ` (${variant})`;
  return chord;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }
  try {
    const body = JSON.parse(event.body);
    const { style, numChords } = body;
    const mood = style.split(' ')[0].toLowerCase();
    const genre = moodToGenre[mood] || 'Pop';
    const decade = 2000; // Fixed for now
    const styleVector = getStyleVector(genre, decade);

    const modelPath = path.join(process.cwd(), '..', '..', 'next-app', 'public', 'models', 'conditional_small.onnx');
    const session = await ort.InferenceSession.create(modelPath);

    const sequence = [];
    for (let i = 0; i < numChords; i++) {
      const inputLength = Math.min(sequence.length, 256);
      const inputData = new BigInt64Array(256).fill(BigInt(0));
      sequence.slice(-inputLength).forEach((tok, idx) => {
        inputData[idx] = BigInt(tok);
      });
      const inputs = {
        'input.1': new ort.Tensor('int64', inputData, [1, 256]),
        'onnx::Gemm_1': new ort.Tensor('float32', styleVector, [1, styleVector.length]),
      };
      const outputs = await session.run(inputs);
      const outputKey = Object.keys(outputs)[0];
      const logits = outputs[outputKey].data;
      const nextToken = logits.reduce((maxIdx, val, idx) => val > logits[maxIdx] ? idx : maxIdx, 0);
      sequence.push(nextToken);
    }

    const chords = sequence.map(token => ({
      chord_name: detokenize(token),
      roman_numeral: '',
      voicing_suggestion: '',
      function: ''
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ chords })
    };
  } catch (error) {
    console.error('Error in generateProgression:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: error.message || 'An error occurred' })
    };
  }
};