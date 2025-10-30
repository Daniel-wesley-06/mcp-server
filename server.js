import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";    

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/ai", aiRoutes);

app.listen(process.env.PORT, () =>
  console.log(`✅ MCP Server running on port ${process.env.PORT}`)
);
