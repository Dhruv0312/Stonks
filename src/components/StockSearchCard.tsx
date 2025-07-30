
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CompanyLogoWithFallback } from '@/components/CompanyLogo';
import { Search, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useStockData } from '@/hooks/useGoogleSheetsStockData';
import { formatPrice, formatChange, formatPercent } from '@/lib/utils';

// Helper function to parse stock data
const parseStockData = (stock: any) => {
  const price = parseFloat(stock.price?.replace(/[$,]/g, '')) || 0;
  const change = parseFloat(stock.change?.replace(/[+%,]/g, '')) || 0;
  const changePercent = parseFloat(stock.changePercent?.replace(/[+%,]/g, '')) || 0;
  
  return {
    ...stock,
    price,
    change,
    changePercent,
    isPositive: change >= 0,
    isNegative: change < 0
  };
};


export const StockSearchCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Get stock data from Google Sheets
  const { data: stockData, isLoading: dataLoading } = useStockData();
  
  // Create stock database from Google Sheets data
  const stockDatabase = stockData ? stockData.map(stock => ({
    symbol: stock.symbol,
    name: stock.volume || `${stock.symbol} Stock`, // Using volume field for company name
    sector: "Technology" // Default sector since we don't have this data
  })) : [];

  // Filter stocks based on search query
  useEffect(() => {
    if (searchQuery.trim().length === 0 || dataLoading) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = stockDatabase.filter(stock => 
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8); // Limit to 8 suggestions
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchQuery, stockDatabase, dataLoading]);

  const handleSearch = async (selectedSymbol?: string) => {
    const symbolToSearch = selectedSymbol || searchQuery.trim();
    if (!symbolToSearch) return;
    setIsLoading(true);
    setShowSuggestions(false);
    
    const stock = stockDatabase.find(s => 
      s.symbol.toLowerCase() === symbolToSearch.toLowerCase() ||
      s.name.toLowerCase().includes(symbolToSearch.toLowerCase())
    );
    const finalSymbol = stock ? stock.symbol : symbolToSearch.toUpperCase();
    navigate(`/dashboard?symbol=${finalSymbol}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (stock: typeof stockDatabase[0]) => {
    setSearchQuery(stock.symbol);
    handleSearch(stock.symbol);
  };

  const popularStocks = stockDatabase.slice(0, 4); // Use first 4 stocks from Google Sheets

  const features = [
    { icon: BarChart3, title: "Technical Analysis", description: "Professional charting tools" },
    { icon: TrendingUp, title: "Real-time Data", description: "Live market updates" },
    { icon: Shield, title: "Risk Assessment", description: "Comprehensive risk analysis" },
    
  ];

  return (
    <Card className="card-matte animate-fade-in">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="icon-rounded">
            <Search className="h-6 w-6 text-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Stock Search
          </CardTitle>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Search by stock symbol or company name to get real-time data and comprehensive market analysis
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Enhanced Search Input with Autocomplete */}
        <div className="space-y-4">
          <div className="relative">
                <Input
              type="text"
              placeholder="Search by symbol (AAPL) or company name (Apple)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="input-matte h-14 text-lg font-medium"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              </div>
            
            {/* Autocomplete Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg z-50 max-h-64 overflow-y-auto">
                {suggestions.map((stock, index) => (
                  <div
                    key={`${stock.symbol}-${index}`}
                    onClick={() => handleSuggestionClick(stock)}
                    className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer transition-colors border-b border-border last:border-b-0"
              >
                    <div className="flex items-center gap-3">
                      <CompanyLogoWithFallback
                        symbol={stock.symbol}
                        companyName={stock.name}
                        size="w-8 h-8"
                      />
                      <div>
                        <div className="text-foreground font-semibold">{stock.symbol}</div>
                        <div className="text-muted-foreground text-sm">{stock.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground text-xs">{stock.sector}</div>
                    </div>
                  </div>
                ))}
                  </div>
                )}
          </div>

          <Button
            onClick={() => handleSearch()}
            disabled={!searchQuery.trim() || isLoading}
            className="w-full h-14 btn-matte text-lg font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5" />
                <span>Analyze Stock</span>
                <Zap className="h-5 w-5" />
              </div>
            )}
          </Button>
          </div>

          {/* Popular Stocks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Popular Stocks</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularStocks.map((stock) => (
              <div
                  key={stock.symbol}
                onClick={() => {
                  setSearchQuery(stock.symbol);
                  navigate(`/dashboard?symbol=${stock.symbol}`);
                }}
                className="group cursor-pointer p-3 card-matte hover:bg-accent transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {stock.symbol}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                </div>
              </div>
              ))}
            </div>
        </div>

        {/* Search Tips */}
        <div className="p-4 card-matte">
          <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Search Tips
          </h4>
          <div className="text-muted-foreground text-sm space-y-1">
            <div>• Search by symbol: "AAPL", "TSLA", "GOOGL"</div>
            <div>• Search by company name: "Apple", "Tesla", "Google"</div>
            <div>• Search by sector: "Technology", "Healthcare", "Financial"</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">Powerful Features</h3>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-4 card-matte hover:bg-accent transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="icon-rounded">
                    <feature.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live market data</span>
        </div>
      </CardContent>
    </Card>
  );
};
