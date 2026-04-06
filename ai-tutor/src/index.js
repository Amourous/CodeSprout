const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return new Response("Only POST requests are accepted.", { status: 405, headers: CORS_HEADERS });
    }

    try {
      const data = await request.json();
      const userMessage = data.message;
      const contextCode = data.code || "";

      if (!userMessage) {
        return new Response(JSON.stringify({ error: "Message is required" }), { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
      }

      const systemPrompt = `You are Sprout, a friendly and encouraging AI tutor for children learning web development.
Your job is to answer questions about HTML, CSS, and JavaScript. 
IMPORTANT RULES:
1. Speak cheerfully and simply. Use emojis!
2. Provide HINTS, but NEVER write the exact complete code for them to copy-paste.
3. If they ask about something completely unrelated to coding, politely redirect them back to coding.
4. Keep the response very short (under 3 sentences).
The user is currently writing this code:\n${contextCode}`;

      const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
      });

      return new Response(JSON.stringify({ response: response.response }), {
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
      });
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ error: "An error occurred processing the AI request." }), { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
    }
  }
};
