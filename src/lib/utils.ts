import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Price formatting utilities
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPrice = (value: number): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '$0.00';
  }
  
  // For very small values (penny stocks), show more decimal places
  if (value < 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 4,
    }).format(value);
  }
  
  // For very large values, show fewer decimal places
  if (value > 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatChange = (value: number): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '$0.00';
  }
  
  const sign = value >= 0 ? '+' : '';
  return `${sign}${formatPrice(value)}`;
};

export const formatPercent = (value: number): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00%';
  }
  
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

export const formatVolume = (value: number): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  return value.toLocaleString();
};

export const formatMarketCap = (value: number): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '$0';
  }
  
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return formatCurrency(value);
};

// ===== STOCK PREDICTION ALGORITHMS =====

export interface PredictionResult {
  symbol: string;
  predictedPrice: number;
  confidence: number;
  direction: 'up' | 'down' | 'neutral';
  timeframe: '1D' | '7D' | '30D';
  reasoning: string[];
  technicalIndicators: {
    rsi: number;
    macd: number;
    sma20: number;
    sma50: number;
    bollingerUpper: number;
    bollingerLower: number;
    momentum: number;
  };
  aiInsights?: {
    sentiment: 'bullish' | 'bearish' | 'neutral';
    riskLevel: 'low' | 'medium' | 'high';
    marketConditions: string;
    keyFactors: string[];
    aiConfidence: number;
    newsSentiment: number;
    socialSentiment: number;
    institutionalActivity: string;
  };
}

// Calculate RSI (Relative Strength Index)
export function calculateRSI(prices: number[], period: number = 14): number {
  if (prices.length < period + 1) return 50; // Neutral if not enough data
  
  let gains = 0, losses = 0;
  
  for (let i = 1; i <= period; i++) {
    const change = prices[prices.length - i] - prices[prices.length - i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  
  const avgGain = gains / period;
  const avgLoss = losses / period;
  
  if (avgLoss === 0) return 100;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

// Calculate Simple Moving Average
export function calculateSMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1];
  
  const recentPrices = prices.slice(-period);
  const sum = recentPrices.reduce((a, b) => a + b, 0);
  return sum / period;
}

// Calculate Exponential Moving Average
export function calculateEMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1];
  
  const multiplier = 2 / (period + 1);
  let ema = prices[0];
  
  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
  }
  return ema;
}

// Calculate MACD
export function calculateMACD(prices: number[]): { macd: number; signal: number; histogram: number } {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  const macd = ema12 - ema26;
  
  // For simplicity, using a basic signal line calculation
  const signal = calculateEMA([macd], 9);
  const histogram = macd - signal;
  
  return { macd, signal, histogram };
}

// Calculate Bollinger Bands
export function calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2): {
  upper: number;
  middle: number;
  lower: number;
} {
  const sma = calculateSMA(prices, period);
  
  if (prices.length < period) {
    return { upper: sma, middle: sma, lower: sma };
  }
  
  const recentPrices = prices.slice(-period);
  const variance = recentPrices.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
  const standardDeviation = Math.sqrt(variance);
  
  return {
    upper: sma + (standardDeviation * stdDev),
    middle: sma,
    lower: sma - (standardDeviation * stdDev)
  };
}

// Calculate Price Momentum
export function calculateMomentum(prices: number[], period: number = 10): number {
  if (prices.length < period) return 0;
  
  const currentPrice = prices[prices.length - 1];
  const pastPrice = prices[prices.length - period - 1];
  
  return ((currentPrice - pastPrice) / pastPrice) * 100;
}

// Generate predictions using historical data
export function generatePrediction(
  symbol: string, 
  candleData: any, 
  timeframe: '1D' | '7D' | '30D' = '7D'
): PredictionResult {
  if (!candleData || !candleData.c || candleData.c.length < 30) {
    return {
      symbol,
      predictedPrice: 0,
      confidence: 30,
      direction: 'neutral',
      timeframe,
      reasoning: ['Insufficient historical data for reliable prediction'],
      technicalIndicators: {
        rsi: 50,
        macd: 0,
        sma20: 0,
        sma50: 0,
        bollingerUpper: 0,
        bollingerLower: 0,
        momentum: 0
      }
    };
  }
  
  const prices = candleData.c; // Close prices
  const volumes = candleData.v; // Volume data
  
  // Calculate technical indicators
  const rsi = calculateRSI(prices);
  const { macd } = calculateMACD(prices);
  const sma20 = calculateSMA(prices, 20);
  const sma50 = calculateSMA(prices, 50);
  const bollinger = calculateBollingerBands(prices);
  const momentum = calculateMomentum(prices);
  
  const currentPrice = prices[prices.length - 1];
  const avgVolume = volumes && volumes.length > 20 ? 
    volumes.slice(-20).reduce((a: number, b: number) => a + b, 0) / 20 : 0;
  const currentVolume = volumes && volumes.length > 0 ? volumes[volumes.length - 1] : 0;
  
  // Prediction logic
  let predictedPrice = currentPrice;
  let confidence = 50;
  let direction: 'up' | 'down' | 'neutral' = 'neutral';
  const reasoning: string[] = [];
  
  // RSI Analysis
  if (rsi < 30) {
    reasoning.push('RSI indicates oversold conditions');
    predictedPrice *= 1.02; // 2% increase
    confidence += 10;
    direction = 'up';
  } else if (rsi > 70) {
    reasoning.push('RSI indicates overbought conditions');
    predictedPrice *= 0.98; // 2% decrease
    confidence += 10;
    direction = 'down';
  }
  
  // Moving Average Analysis
  if (sma20 > sma50) {
    reasoning.push('Short-term trend is bullish (SMA20 > SMA50)');
    predictedPrice *= 1.01; // 1% increase
    confidence += 5;
    if (direction === 'neutral') direction = 'up';
  } else if (sma20 < sma50) {
    reasoning.push('Short-term trend is bearish (SMA20 < SMA50)');
    predictedPrice *= 0.99; // 1% decrease
    confidence += 5;
    if (direction === 'neutral') direction = 'down';
  }
  
  // MACD Analysis
  if (macd > 0) {
    reasoning.push('MACD is positive, indicating upward momentum');
    predictedPrice *= 1.005; // 0.5% increase
    confidence += 5;
  } else {
    reasoning.push('MACD is negative, indicating downward momentum');
    predictedPrice *= 0.995; // 0.5% decrease
    confidence += 5;
  }
  
  // Volume Analysis
  if (currentVolume > avgVolume * 1.5) {
    reasoning.push('High volume suggests strong market interest');
    confidence += 5;
  }
  
  // Bollinger Bands Analysis
  if (currentPrice < bollinger.lower) {
    reasoning.push('Price below lower Bollinger Band - potential bounce');
    predictedPrice *= 1.015; // 1.5% increase
    confidence += 10;
    if (direction === 'neutral') direction = 'up';
  } else if (currentPrice > bollinger.upper) {
    reasoning.push('Price above upper Bollinger Band - potential pullback');
    predictedPrice *= 0.985; // 1.5% decrease
    confidence += 10;
    if (direction === 'neutral') direction = 'down';
  }
  
  // Momentum Analysis
  if (momentum > 5) {
    reasoning.push('Strong positive momentum');
    predictedPrice *= 1.01; // 1% increase
    confidence += 5;
  } else if (momentum < -5) {
    reasoning.push('Strong negative momentum');
    predictedPrice *= 0.99; // 1% decrease
    confidence += 5;
  }
  
  // Adjust for timeframe
  const timeframeMultiplier = timeframe === '1D' ? 1 : timeframe === '7D' ? 7 : 30;
  const baseChange = (predictedPrice - currentPrice) / currentPrice;
  const adjustedChange = baseChange * (timeframeMultiplier / 7); // Normalize to weekly
  predictedPrice = currentPrice * (1 + adjustedChange);
  
  // Cap confidence at 95%
  confidence = Math.min(confidence, 95);
  
  return {
    symbol,
    predictedPrice: Math.round(predictedPrice * 100) / 100,
    confidence: Math.round(confidence),
    direction,
    timeframe,
    reasoning,
    technicalIndicators: {
      rsi: Math.round(rsi * 100) / 100,
      macd: Math.round(macd * 1000) / 1000,
      sma20: Math.round(sma20 * 100) / 100,
      sma50: Math.round(sma50 * 100) / 100,
      bollingerUpper: Math.round(bollinger.upper * 100) / 100,
      bollingerLower: Math.round(bollinger.lower * 100) / 100,
      momentum: Math.round(momentum * 100) / 100
    }
  };
}
