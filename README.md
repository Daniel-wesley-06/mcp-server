# MCP Server - Model Context Protocol Server

A modular Node.js backend server that provides unified API endpoints for Weather, News, Stock Market, and AI services. Designed as a backend connector for AI models, enabling structured tool execution through natural language query parsing.

## Overview

MCP Server (Model Context Protocol Server) acts as an intelligent middleware layer between external data services and AI systems. It integrates multiple third-party APIs and provides:

- Standardized REST endpoints
- Redis-based caching
- Natural language to structured tool-call parsing via OpenAI
- Clean, modular backend architecture

The system is built to handle real-world API interactions efficiently with caching strategies based on data volatility.

## Tech Stack

### Runtime & Framework
- **Node.js** (ES Modules)
- **Express.js**

### Libraries
- **axios** – HTTP client for external API calls
- **dotenv** – Environment variable management
- **ioredis** – Redis client for caching
- **openai** – OpenAI API integration
- **nodemon** – Development auto-restart

## Architecture

The project follows a modular backend structure:

```
mcp-server/
├── routes/        → API route definitions
├── controllers/   → Request handling logic
├── services/      → External API integrations & business logic
├── utils/         → Shared utilities
├── server.js      → Application entry point
├── package.json   → Dependencies and scripts
└── .env           # Environment variables
```

### Design Principles
- Separation of concerns
- Service-layer abstraction for external APIs
- Centralized error handling
- Volatility-based caching strategy
- AI-powered request parsing

## Features

### API Integrations

#### Weather Service
- OpenWeatherMap integration
- Redis caching (TTL: 2 minutes)

#### News Service
- NewsAPI integration
- Returns top 5 articles by topic
- Cached responses

#### Stock Service
- API Ninjas stock data
- Redis caching (TTL: 1 minute)

#### AI Service
- OpenAI integration
- Parses natural language into structured tool calls
- Acts as an intelligent query router

## API Endpoints

### Weather
```http
GET /api/weather/:city
```
Returns weather data for a specified city.

### News
```http
GET /api/news/:topic
```
Returns top 5 news articles for a topic.

### Stocks
```http
GET /api/stocks/:symbol
```
Returns stock price data for a given symbol.

### AI Parsing
```http
POST /api/ai/parse
```
Parses natural language input into structured tool calls.

## Caching Strategy

The server uses Redis with differentiated TTL values based on data volatility:

| Service | TTL | Reason |
|---------|-----|---------|
| Weather | 2 minutes | Moderate volatility |
| Stocks | 1 minute | High volatility |
| News | Short-lived caching | Frequently updated |

This reduces external API load and improves response times.

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=3000
WEATHER_API_KEY=your_key
NEWS_API_KEY=your_key
STOCK_API_KEY=your_key
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4o-mini
REDIS_URL=redis://localhost:6379
```

**Defaults:**
- `OPENAI_MODEL` → `gpt-4o-mini`
- `REDIS_URL` → `redis://localhost:6379`

## Installation & Setup

### Clone the repository:
```bash
git clone https://github.com/Daniel-wesley-06/mcp-server.git
cd mcp-server
```

### Install dependencies:
```bash
npm install
```

### Start the server:
```bash
npm start
```

### Development mode (auto-restart):
```bash
npm run dev
```

The server runs on the port defined in the `PORT` environment variable.

## Key Learnings

- Implementing volatility-based caching strategies
- Integrating LLMs as routing layers for backend systems
- Structuring backend services for extensibility
- Managing secure external API integrations
- Designing an AI-ready backend connector pattern

## Future Improvements

- Health check endpoint
- Request logging middleware
- Basic test coverage
- Docker support
- CI/CD integration
