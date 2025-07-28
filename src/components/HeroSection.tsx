import { ArrowRight, TrendingUp, Brain, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import StockSearchCard from "./StockSearchCard";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary-purple/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/15 to-accent-pink/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-accent-orange/20 to-warning/20 rounded-full blur-2xl animate-float" />
        <div className="absolute top-1/6 right-1/6 w-48 h-48 bg-gradient-to-r from-secondary-purple/10 to-accent-cyan/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/6 left-1/6 w-40 h-40 bg-gradient-to-r from-success/15 to-accent/15 rounded-full blur-2xl animate-float" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center space-y-8 mb-16">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary-purple/10 border border-primary/30 shadow-glow backdrop-blur-sm">
            <Brain className="h-5 w-5 text-gradient-primary animate-pulse" />
            <span className="text-sm font-medium text-gradient-primary">AI-Powered Market Intelligence</span>
          </div>

          {/* Enhanced Main Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient-rainbow animate-shimmer bg-[length:200%_100%]">
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

          {/* Enhanced Stats with Colors */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
            <div className="space-y-2 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 shadow-soft">
              <div className="text-2xl md:text-3xl font-bold text-gradient-primary">95%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div className="space-y-2 p-4 rounded-2xl bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 shadow-success">
              <div className="text-2xl md:text-3xl font-bold text-accent">10K+</div>
              <div className="text-sm text-muted-foreground">Stocks Analyzed</div>
            </div>
            <div className="space-y-2 p-4 rounded-2xl bg-gradient-to-r from-success/5 to-success/10 border border-success/20 shadow-success">
              <div className="text-2xl md:text-3xl font-bold text-success">24/7</div>
              <div className="text-sm text-muted-foreground">Market Monitoring</div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Card */}
        <div className="mb-16">
          <StockSearchCard />
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="card-hover p-8 rounded-2xl bg-gradient-card border border-border/30 shadow-card backdrop-blur-sm">
            <div className="relative mb-6">
              <TrendingUp className="h-10 w-10 text-success mb-4 animate-float" />
              <div className="absolute inset-0 h-10 w-10 text-success/20 blur-sm">
                <TrendingUp className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gradient-primary">Smart Predictions</h3>
            <p className="text-muted-foreground">
              Advanced LSTM models analyze market patterns to predict stock movements with high confidence.
            </p>
          </div>
          
          <div className="card-hover p-8 rounded-2xl bg-gradient-card border border-border/30 shadow-card backdrop-blur-sm">
            <div className="relative mb-6">
              <BarChart className="h-10 w-10 text-secondary-purple mb-4 animate-pulse" />
              <div className="absolute inset-0 h-10 w-10 text-secondary-purple/20 blur-sm">
                <BarChart className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gradient-primary">Real-Time Data</h3>
            <p className="text-muted-foreground">
              Live market data and interactive charts with technical indicators for comprehensive analysis.
            </p>
          </div>
          
          <div className="card-hover p-8 rounded-2xl bg-gradient-card border border-border/30 shadow-card backdrop-blur-sm">
            <div className="relative mb-6">
              <Brain className="h-10 w-10 text-accent-orange mb-4 animate-pulse-glow" />
              <div className="absolute inset-0 h-10 w-10 text-accent-orange/20 blur-sm">
                <Brain className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gradient-primary">AI Insights</h3>
            <p className="text-muted-foreground">
              Get detailed reasoning behind predictions with sentiment analysis and market indicators.
            </p>
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-rainbow hover:bg-gradient-primary text-lg px-10 py-8 h-auto shadow-glow hover:shadow-purple rounded-2xl transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            Start Predicting Now
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;