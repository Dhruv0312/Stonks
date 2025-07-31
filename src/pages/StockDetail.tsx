import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CompanyLogoWithFallback } from '@/components/CompanyLogo';
import { formatPrice, formatChange, formatPercent, formatMarketCap } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft, 
  Activity, 
  Target, 
  Zap, 
  Info,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Gauge,
  BarChart3
} from 'lucide-react';
import { useStockData, useRSIData, useMACDData } from '@/hooks/useGoogleSheetsStockData';

// Helper function to parse stock data
const parseStockData = (stock: any) => {
  const price = parseFloat(stock.price?.replace(/[$,]/g, '')) || 0;
  const change = parseFloat(stock.change?.replace(/[+%,]/g, '')) || 0;
  const changePercent = parseFloat(stock.changePercent?.replace(/[+%,]/g, '')) || 0;
  
  return {
    ...stock,
    price,
    change,
    changePercent,
    isPositive: change >= 0,
    isNegative: change < 0
  };
};

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  
  const { data: allStockData, isLoading: stockLoading, error: stockError } = useStockData();
  const { data: allRSIData, isLoading: rsiLoading, error: rsiError } = useRSIData();
  const { data: allMACDData, isLoading: macdLoading, error: macdError } = useMACDData();
  
  // Filter data for the specific symbol
  const stockData = allStockData && allStockData.length > 1 ? 
    allStockData.slice(1).find((row: any[]) => row[0] === symbol) : null;
  const rsiData = allRSIData && allRSIData.length > 1 ? 
    allRSIData.slice(1).find((row: any[]) => row[0] === symbol) : null;
  const macdData = allMACDData && allMACDData.length > 1 ? 
    allMACDData.slice(1).find((row: any[]) => row[0] === symbol) : null;
  
  const parsedStockData = stockData ? parseStockData({
    symbol: stockData[0] || '',
    name: stockData[1] || '',
    price: stockData[3] || '0',
    change: stockData[4] || '0',
    changePercent: stockData[5] || '0%'
  }) : null;
  
  const parsedTechnicalData = rsiData && macdData ? {
    rsi: parseFloat(rsiData[1] || "0"),
    macd: parseFloat(macdData[1] || "0"),
    macdSignal: parseFloat(macdData[2] || "0"),
    macdHistogram: parseFloat(macdData[3] || "0")
  } : null;

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  const getRSIRecommendation = (rsi: number) => {
    if (rsi >= 70) return { signal: "SELL", color: "text-red-500", icon: <TrendingDown className="h-4 w-4" />, reason: "Overbought - Stock may be overvalued" };
    if (rsi <= 30) return { signal: "BUY", color: "text-green-500", icon: <TrendingUp className="h-4 w-4" />, reason: "Oversold - Stock may be undervalued" };
    if (rsi > 50) return { signal: "HOLD", color: "text-yellow-500", icon: <Activity className="h-4 w-4" />, reason: "Bullish momentum - Stock showing strength" };
    return { signal: "HOLD", color: "text-yellow-500", icon: <Activity className="h-4 w-4" />, reason: "Bearish momentum - Stock showing weakness" };
  };

  const getMACDRecommendation = (macd: number, macdSignal: number, macdHistogram: number) => {
    const isBullish = macd > macdSignal && macdHistogram > 0;
    const isBearish = macd < macdSignal && macdHistogram < 0;
    
    if (isBullish) return { signal: "BUY", color: "text-green-500", icon: <TrendingUp className="h-4 w-4" />, reason: "Bullish crossover - Momentum is positive" };
    if (isBearish) return { signal: "SELL", color: "text-red-500", icon: <TrendingDown className="h-4 w-4" />, reason: "Bearish crossover - Momentum is negative" };
    return { signal: "HOLD", color: "text-yellow-500", icon: <Activity className="h-4 w-4" />, reason: "Neutral - No clear momentum direction" };
  };

  const getOverallRecommendation = () => {
    if (!parsedTechnicalData) return { signal: "HOLD", color: "text-yellow-500", icon: <Activity className="h-4 w-4" />, reason: "Insufficient technical data" };
    
    const rsiRec = getRSIRecommendation(parsedTechnicalData.rsi);
    const macdRec = getMACDRecommendation(parsedTechnicalData.macd, parsedTechnicalData.macdSignal, parsedTechnicalData.macdHistogram);
    
    // Simple logic: if both indicators agree, follow them; otherwise, HOLD
    if (rsiRec.signal === macdRec.signal) {
      return rsiRec;
    }
    
    return { signal: "HOLD", color: "text-yellow-500", icon: <Activity className="h-4 w-4" />, reason: "Mixed signals - RSI and MACD disagree" };
  };

  if (stockLoading || rsiLoading || macdLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-vibrant mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Loading stock data...</p>
        </div>
      </div>
    );
  }

  if (stockError || !parsedStockData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Stock Not Found</h2>
          <p className="text-muted-foreground mb-4">Unable to load data for {symbol}</p>
          <Button onClick={() => navigate('/all-stocks')} className="btn-matte">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Stocks
          </Button>
        </div>
      </div>
    );
  }

  const overallRec = getOverallRecommendation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={() => navigate('/all-stocks')} 
            variant="ghost" 
            className="btn-matte-outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Stocks
          </Button>
          <div className="flex items-center gap-4">
            <CompanyLogoWithFallback
              symbol={symbol || ""}
              companyName={parsedStockData.volume || `${symbol} Stock`}
              size="w-16 h-16"
            />
            <div>
              <h1 className="text-4xl font-black text-gradient">{symbol}</h1>
              <p className="text-muted-foreground font-medium">{parsedStockData.volume || `${symbol} Stock`}</p>
            </div>
          </div>
        </div>

        {/* Price Overview */}
        <Card className="card-matte mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="icon-rounded">
                <Zap className="h-5 w-5 text-gradient" />
              </div>
              <span className="text-gradient font-bold">Current Price</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatPrice(parsedStockData.price)}
                </div>
                <div className="text-sm text-muted-foreground">Current Price</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 flex items-center justify-center gap-1 ${
                  parsedStockData.isPositive ? 'text-green-500' : 
                  parsedStockData.isNegative ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {getChangeIcon(parsedStockData.change)}
                  {parsedStockData.isPositive ? '+' : ''}{parsedStockData.change.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Price Change</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${
                  parsedStockData.isPositive ? 'text-green-500' : 
                  parsedStockData.isNegative ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {parsedStockData.isPositive ? '+' : ''}{parsedStockData.changePercent.toFixed(2)}%
                </div>
                <div className="text-sm text-muted-foreground">Percentage Change</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Recommendation */}
        <Card className="card-matte mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="icon-rounded">
                <Target className="h-5 w-5 text-gradient" />
              </div>
              <span className="text-gradient font-bold">Trading Recommendation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className={`flex items-center gap-2 text-lg font-bold ${overallRec.color}`}>
                {overallRec.icon}
                {overallRec.signal}
              </div>
              <Badge className={`badge-matte ${overallRec.color.replace('text-', 'bg-')}`}>
                {overallRec.signal}
              </Badge>
            </div>
            <p className="text-muted-foreground">{overallRec.reason}</p>
          </CardContent>
        </Card>

        {/* Technical Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* RSI Analysis */}
          <Card className="card-matte">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                RSI (Relative Strength Index)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {parsedTechnicalData ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current RSI:</span>
                    <span className="text-xl font-bold">{parsedTechnicalData.rsi.toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-500">Overbought (70+)</span>
                      <span className="text-green-500">Oversold (30-)</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          parsedTechnicalData.rsi >= 70 ? 'bg-red-500' :
                          parsedTechnicalData.rsi <= 30 ? 'bg-green-500' :
                          parsedTechnicalData.rsi > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(Math.max(parsedTechnicalData.rsi, 0), 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">What is RSI?</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      RSI measures the speed and magnitude of price changes to identify overbought or oversold conditions.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>70+ (Overbought):</strong> Stock may be overvalued, potential sell signal</li>
                      <li>• <strong>30- (Oversold):</strong> Stock may be undervalued, potential buy signal</li>
                      <li>• <strong>50+ (Bullish):</strong> Stock showing upward momentum</li>
                      <li>• <strong>Below 50 (Bearish):</strong> Stock showing downward momentum</li>
                    </ul>
                  </div>
                  
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${
                    getRSIRecommendation(parsedTechnicalData.rsi).signal === 'BUY' ? 'bg-green-500/10 border border-green-500/20' :
                    getRSIRecommendation(parsedTechnicalData.rsi).signal === 'SELL' ? 'bg-red-500/10 border border-red-500/20' :
                    'bg-yellow-500/10 border border-yellow-500/20'
                  }`}>
                    {getRSIRecommendation(parsedTechnicalData.rsi).icon}
                    <span className="font-medium">{getRSIRecommendation(parsedTechnicalData.rsi).reason}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2" />
                  <p>RSI data not available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* MACD Analysis */}
          <Card className="card-matte">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                MACD (Moving Average Convergence Divergence)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {parsedTechnicalData ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">MACD Line:</span>
                      <span className="font-medium">{parsedTechnicalData.macd.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Signal Line:</span>
                      <span className="font-medium">{parsedTechnicalData.macdSignal.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Histogram:</span>
                      <span className={`font-medium ${
                        parsedTechnicalData.macdHistogram > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {parsedTechnicalData.macdHistogram > 0 ? '+' : ''}{parsedTechnicalData.macdHistogram.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">What is MACD?</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      MACD is a trend-following momentum indicator that shows the relationship between two moving averages.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>MACD &gt; Signal:</strong> Bullish momentum</li>
                      <li>• <strong>MACD &lt; Signal:</strong> Bearish momentum</li>
                      <li>• <strong>Positive Histogram:</strong> Increasing bullish momentum</li>
                      <li>• <strong>Negative Histogram:</strong> Increasing bearish momentum</li>
                    </ul>
                  </div>
                  
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${
                    getMACDRecommendation(parsedTechnicalData.macd, parsedTechnicalData.macdSignal, parsedTechnicalData.macdHistogram).signal === 'BUY' ? 'bg-green-500/10 border border-green-500/20' :
                    getMACDRecommendation(parsedTechnicalData.macd, parsedTechnicalData.macdSignal, parsedTechnicalData.macdHistogram).signal === 'SELL' ? 'bg-red-500/10 border border-red-500/20' :
                    'bg-yellow-500/10 border border-yellow-500/20'
                  }`}>
                    {getMACDRecommendation(parsedTechnicalData.macd, parsedTechnicalData.macdSignal, parsedTechnicalData.macdHistogram).icon}
                    <span className="font-medium">{getMACDRecommendation(parsedTechnicalData.macd, parsedTechnicalData.macdSignal, parsedTechnicalData.macdHistogram).reason}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2" />
                  <p>MACD data not available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-matte">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap:</span>
                <span className="font-medium">{formatMarketCap(parsedStockData.marketCap)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium">{new Date().toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-matte">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This analysis is for informational purposes only and should not be considered as financial advice. 
                Always do your own research and consult with a financial advisor before making investment decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockDetail; 