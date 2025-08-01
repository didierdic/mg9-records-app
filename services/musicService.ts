import type { Progression, Chord } from '../types';

// Données mockées pour le développement
const mockProgression: Progression = [
  { chord_name: "Cmaj7", roman_numeral: "Imaj7", voicing_suggestion: "C-E-G-B", function: "Tonic" },
  { chord_name: "Am7", roman_numeral: "vi7", voicing_suggestion: "A-C-E-G", function: "Relative minor" },
  { chord_name: "Dm7", roman_numeral: "ii7", voicing_suggestion: "D-F-A-C", function: "Subdominant" },
  { chord_name: "G7", roman_numeral: "V7", voicing_suggestion: "G-B-D-F", function: "Dominant" }
];



const isDevelopment = import.meta.env.DEV;

async function postToApi<T>(endpoint: string, data: any): Promise<T> {
  // En mode développement, utiliser des données mockées si pas de clé API
  if (isDevelopment) {
    console.log(`🎵 Mode développement: utilisation de données mockées pour ${endpoint}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un délai réseau
    
    if (endpoint === 'generateProgression') {
      return { chords: mockProgression } as T;
    }
  }

  const response = await fetch(`/.netlify/functions/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown server error occurred.' }));
    throw new Error(errorData.message || 'The request to the server failed.');
  }

  return response.json();
}

export async function generateChordProgression(mood: string, musicKey: string, complexity: string): Promise<Progression> {
  try {
    // Adapter les paramètres pour correspondre aux fonctions Netlify
    const result = await postToApi<{ chords: Progression }>('generateProgression', { 
      key: musicKey, 
      style: `${mood} with ${complexity} complexity`, 
      numChords: 4 
    });
    return result.chords;
  } catch (error) {
     console.error("Error fetching chord progression:", error);
     throw new Error(error instanceof Error ? error.message : "An unknown error occurred while generating the chord progression.");
  }
}