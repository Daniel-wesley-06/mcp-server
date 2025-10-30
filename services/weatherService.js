import axios from "axios";

export const fetchWeather = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const { data } = await axios.get(url);
  return {
    city: data.name,
    temperature: data.main.temp,
    condition: data.weather[0].description,
  };
};
