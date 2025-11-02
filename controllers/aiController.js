// controllers/aiController.js
import { parseQueryToTools } from "../services/llmService.js";
import { fetchWeather } from "../services/weatherService.js";
import { fetchNews } from "../services/newsService.js";
import { fetchStockData } from "../services/stockService.js";

export const handleAIQuery = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Missing query" });

    const plan = await parseQueryToTools(query);
    const actions = plan.actions || [];

    const result = {};
    for (const action of actions) {
      const tool = action.tool;
      const params = action.params || {};

      if (tool === "weather") {
        const city = params.city || params.q || "New York";
        result.weather = await fetchWeather(city);
      } else if (tool === "news") {
        const topic = params.topic || params.q || "general";
        result.news = await fetchNews(topic);
      } else if (tool === "stock") {
        const symbol = (params.symbol || params.ticker || "AAPL").toUpperCase();
        result.stock = await fetchStockData(symbol);
      } else {
        // unknown tool — ignore or log
        console.warn("Unknown tool requested by LLM:", tool);
      }
    }

    // If LLM returned nothing, fallback to simple rule-based
    if (actions.length === 0) {
      // simple fallback: try find keywords
      const lower = query.toLowerCase();
      if (lower.includes("weather")) result.weather = await fetchWeather("New York");
      if (lower.includes("news")) result.news = await fetchNews("general");
      if (lower.includes("stock") || lower.includes("price")) result.stock = await fetchStockData("AAPL");
    }

    res.json({
      success: true,
      query,
      actions,
      result
    });
  } catch (err) {
    console.error("AI handler error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

