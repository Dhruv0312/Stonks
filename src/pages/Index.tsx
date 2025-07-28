import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Target, Zap, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import LiveStockTicker from "@/components/LiveStockTicker";
import HighConfidenceStocks from "@/components/HighConfidenceStocks";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Live Market Ticker - Full Width */}
      <div className="container mx-auto px-4 py-8">
        <LiveStockTicker />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* High Confidence Stocks */}
            <HighConfidenceStocks />

            {/* Quick Actions */}
            <Card className="card-matte animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => navigate("/all-stocks")}
                    className="btn-matte h-16 text-left p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="icon-rounded">
                        <BarChart3 className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold">Browse All Stocks</div>
                        <div className="text-sm text-muted-foreground">
                          Explore complete stock database
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </div>
                  </Button>

                  <Button
                    onClick={() => navigate("/how-it-works")}
                    className="btn-matte h-16 text-left p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="icon-rounded">
                        <Target className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold">How It Works</div>
                        <div className="text-sm text-muted-foreground">
                          Learn about our analysis methods
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Features Overview */}
            <Card className="card-matte animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Platform Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 card-matte">
                  <div className="icon-rounded">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Real-time Data</div>
                    <div className="text-xs text-muted-foreground">
                      Live stock prices and charts
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 card-matte">
                  <div className="icon-rounded">
                    <Target className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">AI Predictions</div>
                    <div className="text-xs text-muted-foreground">
                      Confidence-based analysis
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 card-matte">
                  <div className="icon-rounded">
                    <Zap className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Technical Indicators</div>
                    <div className="text-xs text-muted-foreground">
                      RSI, MACD, Momentum analysis
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 card-matte">
                  <div className="icon-rounded">
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Market Opportunities</div>
                    <div className="text-xs text-muted-foreground">
                      Stocks with bullish signals
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card className="card-matte animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 card-matte">
                    <div className="text-2xl font-bold text-green-500">+2.3%</div>
                    <div className="text-xs text-muted-foreground">S&P 500</div>
                  </div>
                  <div className="text-center p-3 card-matte">
                    <div className="text-2xl font-bold text-blue-500">+1.8%</div>
                    <div className="text-xs text-muted-foreground">NASDAQ</div>
                  </div>
                  <div className="text-center p-3 card-matte">
                    <div className="text-2xl font-bold text-purple-500">+1.5%</div>
                    <div className="text-xs text-muted-foreground">DOW</div>
                  </div>
                  <div className="text-center p-3 card-matte">
                    <div className="text-2xl font-bold text-orange-500">+3.2%</div>
                    <div className="text-xs text-muted-foreground">Russell 2000</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
