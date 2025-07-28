# Finnhub API Integration

This project now integrates with the Finnhub API to fetch real-time stock data.

## Setup

1. **API Key**: The Finnhub API key is already configured in the code: `d21p7ehr01qquiqnhoq0d21p7ehr01qquiqnhoqg`

2. **Environment Variable** (Optional): You can also set it as an environment variable:
   ```bash
   VITE_FINNHUB_API_KEY=your_api_key_here
   ```

## Features

### Real-time Stock Data
- **Current Price**: Live stock prices
- **Price Changes**: Daily change and percentage change
- **Market Data**: High, low, open prices
- **Company Profile**: Company information, market cap, exchange

### Visual Charts
- **Simple Chart**: Interactive candlestick-style visualization of current day's price action
- **Price Indicators**: Visual representation of price movements and ranges
- **Real-time Updates**: Charts update automatically with live data

### News Integration
- **Company News**: Recent news related to the searched stock
- **Market News**: General market news
- **News Links**: Direct links to news articles

### AI Predictions
- **1-Day Forecast**: Short-term price predictions
- **7-Day Forecast**: Medium-term predictions
- **Confidence Scores**: Prediction confidence levels

## API Endpoints Used

1. **Stock Quote**: `/quote` - Real-time stock price data
2. **Company Profile**: `/stock/profile2` - Company information
3. **Company News**: `/company-news` - News related to specific company
4. **Market News**: `/news` - General market news
5. **Candles**: `/stock/candle` - Historical price data (Premium feature)

## Chart Implementation

### Current Implementation
- **Simple Chart**: Uses current day's OHLC data to create a candlestick visualization
- **Price Indicators**: Visual representation of price movements using available data
- **Real-time Updates**: Charts refresh automatically with live quote data

### Historical Charts (Premium)
- **Full Candlestick Charts**: Available with Finnhub premium subscription
- **Multiple Timeframes**: 1D, 1W, 1M, 3M views
- **Technical Indicators**: RSI, MACD, moving averages (premium feature)

### Free Tier Limitations
- Historical candle data requires premium subscription
- Current implementation provides visual charts using available real-time data
- All other features (quotes, news, profiles) work with free tier

## Usage

1. **Search Stocks**: Enter any stock symbol (e.g., AAPL, TSLA, GOOGL)
2. **View Dashboard**: See real-time data, predictions, and news
3. **Popular Stocks**: Click on popular stock buttons for quick access

## Data Refresh

- **Stock Quotes**: Auto-refresh every 30 seconds
- **Company Profile**: Refresh every 5 minutes
- **News**: Refresh every 10 minutes

## Error Handling

The app includes proper error handling for:
- Invalid stock symbols
- API rate limits
- Network errors
- Missing data

## Rate Limits

Finnhub API has rate limits:
- **Free Tier**: 60 calls/minute
- **Paid Tiers**: Higher limits available

The app is optimized to minimize API calls through caching and smart refresh intervals. 