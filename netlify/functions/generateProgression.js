const { OpenAI } = require("openai");

exports.handler = async (event) => {
  // Gérer les requêtes OPTIONS pour CORS
  if (event.httpMethod === "OPTIONS") {
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

  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: "API key not configured" })
    };
  }

  const openai = new OpenAI({ apiKey });

  try {
    const { key, style, numChords } = JSON.parse(event.body);
    
    const prompt = `Generate a chord progression in the key of ${key} for ${style} music with ${numChords} chords. 
    
    Return ONLY a valid JSON array of chord objects with this exact structure:
    [
      {
        "chord_name": "Cmaj7",
        "roman_numeral": "Imaj7",
        "voicing_suggestion": "C-E-G-B (root position)",
        "function": "Tonic"
      }
    ]
    
    Make sure each chord object has all four properties: chord_name, roman_numeral, voicing_suggestion, and function.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const chords = JSON.parse(completion.choices[0].message.content);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ chords }),
    };
  } catch (error) {
    console.error("Error in generateProgression:", error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: error.message || "An error occurred while generating the chord progression" }),
    };
  }
};