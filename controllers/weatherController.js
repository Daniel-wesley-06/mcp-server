import { fetchWeather } from "../services/weatherService.js";

export const getWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const weather = await fetchWeather(city);
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
