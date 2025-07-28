import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  BarChart3, 
  Star,
  Info,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const symbol = searchParams.get('symbol') || 'AAPL';
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch stock data
    const fetchStockData = async () => {
      setLoading(true);
      
      // Mock data - in real app, this would be API calls
      setTimeout(() => {
        setStockData({
          symbol: symbol,
          companyName: "Apple Inc.",
          currentPrice: 182.52,
          change: 2.34,
          changePercent: 1.30,
          dayHigh: 184.95,
          dayLow: 180.17,
          marketCap: "2.84T",
          prediction: {
            oneDay: { direction: "up", confidence: 78, change: 1.2 },
            sevenDay: { direction: "up", confidence: 65, change: 3.8 }
          },
          indicators: {
            rsi: 62.4,
            macd: "Bullish",
            sentiment: "Positive"
          },
          news: [
            {
              title: "Apple announces new product lineup",
              sentiment: "Positive",
              time: "2 hours ago"
            },
            {
              title: "Strong quarterly earnings beat expectations",
              sentiment: "Positive", 
              time: "1 day ago"
            }
          ]
        });
        setLoading(false);
      }, 1500);
    };

    fetchStockData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Analyzing {symbol}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{stockData.symbol}</h1>
              <p className="text-muted-foreground">{stockData.companyName}</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Star className="h-4 w-4" />
              Add to Watchlist
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold">${stockData.currentPrice}</span>
            <div className={`flex items-center gap-1 ${stockData.change >= 0 ? 'text-success' : 'text-destructive'}`}>
              {stockData.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              <span className="font-medium">
                ${Math.abs(stockData.change)} ({Math.abs(stockData.changePercent)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stock Overview */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Day High</div>
                    <div className="text-lg font-semibold">${stockData.dayHigh}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Day Low</div>
                    <div className="text-lg font-semibold">${stockData.dayLow}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Market Cap</div>
                    <div className="text-lg font-semibold">{stockData.marketCap}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Volume</div>
                    <div className="text-lg font-semibold">1.2M</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart Placeholder */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Price Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-chart-bg rounded-lg flex items-center justify-center border border-chart-grid">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Interactive chart will be displayed here</p>
                    <p className="text-sm">Real-time data with technical indicators</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Indicators */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Technical Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-background/30">
                    <div className="text-sm text-muted-foreground">RSI (14)</div>
                    <div className="text-lg font-semibold">{stockData.indicators.rsi}</div>
                    <Badge variant="secondary" className="mt-1">Neutral</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-background/30">
                    <div className="text-sm text-muted-foreground">MACD</div>
                    <div className="text-lg font-semibold">{stockData.indicators.macd}</div>
                    <Badge variant="default" className="mt-1 bg-success">Bullish</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-background/30">
                    <div className="text-sm text-muted-foreground">Sentiment</div>
                    <div className="text-lg font-semibold">{stockData.indicators.sentiment}</div>
                    <Badge variant="default" className="mt-1 bg-success">Positive</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* AI Predictions */}
            <Card className="bg-gradient-card border-border/50 shadow-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 1-Day Prediction */}
                <div className="p-4 rounded-lg bg-background/30 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">1-Day Forecast</span>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+{stockData.prediction.oneDay.change}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium">{stockData.prediction.oneDay.confidence}%</span>
                    </div>
                    <div className="w-full bg-background/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${stockData.prediction.oneDay.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 7-Day Prediction */}
                <div className="p-4 rounded-lg bg-background/30 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">7-Day Forecast</span>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+{stockData.prediction.sevenDay.change}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium">{stockData.prediction.sevenDay.confidence}%</span>
                    </div>
                    <div className="w-full bg-background/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${stockData.prediction.sevenDay.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground p-3 bg-background/20 rounded-lg">
                  <strong>Key Indicators:</strong> Strong RSI recovery, recent earnings beat, positive market sentiment
                </div>
              </CardContent>
            </Card>

            {/* News & Sentiment */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Recent News</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stockData.news.map((item: any, index: number) => (
                  <div key={index} className="p-3 rounded-lg bg-background/30 border border-border/30">
                    <div className="text-sm font-medium mb-1">{item.title}</div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="secondary" 
                        className={item.sentiment === 'Positive' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}
                      >
                        {item.sentiment}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;