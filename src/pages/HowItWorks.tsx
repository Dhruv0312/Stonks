import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Database, 
  Cpu, 
  ChartLine, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  Activity, 
  Globe, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  DollarSign,
  BarChart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const processSteps = [
    {
      step: "01",
      icon: Database,
      title: "Real Data Collection",
      description: "Gathering authentic market data from reliable financial APIs",
      details: [
        {
          title: "Historical Price Data",
          description: "30+ days of real stock prices from Finnhub API",
          features: ["Open, Close, High, Low prices", "Trading volume data", "Real-time updates", "Market hours data"]
        },
        {
          title: "Live Market Feeds",
          description: "Current stock prices and market movements",
          features: ["Real-time price updates", "Live trading volume", "Market depth information", "Price change tracking"]
        },
        {
          title: "News & Announcements",
          description: "Recent news headlines affecting each stock",
          features: ["Earnings announcements", "Company news", "Market sentiment", "Economic indicators"]
        }
      ]
    },
    {
      step: "02",
      icon: ChartLine,
      title: "Technical Analysis",
      description: "Advanced mathematical calculations using proven technical indicators",
      details: [
        {
          title: "RSI (Relative Strength Index)",
          description: "Measures momentum and identifies overbought/oversold conditions",
          features: ["14-day calculation period", "Oversold signals (<30)", "Overbought signals (>70)", "Momentum analysis"]
        },
        {
          title: "MACD (Moving Average Convergence)",
          description: "Identifies trend changes and momentum shifts",
          features: ["12/26 day EMAs", "Signal line analysis", "Histogram patterns", "Trend confirmation"]
        },
        {
          title: "Moving Averages",
          description: "SMA20 and SMA50 for trend identification",
          features: ["20-day simple moving average", "50-day simple moving average", "Golden/Death cross signals", "Support/resistance levels"]
        },
        {
          title: "Bollinger Bands",
          description: "Volatility and potential reversal point analysis",
          features: ["20-day SMA with 2 standard deviations", "Upper and lower bands", "Squeeze detection", "Breakout signals"]
        }
      ]
    },
    {
      step: "03",
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Free AI services analyze sentiment and market conditions",
      details: [
        {
          title: "News Sentiment Analysis",
          description: "Client-side analysis of news headlines for sentiment",
          features: ["Positive/negative word detection", "Sentiment scoring", "News impact assessment", "Free processing"]
        },
        {
          title: "Risk Assessment",
          description: "AI evaluation of market risk based on technical indicators",
          features: ["Volatility analysis", "Risk level classification", "Market condition assessment", "Factor identification"]
        },
        {
          title: "Market Conditions",
          description: "AI summary of current market environment",
          features: ["Technical summary", "Sentiment overview", "Key factor identification", "Market state description"]
        },
        {
          title: "Confidence Scoring",
          description: "Combined AI and technical confidence assessment",
          features: ["Multi-factor analysis", "Confidence percentage", "Reasoning breakdown", "Risk-adjusted scoring"]
        }
      ]
    },
    {
      step: "04",
      icon: Target,
      title: "Smart Predictions",
      description: "Combining technical analysis with AI insights for accurate forecasts",
      details: [
        {
          title: "Direction Prediction",
          description: "Up/Down/Neutral predictions based on combined analysis",
          features: ["Technical signal analysis", "AI sentiment integration", "Confidence weighting", "Multi-timeframe analysis"]
        },
        {
          title: "Price Targets",
          description: "Predicted price ranges for different timeframes",
          features: ["1-day predictions", "7-day forecasts", "30-day projections", "Support/resistance levels"]
        },
        {
          title: "Detailed Reasoning",
          description: "Clear explanation of prediction factors and logic",
          features: ["Technical indicator signals", "AI insight summary", "Key factor identification", "Risk considerations"]
        },
        {
          title: "Real-time Updates",
          description: "Predictions update automatically with new data",
          features: ["Live data integration", "Automatic recalculation", "Market condition updates", "Continuous monitoring"]
        }
      ]
    }
  ];

  const technicalIndicators = [
    {
      category: "Momentum Indicators",
      indicators: [
        { name: "RSI (Relative Strength Index)", description: "Measures speed and magnitude of price changes to identify overbought/oversold conditions", formula: "RSI = 100 - (100 / (1 + RS))" },
        { name: "MACD (Moving Average Convergence Divergence)", description: "Shows relationship between two moving averages to identify trend changes", formula: "MACD = 12-day EMA - 26-day EMA" },
        { name: "Momentum", description: "Rate of price change over a specific period", formula: "Momentum = Current Price - Price n periods ago" }
      ]
    },
    {
      category: "Trend Indicators",
      indicators: [
        { name: "SMA (Simple Moving Average)", description: "Average price over a specific period to identify trend direction", formula: "SMA = Sum of prices / Number of periods" },
        { name: "EMA (Exponential Moving Average)", description: "Weighted average that gives more importance to recent prices", formula: "EMA = Price × K + EMA(prev) × (1-K)" },
        { name: "Bollinger Bands", description: "Volatility bands placed above and below a moving average", formula: "Upper Band = SMA + (2 × Standard Deviation)" }
      ]
    },
    {
      category: "Volume Indicators",
      indicators: [
        { name: "Volume Analysis", description: "Trading volume to confirm price movements and trends", formula: "Volume confirmation = Price direction + Volume increase" },
        { name: "Volume Moving Average", description: "Average volume over time to identify unusual activity", formula: "Volume MA = Sum of volumes / Number of periods" },
        { name: "Volume Price Trend", description: "Cumulative volume adjusted for price changes", formula: "VPT = Previous VPT + Volume × (Current Price - Previous Price) / Previous Price" }
      ]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "100% Free",
      description: "No paid subscriptions, API costs, or hidden fees. All analysis is completely free.",
      features: ["Free data sources", "Free AI processing", "No premium tiers", "Transparent pricing"]
    },
    {
      icon: Database,
      title: "Real Data Only",
      description: "No simulated or fake data. Everything is based on actual market information.",
      features: ["Live market feeds", "Historical price data", "Real news sources", "Authentic calculations"]
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Predictions update automatically as market conditions change.",
      features: ["Live data integration", "Instant recalculation", "Market condition updates", "Continuous monitoring"]
    },
    {
      icon: Shield,
      title: "Transparent Process",
      description: "See exactly how predictions are calculated with detailed reasoning.",
      features: ["Clear explanations", "Factor breakdown", "Confidence scoring", "Risk assessment"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="px-4 py-2 bg-blue-100 border border-blue-200 text-blue-800 text-sm font-medium mb-6">
            <Brain className="w-4 h-4 mr-2" />
            How Our System Works
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Discover how we combine real market data, advanced technical analysis, and free AI services to provide accurate stock predictions
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary text-lg px-8 py-4 font-semibold transition-all duration-300"
          >
            Try It Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Process Overview */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              The Prediction Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our four-step process transforms real market data into actionable investment insights
            </p>
          </div>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div 
                key={step.step}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card className="card-matte shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row items-start gap-8">
                      {/* Step Header */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-24 h-24 bg-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center">
                            <step.icon className="h-12 w-12 text-blue-600" />
                          </div>
                          <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-foreground mb-4">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Detailed Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                              <h4 className="text-lg font-semibold text-foreground mb-3">
                                {detail.title}
                              </h4>
                              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                {detail.description}
                              </p>
                              <div className="space-y-2">
                                {detail.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span className="text-foreground text-xs">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Indicators */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Technical Analysis Indicators
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced mathematical formulas and proven technical indicators power our analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {technicalIndicators.map((category, index) => (
              <Card 
                key={category.category}
                className="card-matte shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.indicators.map((indicator, indicatorIndex) => (
                    <div key={indicatorIndex} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">{indicator.name}</h4>
                      <p className="text-muted-foreground text-sm mb-2 leading-relaxed">{indicator.description}</p>
                      <div className="text-xs text-blue-600 font-mono bg-blue-50 p-2 rounded">
                        {indicator.formula}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the advantages of our real data, technical analysis, and free AI approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={benefit.title}
                className="card-matte shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <benefit.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {benefit.description}
                      </p>
                      <div className="space-y-2">
                        {benefit.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-foreground text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="card-matte shadow-lg">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Start Analyzing Stocks?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Begin your journey with our free, AI-powered stock analysis platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary text-lg px-8 py-4 font-semibold transition-all duration-300"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Start Free Analysis
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  className="btn-secondary text-lg px-8 py-4 font-semibold transition-all duration-300"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks; 