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
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const processSteps = [
    {
      step: "01",
      icon: Database,
      title: "Data Collection & Aggregation",
      description: "Comprehensive market data gathering from multiple reliable sources",
      details: [
        {
          title: "Real-time Price Feeds",
          description: "Live stock prices, volume, and market data from major exchanges",
          features: ["NYSE & NASDAQ feeds", "Real-time updates", "Historical data", "Market depth information"]
        },
        {
          title: "News & Sentiment Analysis",
          description: "Financial news processing with sentiment scoring",
          features: ["Reuters & Bloomberg feeds", "Social media sentiment", "Earnings announcements", "Economic indicators"]
        },
        {
          title: "Technical Indicators",
          description: "Advanced technical analysis calculations",
          features: ["RSI, MACD, Moving Averages", "Bollinger Bands", "Volume analysis", "Support/Resistance levels"]
        }
      ]
    },
    {
      step: "02",
      icon: Cpu,
      title: "AI Processing & Analysis",
      description: "Advanced machine learning models analyze patterns and correlations",
      details: [
        {
          title: "Pattern Recognition",
          description: "Identify recurring market patterns and trends",
          features: ["Price pattern detection", "Volume pattern analysis", "Market cycle identification", "Anomaly detection"]
        },
        {
          title: "Sentiment Analysis",
          description: "Process news and social media for market sentiment",
          features: ["Natural language processing", "Sentiment scoring", "News impact analysis", "Social media trends"]
        },
        {
          title: "Correlation Analysis",
          description: "Find relationships between different market factors",
          features: ["Cross-asset correlations", "Sector relationships", "Global market connections", "Economic factor analysis"]
        }
      ]
    },
    {
      step: "03",
      icon: Brain,
      title: "Prediction Generation",
      description: "AI models generate predictions with confidence scores and reasoning",
      details: [
        {
          title: "Price Movement Predictions",
          description: "Forecast stock price movements with confidence levels",
          features: ["1-day to 7-day forecasts", "Confidence scoring", "Risk assessment", "Multiple scenarios"]
        },
        {
          title: "Market Trend Analysis",
          description: "Identify overall market direction and momentum",
          features: ["Trend strength analysis", "Momentum indicators", "Market regime detection", "Volatility forecasting"]
        },
        {
          title: "Risk Assessment",
          description: "Evaluate potential risks and downside scenarios",
          features: ["Value at Risk (VaR)", "Maximum drawdown analysis", "Stress testing", "Portfolio risk metrics"]
        }
      ]
    },
    {
      step: "04",
      icon: ChartLine,
      title: "Results & Recommendations",
      description: "Deliver actionable insights with clear visualizations",
      details: [
        {
          title: "Interactive Dashboards",
          description: "Comprehensive visual analysis tools",
          features: ["Real-time charts", "Technical indicators", "News integration", "Portfolio tracking"]
        },
        {
          title: "Investment Recommendations",
          description: "Personalized investment suggestions",
          features: ["Buy/Sell signals", "Position sizing", "Entry/exit points", "Portfolio optimization"]
        },
        {
          title: "Risk Management",
          description: "Tools to manage and mitigate investment risks",
          features: ["Stop-loss recommendations", "Diversification analysis", "Risk alerts", "Portfolio rebalancing"]
        }
      ]
    }
  ];

  const aiTechnologies = [
    {
      category: "Machine Learning Models",
      technologies: [
        { name: "LSTM Networks", description: "Long Short-Term Memory networks for time series prediction" },
        { name: "Transformer Models", description: "Advanced attention mechanisms for pattern recognition" },
        { name: "Ensemble Methods", description: "Combining multiple models for improved accuracy" },
        { name: "Neural Networks", description: "Deep learning models for complex market analysis" }
      ]
    },
    {
      category: "Data Processing",
      technologies: [
        { name: "Real-time Stream Processing", description: "Apache Kafka for live data ingestion" },
        { name: "Big Data Analytics", description: "Spark and Hadoop for large-scale data processing" },
        { name: "Time Series Analysis", description: "Specialized algorithms for financial data" },
        { name: "Natural Language Processing", description: "BERT and GPT models for news analysis" }
      ]
    },
    {
      category: "Technical Analysis",
      technologies: [
        { name: "Technical Indicators", description: "RSI, MACD, Bollinger Bands, and more" },
        { name: "Chart Pattern Recognition", description: "AI-powered pattern identification" },
        { name: "Volume Analysis", description: "Advanced volume-based indicators" },
        { name: "Market Microstructure", description: "Order flow and market depth analysis" }
      ]
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "High Accuracy",
      description: "Our AI models achieve 85%+ prediction accuracy through continuous learning and optimization",
      features: ["Backtested performance", "Real-time validation", "Continuous improvement", "Risk-adjusted returns"]
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Instant analysis and updates as market conditions change",
      features: ["Live data feeds", "Instant alerts", "Real-time charts", "Immediate notifications"]
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive risk assessment and management tools",
      features: ["Portfolio risk analysis", "Stop-loss recommendations", "Diversification guidance", "Stress testing"]
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Complex AI insights presented in simple, actionable formats",
      features: ["Intuitive interface", "Clear visualizations", "Simple explanations", "Guided recommendations"]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="px-4 py-2 bg-glass-strong border border-white/20 text-white/90 text-sm font-medium shadow-glow mb-6">
            <Brain className="w-4 h-4 mr-2" />
            Technology Deep Dive
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-primary mb-6">
            How It Works
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the advanced AI technology and sophisticated processes that power our intelligent stock analysis platform
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary text-lg px-8 py-4 font-semibold hover-glow transition-all duration-300"
          >
            Try It Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Process Overview */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient-primary mb-4">
              The AI Analysis Process
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Our sophisticated four-step process transforms raw market data into actionable investment insights
            </p>
          </div>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div 
                key={step.step}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card className="card-glass shadow-card hover-lift">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row items-start gap-8">
                      {/* Step Header */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-24 h-24 bg-glass-strong border border-white/20 rounded-2xl flex items-center justify-center">
                            <step.icon className="h-12 w-12 text-white" />
                          </div>
                          <div className="absolute -top-3 -right-3 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-gradient-primary mb-4">
                          {step.title}
                        </h3>
                        <p className="text-white/70 text-lg mb-8 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Detailed Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="p-4 bg-glass border border-white/10 rounded-lg">
                              <h4 className="text-lg font-semibold text-white mb-3">
                                {detail.title}
                              </h4>
                              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                                {detail.description}
                              </p>
                              <div className="space-y-2">
                                {detail.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-white/60 flex-shrink-0" />
                                    <span className="text-white/80 text-xs">{feature}</span>
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

        {/* AI Technologies */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient-primary mb-4">
              Advanced AI Technologies
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Cutting-edge artificial intelligence and machine learning technologies power our analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {aiTechnologies.map((category, index) => (
              <Card 
                key={category.category}
                className="card-glass shadow-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gradient-primary">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="p-3 bg-glass border border-white/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">{tech.name}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{tech.description}</p>
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
            <h2 className="text-4xl font-bold text-gradient-primary mb-4">
              Why Choose Our AI Platform?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Experience the advantages of AI-powered investment analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={benefit.title}
                className="card-glass shadow-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-glass-strong rounded-lg">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gradient-primary mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        {benefit.description}
                      </p>
                      <div className="space-y-2">
                        {benefit.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                            <span className="text-white/80 text-sm">{feature}</span>
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
          <Card className="card-glass shadow-card">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gradient-primary mb-4">
                Ready to Experience AI-Powered Investing?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Start analyzing stocks with our advanced AI technology and make smarter investment decisions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary text-lg px-8 py-4 font-semibold hover-glow transition-all duration-300"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Start Free Analysis
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  className="btn-secondary text-lg px-8 py-4 font-semibold hover-glow transition-all duration-300"
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