import type { Progression } from '../types';

const mockProgression: Progression = [
  { chord_name: "Cmaj7" },
  { chord_name: "Am7" },
  { chord_name: "Dm7" },
  { chord_name: "G7" }
];

const isDevelopment = process.env.NODE_ENV === 'development';

async function postToApi<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
  if (isDevelopment && (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'PLACEHOLDER_API_KEY')) {
    console.log(`🎵 Mode développement: utilisation de données mockées pour ${endpoint}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (endpoint === 'generateProgression') {
      return { chords: mockProgression } as T;
    }
  }

  const response = await fetch(`/api/${endpoint.replace('generateProgression', 'generate-progression')}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown server error occurred.' })) as { message: string };
    throw new Error(errorData.message || 'The request to the server failed.');
  }

  return response.json();
}

export async function generateChordProgression(genre: string, decade: number, musicKey: string, numChords: number): Promise<Progression> {
  try {
    const result = await postToApi<{ chords: Progression }>('generateProgression', { 
      key: musicKey, 
      style: genre, 
      numChords,
      decade
    });
    return result.chords;
  } catch (error) {
    console.error("Error fetching chord progression:", error);
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred while generating the chord progression.");
  }
}