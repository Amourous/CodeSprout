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

    // Get Cloudflare credentials from environment variables
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return new Response(JSON.stringify({ 
        error: "CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN environment variables must be configured on Netlify." 
      }), {
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

    // Call Cloudflare Workers AI API directly
    const model = "@cf/meta/llama-3.1-8b-instruct";
    const cfUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
    
    const response = await fetch(cfUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Cloudflare API returned ${response.status}: ${errText}`);
    }

    const data = await response.json();
    
    // Extract response content from Cloudflare's response structure
    const candidateText = data.result?.response || "Hmm, my brain feels fuzzy! Try asking again? 🤔";

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
