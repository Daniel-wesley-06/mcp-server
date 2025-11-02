import axios from "axios";
import redis from "../utils/redisClient.js";

const API_KEY = process.env.STOCK_API_KEY;
const TTL = 60; // cache 1 min

export const fetchStockData = async (symbol) => {
  const cacheKey = `stock:${symbol.toUpperCase()}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log(`♻️ Cache hit for ${cacheKey}`);
    return JSON.parse(cached);
  }

  console.log(`📈 Fetching stock data from API for ${symbol}`);
  const { data } = await axios.get(
    `https://api.api-ninjas.com/v1/stockprice?ticker=${symbol}`,
    { headers: { "X-Api-Key": API_KEY } }
  );

  await redis.set(cacheKey, JSON.stringify(data), "EX", TTL);
  return data;
};

