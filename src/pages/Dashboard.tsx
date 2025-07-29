import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Zap, 
  Building2, 
  ArrowLeft,
  Activity,
  Calendar,
  Clock,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStockQuote, useCompanyProfile, useCompanyNews, useStockCandles } from "@/hooks/useAlphaVantage";
import { CompanyLogoWithFallback } from "@/components/CompanyLogo";
import { formatPrice, formatChange, formatPercent, formatMarketCap, generatePrediction } from "@/lib/utils";
import PolygonChart from "@/components/PolygonChart";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const symbol = searchParams.get('symbol') || 'AAPL';
  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'profile' | 'news'>('overview');
  
  const { data: quote, isLoading, error } = useStockQuote(symbol);
  const { data: profile } = useCompanyProfile(symbol);
  const { data: news } = useCompanyNews(symbol);
  const { data: candles } = useStockCandles(symbol, 'D', 30);

  const getStockName = (symbol: string): string => {
    const names: Record<string, string> = {
      AAPL: 'Apple Inc.',
      TSLA: 'Tesla Inc.',
      GOOGL: 'Alphabet Inc.',
      MSFT: 'Microsoft Corp.',
      NVDA: 'NVIDIA Corp.',
      AMZN: 'Amazon.com Inc.',
      META: 'Meta Platforms Inc.',
      NFLX: 'Netflix Inc.',
    };
    return names[symbol] || `${symbol} Stock`;
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-5 w-5 text-red-500" />;
    return null;
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading stock data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Stock Not Found</h1>
            <p className="text-muted-foreground mb-6">Unable to load data for {symbol}</p>
            <Button onClick={() => navigate('/')} className="btn-matte">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Price Overview */}
      <Card className="card-matte">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Price Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-foreground mb-2">
              {formatPrice(quote.c)}
            </div>
            <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${
              quote.d > 0 ? 'text-green-500' : quote.d < 0 ? 'text-red-500' : 'text-muted-foreground'
            }`}>
              {getChangeIcon(quote.d)}
              <span>
                {formatChange(quote.d)} ({formatPercent(quote.dp)})
              </span>
            </div>
          </div>

          {/* Price Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 card-matte">
              <div className="text-sm text-muted-foreground">Open</div>
              <div className="text-lg font-bold text-foreground">{formatPrice(quote.o)}</div>
            </div>
            <div className="text-center p-3 card-matte">
              <div className="text-sm text-muted-foreground">High</div>
              <div className="text-lg font-bold text-foreground">{formatPrice(quote.h)}</div>
            </div>
            <div className="text-center p-3 card-matte">
              <div className="text-sm text-muted-foreground">Low</div>
              <div className="text-lg font-bold text-foreground">{formatPrice(quote.l)}</div>
            </div>
            <div className="text-center p-3 card-matte">
              <div className="text-sm text-muted-foreground">Previous Close</div>
              <div className="text-lg font-bold text-foreground">{formatPrice(quote.pc)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
            
      {/* AI Predictions */}
      {(() => {
        const prediction = candles && candles.c && candles.c.length >= 30 ? 
          generatePrediction(symbol, candles, '7D') : null;
        
        return (
          <Card className="card-matte">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-500" />
                AI Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div className="space-y-6">
                  {/* Prediction Summary */}
                  <div className="text-center p-6 card-matte">
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {formatPrice(prediction.predictedPrice)}
                    </div>
                    <div className={`text-lg font-semibold mb-2 ${
                      prediction.direction === 'up' ? 'text-green-500' : 
                      prediction.direction === 'down' ? 'text-red-500' : 'text-muted-foreground'
                    }`}>
                      {prediction.direction === 'up' ? '↗️ Bullish' : 
                       prediction.direction === 'down' ? '↘️ Bearish' : '→ Neutral'} 
                      ({prediction.timeframe})
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Confidence: {prediction.confidence}%
                    </div>
                  </div>

                  {/* Technical Indicators */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 card-matte">
                      <div className="icon-rounded mx-auto mb-2">
                        <Target className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="text-lg font-bold text-foreground">{prediction.confidence}%</div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                    <div className="text-center p-4 card-matte">
                      <div className="icon-rounded mx-auto mb-2">
                        <Zap className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="text-lg font-bold text-foreground">{prediction.technicalIndicators.rsi}</div>
                      <div className="text-xs text-muted-foreground">RSI</div>
                    </div>
                    <div className="text-center p-4 card-matte">
                      <div className="icon-rounded mx-auto mb-2">
                        <BarChart3 className="h-6 w-6 text-purple-500" />
                      </div>
                      <div className="text-lg font-bold text-foreground">{prediction.technicalIndicators.macd}</div>
                      <div className="text-xs text-muted-foreground">MACD</div>
                    </div>
                    <div className="text-center p-4 card-matte">
                      <div className="icon-rounded mx-auto mb-2">
                        <Activity className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="text-lg font-bold text-foreground">{prediction.technicalIndicators.momentum}%</div>
                      <div className="text-xs text-muted-foreground">Momentum</div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  {prediction.reasoning.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Analysis Reasoning:</h4>
                      <div className="space-y-2">
                        {prediction.reasoning.map((reason, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 card-matte">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-4">
                    <Clock className="h-12 w-12 mx-auto mb-2" />
                    <p>Loading historical data for predictions...</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Need at least 30 days of historical data for accurate predictions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })()}
    </div>
  );

  const renderCharts = () => {
    const period = searchParams.get('period') as '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'MAX' || '1M';
    
    return (
      <div className="space-y-6">
        <PolygonChart symbol={symbol} period={period} />

        {/* Additional Chart Options */}
        <Card className="card-matte">
              <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              Chart Options
            </CardTitle>
              </CardHeader>
              <CardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => handleExternalLink(`https://finance.yahoo.com/quote/${symbol}`)}
                className="btn-matte"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Yahoo Finance
              </Button>
              <Button 
                onClick={() => handleExternalLink(`https://www.google.com/finance/quote/${symbol}:NASDAQ`)}
                className="btn-matte-outline"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Google Finance
              </Button>
              <Button 
                onClick={() => handleExternalLink(`https://www.tradingview.com/symbols/NASDAQ-${symbol}/`)}
                className="btn-matte-outline"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on TradingView
              </Button>
                </div>
              </CardContent>
            </Card>
      </div>
    );
  };

  const renderProfile = () => (
    <Card className="card-matte">
              <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          Company Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
        {profile ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {profile.logo && (
                <img src={profile.logo} alt={`${profile.name} logo`} className="w-16 h-16 rounded-lg" />
              )}
              <div>
                <h3 className="text-xl font-bold text-foreground">{profile.name}</h3>
                <p className="text-muted-foreground">{profile.ticker}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Industry</div>
                  <div className="text-foreground font-medium">{profile.finnhubIndustry}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Country</div>
                  <div className="text-foreground font-medium">{profile.country}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Exchange</div>
                  <div className="text-foreground font-medium">{profile.exchange}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">IPO Date</div>
                  <div className="text-foreground font-medium">{profile.ipo}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="text-foreground font-medium">{formatMarketCap(profile.marketCapitalization)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Shares Outstanding</div>
                  <div className="text-foreground font-medium">{profile.shareOutstanding?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Currency</div>
                  <div className="text-foreground font-medium">{profile.currency}</div>
                </div>
                {profile.weburl && (
                  <div>
                    <div className="text-sm text-muted-foreground">Website</div>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-foreground"
                      onClick={() => handleExternalLink(profile.weburl)}
                    >
                      {profile.weburl}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Company profile data not available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderNews = () => (
    <Card className="card-matte">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          Latest News
        </CardTitle>
      </CardHeader>
      <CardContent>
        {news && news.length > 0 ? (
          <div className="space-y-4">
            {news.slice(0, 5).map((item, index) => (
              <div key={index} className="p-4 card-matte hover:bg-accent transition-colors">
                <div className="flex items-start gap-4">
                  {item.image && (
                    <img src={item.image} alt="News" className="w-16 h-16 object-cover rounded-lg" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {item.headline}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.source}</span>
                      <span>{new Date(item.datetime * 1000).toLocaleDateString()}</span>
                  </div>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-primary mt-2"
                      onClick={() => handleExternalLink(item.url)}
                    >
                      Read More
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent news available</p>
          </div>
        )}
              </CardContent>
            </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="btn-matte-outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <CompanyLogoWithFallback 
              symbol={symbol}
              companyName={getStockName(symbol)}
              size="w-12 h-12"
            />
            <div>
              <h1 className="text-3xl font-bold text-foreground">{symbol}</h1>
              <p className="text-muted-foreground">{getStockName(symbol)}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              onClick={() => setActiveTab('overview')}
              className={activeTab === 'overview' ? 'btn-matte' : 'btn-matte-outline'}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === 'charts' ? 'default' : 'outline'}
              onClick={() => setActiveTab('charts')}
              className={activeTab === 'charts' ? 'btn-matte' : 'btn-matte-outline'}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Charts
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              onClick={() => setActiveTab('profile')}
              className={activeTab === 'profile' ? 'btn-matte' : 'btn-matte-outline'}
            >
              <Building2 className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button
              variant={activeTab === 'news' ? 'default' : 'outline'}
              onClick={() => setActiveTab('news')}
              className={activeTab === 'news' ? 'btn-matte' : 'btn-matte-outline'}
            >
              <Calendar className="h-4 w-4 mr-2" />
              News
            </Button>
          </div>
          
          {/* Period Selector for Charts */}
          {activeTab === 'charts' && (
            <div className="flex gap-2">
              {(['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX'] as const).map((p) => {
                const currentPeriod = searchParams.get('period') as '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'MAX' || '1M';
                return (
                  <Button
                    key={p}
                    variant={currentPeriod === p ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newUrl = new URL(window.location.href);
                      newUrl.searchParams.set('period', p);
                      window.history.pushState({}, '', newUrl.toString());
                      window.location.reload();
                    }}
                    className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
                      currentPeriod === p ? 'btn-matte' : 'btn-matte-outline'
                    }`}
                  >
                    {p}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'charts' && renderCharts()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'news' && renderNews()}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="card-matte">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => setActiveTab('charts')}
                  className="w-full btn-matte"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Charts
                </Button>
                <Button 
                  onClick={() => setActiveTab('profile')}
                  className="w-full btn-matte-outline"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Company Profile
                </Button>
                <Button 
                  onClick={() => setActiveTab('news')}
                  className="w-full btn-matte-outline"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  News & Events
                </Button>
              </CardContent>
            </Card>

            {/* Market Status */}
            <Card className="card-matte">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Market Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-foreground font-medium">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                    <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Data Source</span>
                  <span className="text-foreground font-medium">Finnhub API</span>
                    </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Refresh Rate</span>
                  <span className="text-foreground font-medium">5 minutes</span>
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;