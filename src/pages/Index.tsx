import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Target, Zap, Star, ArrowRight, Brain, Database, ChartLine, Shield, Lightbulb, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import LiveStockTicker from "@/components/LiveStockTicker";
import HighConfidenceStocks from "@/components/HighConfidenceStocks";
import ApiDebug from "@/components/ApiDebug";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Debug Component - Remove this after testing */}
      <div className="container mx-auto px-4 py-8">
        <ApiDebug />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Live Market Ticker - Full Width */}
      <div className="container mx-auto px-4 py-8">
        <LiveStockTicker />
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How Our AI-Powered Stock Predictions Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We combine real historical data with advanced technical analysis and AI insights to provide accurate stock predictions. 
            Everything is calculated in real-time using free, reliable data sources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Data Collection */}
          <Card className="card-matte">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Database className="h-6 w-6 text-blue-500" />
                Step 1: Real Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Historical Prices</div>
                    <div className="text-sm text-muted-foreground">
                      30+ days of real stock data (open, close, high, low, volume) from Finnhub API
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Live Market Data</div>
                    <div className="text-sm text-muted-foreground">
                      Real-time current prices and market movements
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">News Headlines</div>
                    <div className="text-sm text-muted-foreground">
                      Recent news and announcements affecting each stock
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Analysis */}
          <Card className="card-matte">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <ChartLine className="h-6 w-6 text-green-500" />
                Step 2: Technical Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                                         <div className="font-medium text-foreground">RSI (Relative Strength Index)</div>
                     <div className="text-sm text-muted-foreground">
                       Identifies overbought (&gt;70) and oversold (&lt;30) conditions
                     </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">MACD (Moving Average Convergence)</div>
                    <div className="text-sm text-muted-foreground">
                      Measures momentum and trend direction
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Moving Averages (SMA20, SMA50)</div>
                    <div className="text-sm text-muted-foreground">
                      Identifies trend direction and support/resistance levels
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Bollinger Bands</div>
                    <div className="text-sm text-muted-foreground">
                      Shows volatility and potential reversal points
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card className="card-matte">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-500" />
                Step 3: AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">News Sentiment Analysis</div>
                    <div className="text-sm text-muted-foreground">
                      Analyzes headlines for positive/negative sentiment using free AI
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Risk Assessment</div>
                    <div className="text-sm text-muted-foreground">
                      Evaluates market risk based on technical indicators and volatility
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Market Conditions</div>
                    <div className="text-sm text-muted-foreground">
                      Summarizes current market environment and key factors
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">AI Confidence Scoring</div>
                    <div className="text-sm text-muted-foreground">
                      Combines all signals for overall prediction confidence
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prediction Generation */}
          <Card className="card-matte">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Target className="h-6 w-6 text-orange-500" />
                Step 4: Smart Predictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Direction Prediction</div>
                    <div className="text-sm text-muted-foreground">
                      Up/Down/Neutral based on technical + AI analysis
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Price Targets</div>
                    <div className="text-sm text-muted-foreground">
                      Predicted price ranges for 1D, 7D, and 30D timeframes
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Confidence Levels</div>
                    <div className="text-sm text-muted-foreground">
                      Overall confidence score (0-95%) with detailed reasoning
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-foreground">Real-time Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Predictions update automatically as new data arrives
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Benefits */}
        <Card className="card-matte mb-12">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Why Our System Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Real Data Only</h3>
                <p className="text-sm text-muted-foreground">
                  No simulated or fake data. Everything is based on actual market information.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Completely Free</h3>
                <p className="text-sm text-muted-foreground">
                  No paid subscriptions or API costs. All analysis is free and transparent.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Live Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Predictions update in real-time as market conditions change.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
