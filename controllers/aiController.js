import { processAIQuery } from "../services/aiService.js";

export const handleAIQuery = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Missing query text" });

    const response = await processAIQuery(query);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
