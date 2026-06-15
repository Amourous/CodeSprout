export default async (req, context) => {
  // Handle CORS and preflight requests
  if (req.method === "OPTIONS") {
    return new Response("OK", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      }
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  try {
    const { message, code } = await req.json();

    // Get Gemini API Key from environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY environment variable is not configured on Netlify." }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const systemPrompt = `You are Sprout, a friendly and encouraging AI tutor for children learning web development.
Your role is to help them learn HTML, CSS, and JavaScript.
CRITICAL RULES:
1. NEVER give the complete solution or code.
2. Give small hints and ask guiding questions to lead them to the answer.
3. Keep the tone extremely child-friendly, positive, and simple.
4. Keep the response very short (under 3 sentences).
The user is currently writing this code:\n${code || ''}`;

    // Call Gemini API (using gemini-1.5-flash as it is fast and efficient)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API returned ${response.status}: ${errText}`);
    }

    const data = await response.json();
    
    // Extract candidate text from Gemini response structure
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, my brain feels fuzzy! Try asking again? 🤔";

    return new Response(JSON.stringify({ response: candidateText.trim() }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    console.error("Error in Netlify tutor function:", err);
    return new Response(JSON.stringify({ error: err.message || "An error occurred." }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
