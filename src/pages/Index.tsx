import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Target, Zap, Star, ArrowRight, Brain, Database, ChartLine, Shield, Lightbulb, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import LiveStockTicker from "@/components/LiveStockTicker";
import PopularStocks from "@/components/HighConfidenceStocks";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Live Market Ticker */}
      <div className="container mx-auto px-4 py-8">
        <LiveStockTicker />
      </div>

      {/* Popular Stocks */}
      <PopularStocks />

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Stock Analysis Tools
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to analyze stocks and make informed investment decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-matte hover:bg-accent transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="icon-rounded">
                    <TrendingUp className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Real-time Data</h3>
                </div>
                <p className="text-muted-foreground">
                  Live stock prices, volume, and market data updated in real-time from Alpha Vantage API
                </p>
              </CardContent>
            </Card>

            <Card className="card-matte hover:bg-accent transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="icon-rounded">
                    <BarChart3 className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Technical Analysis</h3>
                </div>
                <p className="text-muted-foreground">
                  Professional charts with historical data, moving averages, and technical indicators
                </p>
              </CardContent>
            </Card>

            <Card className="card-matte hover:bg-accent transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="icon-rounded">
                    <Database className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Company Profiles</h3>
                </div>
                <p className="text-muted-foreground">
                  Detailed company information, financial metrics, and market capitalization data
                </p>
              </CardContent>
            </Card>

            <Card className="card-matte hover:bg-accent transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="icon-rounded">
                    <Activity className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Live Ticker</h3>
                </div>
                <p className="text-muted-foreground">
                  Real-time market ticker showing live prices and changes for popular stocks
                </p>
              </CardContent>
            </Card>

            <Card className="card-matte hover:bg-accent transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="icon-rounded">
                    <ChartLine className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Interactive Charts</h3>
                </div>
                <p className="text-muted-foreground">
                  Interactive candlestick charts with multiple timeframes and technical indicators
                </p>
              </CardContent>
            </Card>

            <Card className="card-matte hover:bg-accent transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="icon-rounded">
                    <Shield className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Market News</h3>
                </div>
                <p className="text-muted-foreground">
                  Latest news and market updates to stay informed about market movements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Start Analyzing Stocks Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Get real-time data, professional charts, and comprehensive analysis for any stock
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/all-stocks')} 
              className="btn-matte text-lg px-8 py-3"
            >
              Browse All Stocks
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/how-it-works')} 
              variant="outline"
              className="btn-matte-outline text-lg px-8 py-3"
            >
              Learn More
              <Lightbulb className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
