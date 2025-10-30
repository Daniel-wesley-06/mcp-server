export const fetchStockData = async (symbol) => {
  const mockData = {
    AAPL: { price: 220.15, change: "+1.2%" },
    TSLA: { price: 180.45, change: "-0.5%" },
    GOOGL: { price: 134.72, change: "+0.8%" },
  };
  
  // Simulate async fetch
  await new Promise((r) => setTimeout(r, 300));
  
  return mockData[symbol.toUpperCase()] || { error: "Stock not found" };
};
