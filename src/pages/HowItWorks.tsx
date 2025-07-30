import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Database, 
  Cpu, 
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
      title: "Google Sheets Integration",
      description: "Direct access to your curated stock data from Google Sheets",
      details: [
        {
          title: "Watchlist Data",
          description: "Real stock prices and market data from your Google Sheets",
          features: ["Current stock prices", "Price change tracking", "Company information", "Real-time updates"]
        },
        {
          title: "Technical Analysis Data",
          description: "RSI and MACD indicators calculated from your data",
          features: ["RSI values for momentum", "MACD line and signal", "Histogram patterns", "Technical insights"]
        },
        {
          title: "Custom Data Management",
          description: "Your own curated stock database and analysis",
          features: ["Personal watchlist", "Custom calculations", "Data ownership", "Flexible updates"]
        }
      ]
    },
    {
      step: "02",
             icon: BarChart3,
      title: "Technical Analysis Display",
      description: "Real-time display of RSI and MACD indicators from your Google Sheets",
      details: [
        {
          title: "RSI (Relative Strength Index)",
          description: "Displays momentum and overbought/oversold conditions from your data",
          features: ["Real RSI values", "Overbought signals (>70)", "Oversold signals (<30)", "Momentum analysis"]
        },
        {
          title: "MACD (Moving Average Convergence)",
          description: "Shows trend changes and momentum shifts from your calculations",
          features: ["MACD line values", "Signal line analysis", "Histogram patterns", "Trend confirmation"]
        },
        {
          title: "Price Action Analysis",
          description: "Real-time price changes and percentage movements",
          features: ["Current price display", "Price change tracking", "Percentage calculations", "Visual indicators"]
        },
        {
          title: "Technical Summary",
          description: "Comprehensive analysis of your stock data",
          features: ["Buy/sell signals", "Technical insights", "Risk assessment", "Market analysis"]
        }
      ]
    },
    {
      step: "03",
      icon: Brain,
      title: "Real-Time Data Processing",
      description: "Instant processing and display of your Google Sheets data",
      details: [
        {
          title: "Live Data Updates",
          description: "Real-time synchronization with your Google Sheets",
          features: ["Automatic data refresh", "Live price updates", "Instant calculations", "Seamless integration"]
        },
        {
          title: "Data Validation",
          description: "Ensuring data integrity and accuracy",
          features: ["Error handling", "Data verification", "Format validation", "Quality checks"]
        },
        {
          title: "Performance Optimization",
          description: "Fast and efficient data processing",
          features: ["Caching mechanisms", "Optimized queries", "Quick loading", "Responsive interface"]
        },
        {
          title: "User Experience",
          description: "Smooth and intuitive data presentation",
          features: ["Clean interface", "Easy navigation", "Visual indicators", "Mobile responsive"]
        }
      ]
    },
    {
      step: "04",
      icon: Target,
      title: "Interactive Dashboard",
      description: "Comprehensive view of your stock data with technical analysis insights",
      details: [
        {
          title: "Stock Overview",
          description: "Complete view of stock information and performance",
          features: ["Price overview", "Technical indicators", "Company information", "Performance metrics"]
        },
        {
          title: "Technical Analysis",
          description: "Detailed technical analysis with buy/sell signals",
          features: ["RSI analysis", "MACD signals", "Price action", "Technical summary"]
        },
        {
          title: "Data Visualization",
          description: "Clear and intuitive presentation of your data",
          features: ["Visual indicators", "Color-coded signals", "Interactive elements", "Responsive design"]
        },
        {
          title: "Real-time Monitoring",
          description: "Live tracking of your stock portfolio",
          features: ["Live ticker", "Auto-refresh", "Instant updates", "Portfolio tracking"]
        }
      ]
    }
  ];

  const technicalIndicators = [
    {
      category: "Primary Indicators",
      indicators: [
        { name: "RSI (Relative Strength Index)", description: "Measures momentum and identifies overbought/oversold conditions from your data", formula: "RSI = 100 - (100 / (1 + RS))" },
        { name: "MACD (Moving Average Convergence Divergence)", description: "Shows trend changes and momentum shifts from your calculations", formula: "MACD = 12-day EMA - 26-day EMA" },
        { name: "MACD Signal", description: "Signal line for MACD crossover analysis", formula: "Signal = 9-day EMA of MACD" }
      ]
    },
    {
      category: "Price Analysis",
      indicators: [
        { name: "Current Price", description: "Real-time stock price from your Google Sheets", formula: "Price = Latest market price" },
        { name: "Price Change", description: "Absolute change in price from previous close", formula: "Change = Current Price - Previous Close" },
        { name: "Percentage Change", description: "Relative change expressed as percentage", formula: "% Change = (Change / Previous Close) × 100" }
      ]
    },
    {
      category: "Data Integration",
      indicators: [
        { name: "Google Sheets Sync", description: "Real-time synchronization with your data", formula: "Auto-refresh every 60 seconds" },
        { name: "Data Validation", description: "Ensuring data integrity and format", formula: "Error handling + format validation" },
        { name: "Live Updates", description: "Instant display of your latest data", formula: "Real-time processing + caching" }
      ]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Your Data, Your Control",
      description: "Complete ownership of your stock data and analysis. No external dependencies.",
      features: ["Google Sheets integration", "Data ownership", "Custom calculations", "Personal control"]
    },
    {
      icon: Database,
      title: "Real Technical Analysis",
      description: "Authentic RSI and MACD indicators from your curated data.",
      features: ["Real RSI values", "Live MACD data", "Technical insights", "Accurate calculations"]
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Data updates automatically as your Google Sheets change.",
      features: ["Live data sync", "Instant updates", "Auto-refresh", "Continuous monitoring"]
    },
    {
      icon: Shield,
      title: "Transparent Process",
      description: "See exactly how your data is processed and displayed.",
      features: ["Clear data flow", "Source transparency", "Real-time processing", "Data validation"]
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
            Discover how we integrate your Google Sheets data with real-time technical analysis to provide comprehensive stock insights
          </p>
          <Button 
                            onClick={() => navigate('/all-stocks')}
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
              Our four-step process transforms your Google Sheets data into actionable investment insights
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
              RSI and MACD indicators from your Google Sheets power our technical analysis
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
              Experience the advantages of our Google Sheets integration and real-time technical analysis
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
                Begin your journey with our Google Sheets-powered stock analysis platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/all-stocks')}
                  className="btn-primary text-lg px-8 py-4 font-semibold transition-all duration-300"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Start Analysis
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