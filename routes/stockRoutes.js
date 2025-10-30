import express from "express";
import { getStockData } from "../controllers/stockController.js";

const router = express.Router();

// Example: /api/stocks?symbol=AAPL
router.get("/", getStockData);

export default router;
