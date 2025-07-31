import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import type { ChordSubstitution } from '@/types';

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: 'API key not configured' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey });

  try {
    const body = await request.json();
    const { chord, key, style } = body;

    const prompt = `Suggest 3-5 chord substitutions for the chord ${chord} in the key of ${key} for ${style} music. 
    
    Return ONLY a valid JSON array of chord substitution objects with this exact structure:
    [
      {
        "chord_name": "Dm7",
        "roman_numeral": "ii7",
        "voicing_suggestion": "D-F-A-C (root position)",
        "function": "Subdominant",
        "explanation": "This is a diatonic substitution that maintains the subdominant function while adding color through the minor 7th."
      }
    ]
    
    Make sure each substitution object has all five properties: chord_name, roman_numeral, voicing_suggestion, function, and explanation.
    Provide musical theory explanations for why each substitution works.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const substitutions: ChordSubstitution[] = JSON.parse(completion.choices[0].message.content || '[]');

    return NextResponse.json({ substitutions });
  } catch (error) {
    console.error("Error in generateSubstitutions:", error);
    return NextResponse.json({ message: (error as Error).message || "An error occurred while generating chord substitutions" }, { status: 500 });
  }
}