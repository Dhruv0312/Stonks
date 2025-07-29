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
import { formatPrice, formatChange, formatPercent, formatMarketCap } from "@/lib/utils";
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

      {/* Technical Analysis */}
      <Card className="card-matte">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-foreground" />
            Technical Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 card-matte">
              <div className="text-2xl font-bold text-blue-500 mb-2">
                {candles && candles.c && candles.c.length > 0 ? 
                  ((candles.c[candles.c.length - 1] - candles.c[0]) / candles.c[0] * 100).toFixed(1) + '%' : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">30-Day Return</div>
            </div>
            <div className="text-center p-4 card-matte">
              <div className="text-2xl font-bold text-green-500 mb-2">
                {candles && candles.v ? 
                  (candles.v.reduce((sum, vol) => sum + vol, 0) / candles.v.length / 1000000).toFixed(1) + 'M' : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Avg Volume</div>
            </div>
            <div className="text-center p-4 card-matte">
              <div className="text-2xl font-bold text-purple-500 mb-2">
                {candles && candles.c ? 
                  (Math.max(...candles.c) - Math.min(...candles.c)).toFixed(2) : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Price Range</div>
            </div>
            <div className="text-center p-4 card-matte">
              <div className="text-2xl font-bold text-orange-500 mb-2">
                {candles && candles.c ? 
                  (candles.c.reduce((sum, price) => sum + price, 0) / candles.c.length).toFixed(2) : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Avg Price</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCharts = () => (
    <div className="space-y-8">
      <Card className="card-matte">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-foreground" />
            Price Charts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PolygonChart symbol={symbol} period="1M" />
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <Card className="card-matte">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Building2 className="h-6 w-6 text-foreground" />
            Company Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Company Name</div>
                  <div className="text-foreground font-medium">{profile.name}</div>
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
                  <div className="text-sm text-muted-foreground">Industry</div>
                  <div className="text-foreground font-medium">{profile.industry}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">IPO Date</div>
                  <div className="text-foreground font-medium">{profile.ipo || 'N/A'}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="text-foreground font-medium">{formatMarketCap(profile.marketCapitalization)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Shares Outstanding</div>
                  <div className="text-foreground font-medium">{profile.shareOutstanding ? (profile.shareOutstanding / 1000000).toFixed(1) + 'M' : 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Currency</div>
                  <div className="text-foreground font-medium">{profile.currency}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="text-foreground font-medium">{profile.phone || 'N/A'}</div>
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
          ) : (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Company profile not available</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderNews = () => (
    <div className="space-y-8">
      <Card className="card-matte">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Activity className="h-6 w-6 text-foreground" />
            Latest News
          </CardTitle>
        </CardHeader>
        <CardContent>
          {news && news.length > 0 ? (
            <div className="space-y-4">
              {news.slice(0, 5).map((item, index) => (
                <div key={index} className="p-4 card-matte hover:bg-accent transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{item.headline}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.summary}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(item.datetime).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(item.datetime).toLocaleTimeString()}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{item.source}</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExternalLink(item.url)}
                      className="btn-matte-outline"
                    >
                      Read
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-muted-foreground">No recent news available</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
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
              <h1 className="text-2xl font-bold text-foreground">{symbol}</h1>
              <p className="text-muted-foreground">{getStockName(symbol)}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: 'overview', label: 'Overview', icon: Target },
            { key: 'charts', label: 'Charts', icon: BarChart3 },
            { key: 'profile', label: 'Profile', icon: Building2 },
            { key: 'news', label: 'News', icon: Activity }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "outline"}
              onClick={() => setActiveTab(tab.key as any)}
              className={activeTab === tab.key ? "btn-matte" : "btn-matte-outline"}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'charts' && renderCharts()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'news' && renderNews()}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <span>Data Source:</span>
                <span className="text-foreground font-medium">Alpha Vantage API</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Charts:</span>
                <span className="text-foreground font-medium">Polygon.io</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;