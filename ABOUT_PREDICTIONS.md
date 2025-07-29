# AI-Powered Stock Predictions

This application provides AI-powered stock price predictions using:

- **Real-time and historical stock data** is fetched from the Alpha Vantage API
- **30 days of historical data** including open, close, high, low prices, and trading volume
- **Live market data** for current price analysis

## Technical Analysis Algorithms
The system calculates **real technical indicators** using historical data:

### RSI (Relative Strength Index)
- Measures momentum and identifies overbought/oversold conditions
- Values above 70 indicate overbought, below 30 indicate oversold
- Calculated using 14-day price changes

### Moving Averages
- **SMA20**: 20-day Simple Moving Average for short-term trends
- **SMA50**: 50-day Simple Moving Average for long-term trends
- **EMA**: Exponential Moving Averages for MACD calculation

### MACD (Moving Average Convergence Divergence)
- Combines 12-day and 26-day EMAs to identify momentum changes
- Positive MACD indicates upward momentum, negative indicates downward

### Bollinger Bands
- Upper and lower bands based on 20-day SMA ± 2 standard deviations
- Price near upper band suggests overbought, near lower band suggests oversold

### Price Momentum
- 10-day momentum calculation showing recent price strength
- Positive values indicate upward momentum, negative indicates downward

## Prediction Logic
The system analyzes multiple factors to generate predictions:

1. **RSI Analysis**: Oversold conditions suggest potential bounce, overbought suggests pullback
2. **Moving Average Trends**: SMA20 > SMA50 indicates bullish trend
3. **MACD Signals**: Positive MACD suggests upward momentum
4. **Bollinger Band Position**: Price outside bands suggests reversal potential
5. **Volume Analysis**: High volume confirms trend strength
6. **Momentum Assessment**: Recent price momentum influences direction

## Confidence Scoring
- **Base confidence**: 50% for neutral conditions
- **+10 points** for strong RSI signals (oversold/overbought)
- **+5 points** for moving average alignment
- **+5 points** for MACD confirmation
- **+5 points** for high volume
- **+10 points** for Bollinger Band extremes
- **+5 points** for strong momentum
- **Maximum confidence**: 95%

## Timeframes
- **1-Day**: Short-term intraday predictions
- **7-Day**: Medium-term weekly forecasts
- **30-Day**: Long-term monthly projections

## Real-Time Updates
- Predictions update automatically as new data becomes available
- Historical data refreshes every 5 minutes
- Technical indicators recalculate with each update

## Accuracy & Limitations
- **Based on real historical data** and proven technical analysis
- **Requires 30+ days of data** for reliable predictions
- **May not account for sudden market events** or breaking news
- **Should be used as supplementary analysis**, not financial advice
- **Past performance doesn't guarantee future results**

## Implementation Details
- **Real calculations**: All indicators calculated from actual price data
- **No simulated data**: Predictions based on genuine market analysis
- **Multiple timeframes**: 1D, 7D, and 30D predictions available
- **Detailed reasoning**: Each prediction includes specific analysis points
- **Confidence scoring**: Transparent confidence levels for each forecast

This feature provides **genuine technical analysis** using real market data to help users make informed investment decisions.
