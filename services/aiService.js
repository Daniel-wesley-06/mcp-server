import { fetchWeather } from "./weatherService.js";
import { fetchNews } from "./newsService.js";
import { fetchStockData } from "./stockService.js";

export const processAIQuery = async (query) => {
  const lower = query.toLowerCase();
  const response = {};

  if (lower.includes("weather")) {
    const cityMatch = query.match(/in (\w+)/);
    const city = cityMatch ? cityMatch[1] : "New York";
    response.weather = await fetchWeather(city);
  }

  if (lower.includes("news")) {
    response.news = await fetchNews();
  }

  if (lower.includes("stock") || lower.includes("price")) {
    const symbolMatch = query.match(/(\bAAPL\b|\bTSLA\b|\bGOOGL\b)/i);
    const symbol = symbolMatch ? symbolMatch[1].toUpperCase() : "AAPL";
    response.stock = await fetchStockData(symbol);
  }

  return {
    success: true,
    query,
    result: response,
  };
};
