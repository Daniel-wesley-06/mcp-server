import axios from "axios";

export const fetchNews = async (topic) => {
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${topic}&language=en&apiKey=${apiKey}`;
  const { data } = await axios.get(url);
  return data.articles.slice(0, 5).map(a => ({
    title: a.title,
    source: a.source.name,
    url: a.url
  }));
};
