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
    const { chord, key, style } = JSON.parse(event.body);
    
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

    const substitutions = JSON.parse(completion.choices[0].message.content);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ substitutions }),
    };
  } catch (error) {
    console.error("Error in generateSubstitutions:", error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: error.message || "An error occurred while generating chord substitutions" }),
    };
  }
};