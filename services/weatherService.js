import axios from "axios";
import redis from "../utils/redisClient.js";

const API_KEY = process.env.WEATHER_API_KEY;
const TTL = 120; // cache 2 minutes

export const fetchWeather = async (city) => {
  const cacheKey = `weather:${city.toLowerCase()}`;

  // 1. Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log(`♻️ Cache hit for ${cacheKey}`);
    return JSON.parse(cached);
  }

  console.log(`🌤️ Fetching weather from API for ${city}`);
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  // 2. Save to cache
  await redis.set(cacheKey, JSON.stringify(data), "EX", TTL);

  return data;
};
