import { fetchNews } from "../services/newsService.js";

export const getNews = async (req, res) => {
  try {
    const { topic } = req.params;
    const news = await fetchNews(topic);
    res.json({ topic, news });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
