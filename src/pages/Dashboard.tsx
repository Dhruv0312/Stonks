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
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center space-y-6 p-8 rounded-2xl bg-gradient-card border border-border/30 shadow-card backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary mx-auto shadow-glow" />
          <p className="text-muted-foreground text-lg">Analyzing <span className="text-gradient-primary font-bold">{symbol}</span>...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-card border border-border/30 shadow-card backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gradient-primary">{stockData.symbol}</h1>
              <p className="text-muted-foreground text-lg">{stockData.companyName}</p>
            </div>
            <Button variant="outline" className="gap-2 rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:shadow-glow transition-all duration-300">
              <Star className="h-4 w-4" />
              Add to Watchlist
            </Button>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-5xl font-bold text-gradient-rainbow">${stockData.currentPrice}</span>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${stockData.change >= 0 ? 'bg-success/10 border border-success/20 shadow-success' : 'bg-destructive/10 border border-destructive/20'}`}>
              {stockData.change >= 0 ? <ArrowUp className="h-5 w-5 text-success" /> : <ArrowDown className="h-5 w-5 text-destructive" />}
              <span className={`font-medium text-lg ${stockData.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${Math.abs(stockData.change)} ({Math.abs(stockData.changePercent)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Enhanced Stock Overview */}
            <Card className="card-hover bg-gradient-card border-border/30 rounded-2xl shadow-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gradient-primary">
                  <div className="relative">
                    <BarChart3 className="h-6 w-6" />
                    <div className="absolute inset-0 h-6 w-6 text-primary/20 blur-sm">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                  </div>
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 shadow-soft">
                    <div className="text-sm text-muted-foreground">Day High</div>
                    <div className="text-xl font-semibold text-primary">${stockData.dayHigh}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-destructive/5 to-destructive/10 border border-destructive/20 shadow-soft">
                    <div className="text-sm text-muted-foreground">Day Low</div>
                    <div className="text-xl font-semibold text-destructive">${stockData.dayLow}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 shadow-success">
                    <div className="text-sm text-muted-foreground">Market Cap</div>
                    <div className="text-xl font-semibold text-accent">{stockData.marketCap}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-secondary-purple/5 to-secondary-purple/10 border border-secondary-purple/20 shadow-purple">
                    <div className="text-sm text-muted-foreground">Volume</div>
                    <div className="text-xl font-semibold text-secondary-purple">1.2M</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Chart Placeholder */}
            <Card className="card-hover bg-gradient-card border-border/30 rounded-2xl shadow-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gradient-primary">Price Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-to-r from-chart-bg to-chart-bg/80 rounded-2xl flex items-center justify-center border border-chart-grid/50 shadow-inner">
                  <div className="text-center text-muted-foreground">
                    <div className="relative mb-4">
                      <BarChart3 className="h-16 w-16 mx-auto text-primary/50 animate-pulse" />
                      <div className="absolute inset-0 h-16 w-16 mx-auto text-primary/10 blur-sm">
                        <BarChart3 className="h-16 w-16" />
                      </div>
                    </div>
                    <p className="text-lg font-medium">Interactive chart will be displayed here</p>
                    <p className="text-sm">Real-time data with technical indicators</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Technical Indicators */}
            <Card className="card-hover bg-gradient-card border-border/30 rounded-2xl shadow-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gradient-primary">
                  <div className="relative">
                    <Info className="h-6 w-6" />
                    <div className="absolute inset-0 h-6 w-6 text-primary/20 blur-sm">
                      <Info className="h-6 w-6" />
                    </div>
                  </div>
                  Technical Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 shadow-accent">
                    <div className="text-sm text-muted-foreground">RSI (14)</div>
                    <div className="text-2xl font-semibold text-warning">{stockData.indicators.rsi}</div>
                    <Badge variant="secondary" className="mt-2 bg-warning/20 text-warning border-warning/30">Neutral</Badge>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-r from-success/10 to-success/5 border border-success/20 shadow-success">
                    <div className="text-sm text-muted-foreground">MACD</div>
                    <div className="text-2xl font-semibold text-success">{stockData.indicators.macd}</div>
                    <Badge variant="default" className="mt-2 bg-success/20 text-success border-success/30">Bullish</Badge>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 shadow-success">
                    <div className="text-sm text-muted-foreground">Sentiment</div>
                    <div className="text-2xl font-semibold text-accent">{stockData.indicators.sentiment}</div>
                    <Badge variant="default" className="mt-2 bg-accent/20 text-accent border-accent/30">Positive</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            
            {/* Enhanced AI Predictions */}
            <Card className="card-hover bg-gradient-card border-border/30 rounded-2xl shadow-glow backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gradient-primary">
                  <div className="relative">
                    <Brain className="h-6 w-6 animate-pulse-glow" />
                    <div className="absolute inset-0 h-6 w-6 text-primary/20 blur-sm">
                      <Brain className="h-6 w-6" />
                    </div>
                  </div>
                  AI Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Enhanced 1-Day Prediction */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-success/10 to-success/5 border border-success/20 shadow-success">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gradient-primary">1-Day Forecast</span>
                    <div className="flex items-center gap-2 text-success">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm font-medium">+{stockData.prediction.oneDay.change}%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium text-success">{stockData.prediction.oneDay.confidence}%</span>
                    </div>
                    <div className="w-full bg-background/50 rounded-full h-3">
                      <div 
                        className="bg-gradient-success h-3 rounded-full transition-all duration-1000 shadow-success"
                        style={{ width: `${stockData.prediction.oneDay.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced 7-Day Prediction */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary-purple/10 border border-primary/20 shadow-glow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gradient-primary">7-Day Forecast</span>
                    <div className="flex items-center gap-2 text-primary">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm font-medium">+{stockData.prediction.sevenDay.change}%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium text-primary">{stockData.prediction.sevenDay.confidence}%</span>
                    </div>
                    <div className="w-full bg-background/50 rounded-full h-3">
                      <div 
                        className="bg-gradient-primary h-3 rounded-full transition-all duration-1000 shadow-glow"
                        style={{ width: `${stockData.prediction.sevenDay.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground p-4 bg-gradient-to-r from-background/20 to-background/10 rounded-xl border border-border/20">
                  <strong className="text-gradient-primary">Key Indicators:</strong> Strong RSI recovery, recent earnings beat, positive market sentiment
                </div>
              </CardContent>
            </Card>

            {/* Enhanced News & Sentiment */}
            <Card className="card-hover bg-gradient-card border-border/30 rounded-2xl shadow-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gradient-primary">Recent News</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stockData.news.map((item: any, index: number) => (
                  <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-background/30 to-background/10 border border-border/20 hover:shadow-glow transition-all duration-300">
                    <div className="text-sm font-medium mb-2 text-foreground">{item.title}</div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="secondary" 
                        className={`${item.sentiment === 'Positive' ? 'bg-success/20 text-success border-success/30' : 'bg-destructive/20 text-destructive border-destructive/30'} rounded-lg`}
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