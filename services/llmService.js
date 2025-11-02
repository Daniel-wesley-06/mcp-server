// services/llmService.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

/**
 * Ask LLM to parse natural query into a JSON "plan" of tool calls.
 * The LLM must return strict JSON: { actions: [{ tool: "weather", params: { city: "Chennai" }}, ...] }
 */
export const parseQueryToTools = async (query) => {
  const system = `You are a tool-router assistant. When given a user query, output ONLY valid JSON describing what tools to call.
Return an object with "actions": an array of actions. Each action has "tool" (one of "weather","news","stock"), and "params" (object). If you don't need a tool return {"actions": []}.
No extra text, only JSON.`;

  const userPrompt = `User query: "${query}"
Rules:
- Extract which tools to call and required params.
- For weather: tool="weather", params: { "city": "<cityName>" }
- For news: tool="news", params: { "topic": "<topic>" }
- For stock: tool="stock", params: { "symbol": "<SYMBOL>" }
- If multiple items are requested, list multiple actions in order.
Return: valid JSON only.`;

  // Use Chat Completions
  const completion = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt }
    ],
    max_tokens: 400,
    temperature: 0
  });

  // Get first message text
  const text = completion.choices?.[0]?.message?.content || "";

  // Try parse JSON robustly
  try {
    const jsonStart = text.indexOf("{");
    const jsonText = jsonStart >= 0 ? text.slice(jsonStart) : text;
    const parsed = JSON.parse(jsonText);
    if (!parsed.actions) parsed.actions = [];
    return parsed;
  } catch (err) {
    // Fallback: no parse — return empty actions
    console.error("LLM parse error:", err, "raw:", text);
    return { actions: [] };
  }
};
