import { ArrowRight, TrendingUp, Brain, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import StockSearchCard from "./StockSearchCard";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-primary-glow/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center space-y-8 mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Market Intelligence</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Predict Tomorrow's
              </span>
              <br />
              <span className="text-foreground">Market, Today</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Enter a stock symbol to get AI-powered predictions, trends, and analytics 
              that help you make smarter investment decisions.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-accent">10K+</div>
              <div className="text-sm text-muted-foreground">Stocks Analyzed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-success">24/7</div>
              <div className="text-sm text-muted-foreground">Market Monitoring</div>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="mb-16">
          <StockSearchCard />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl bg-gradient-card border border-border/50 shadow-soft">
            <TrendingUp className="h-8 w-8 text-success mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Predictions</h3>
            <p className="text-muted-foreground text-sm">
              Advanced LSTM models analyze market patterns to predict stock movements with high confidence.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-gradient-card border border-border/50 shadow-soft">
            <BarChart className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
            <p className="text-muted-foreground text-sm">
              Live market data and interactive charts with technical indicators for comprehensive analysis.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-gradient-card border border-border/50 shadow-soft">
            <Brain className="h-8 w-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
            <p className="text-muted-foreground text-sm">
              Get detailed reasoning behind predictions with sentiment analysis and market indicators.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 h-auto shadow-glow"
          >
            Start Predicting Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;