import { fetchStockData } from "../services/stockService.js";

export const getStockData = async (req, res) => {
  try {
    const { symbol = "AAPL" } = req.query;
    const data = await fetchStockData(symbol);
    res.status(200).json({ success: true, symbol, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
