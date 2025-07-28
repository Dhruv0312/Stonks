
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Zap, Shield, BarChart3, Search, Sparkles, Building2, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CompanyLogoWithFallback } from "@/components/CompanyLogo";

// Comprehensive stock database with symbols and company names
const stockDatabase = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology" },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Discretionary" },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Consumer Discretionary" },
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology" },
  { symbol: "META", name: "Meta Platforms Inc.", sector: "Technology" },
  { symbol: "BRK.A", name: "Berkshire Hathaway Inc.", sector: "Financial" },
  { symbol: "UNH", name: "UnitedHealth Group Inc.", sector: "Healthcare" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial" },
  { symbol: "V", name: "Visa Inc.", sector: "Financial" },
  { symbol: "PG", name: "Procter & Gamble Co.", sector: "Consumer Staples" },
  { symbol: "HD", name: "Home Depot Inc.", sector: "Consumer Discretionary" },
  { symbol: "MA", name: "Mastercard Inc.", sector: "Financial" },
  { symbol: "PYPL", name: "PayPal Holdings Inc.", sector: "Financial" },
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Technology" },
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Communication Services" },
  { symbol: "CRM", name: "Salesforce Inc.", sector: "Technology" },
  { symbol: "INTC", name: "Intel Corporation", sector: "Technology" },
  { symbol: "ORCL", name: "Oracle Corporation", sector: "Technology" },
  { symbol: "CSCO", name: "Cisco Systems Inc.", sector: "Technology" },
  { symbol: "IBM", name: "International Business Machines", sector: "Technology" },
  { symbol: "QCOM", name: "Qualcomm Inc.", sector: "Technology" },
  { symbol: "TXN", name: "Texas Instruments Inc.", sector: "Technology" },
  { symbol: "AMD", name: "Advanced Micro Devices Inc.", sector: "Technology" },
  { symbol: "AVGO", name: "Broadcom Inc.", sector: "Technology" },
  { symbol: "KO", name: "Coca-Cola Co.", sector: "Consumer Staples" },
  { symbol: "PEP", name: "PepsiCo Inc.", sector: "Consumer Staples" },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer Staples" },
  { symbol: "COST", name: "Costco Wholesale Corp.", sector: "Consumer Staples" },
  { symbol: "TGT", name: "Target Corporation", sector: "Consumer Discretionary" },
  { symbol: "LOW", name: "Lowe's Companies Inc.", sector: "Consumer Discretionary" },
  { symbol: "SBUX", name: "Starbucks Corporation", sector: "Consumer Discretionary" },
  { symbol: "NKE", name: "Nike Inc.", sector: "Consumer Discretionary" },
  { symbol: "MCD", name: "McDonald's Corporation", sector: "Consumer Discretionary" },
  { symbol: "BA", name: "Boeing Co.", sector: "Industrials" },
  { symbol: "CAT", name: "Caterpillar Inc.", sector: "Industrials" },
  { symbol: "GE", name: "General Electric Co.", sector: "Industrials" },
  { symbol: "HON", name: "Honeywell International Inc.", sector: "Industrials" },
  { symbol: "MMM", name: "3M Company", sector: "Industrials" },
  { symbol: "UPS", name: "United Parcel Service Inc.", sector: "Industrials" },
  { symbol: "FDX", name: "FedEx Corporation", sector: "Industrials" },
  { symbol: "RTX", name: "Raytheon Technologies Corp.", sector: "Industrials" },
  { symbol: "LMT", name: "Lockheed Martin Corporation", sector: "Industrials" },
  { symbol: "XOM", name: "Exxon Mobil Corporation", sector: "Energy" },
  { symbol: "CVX", name: "Chevron Corporation", sector: "Energy" },
  { symbol: "COP", name: "ConocoPhillips", sector: "Energy" },
  { symbol: "EOG", name: "EOG Resources Inc.", sector: "Energy" },
  { symbol: "SLB", name: "Schlumberger Limited", sector: "Energy" },
  { symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare" },
  { symbol: "ABBV", name: "AbbVie Inc.", sector: "Healthcare" },
  { symbol: "MRK", name: "Merck & Co. Inc.", sector: "Healthcare" },
  { symbol: "TMO", name: "Thermo Fisher Scientific Inc.", sector: "Healthcare" },
  { symbol: "ABT", name: "Abbott Laboratories", sector: "Healthcare" },
  { symbol: "DHR", name: "Danaher Corporation", sector: "Healthcare" },
  { symbol: "LLY", name: "Eli Lilly and Company", sector: "Healthcare" },
  { symbol: "BMY", name: "Bristol-Myers Squibb Co.", sector: "Healthcare" },
  { symbol: "AMGN", name: "Amgen Inc.", sector: "Healthcare" },
  { symbol: "GILD", name: "Gilead Sciences Inc.", sector: "Healthcare" },
  { symbol: "REGN", name: "Regeneron Pharmaceuticals Inc.", sector: "Healthcare" },
  { symbol: "VRTX", name: "Vertex Pharmaceuticals Inc.", sector: "Healthcare" },
  { symbol: "ISRG", name: "Intuitive Surgical Inc.", sector: "Healthcare" },
  { symbol: "DXCM", name: "DexCom Inc.", sector: "Healthcare" },
  { symbol: "IDXX", name: "IDEXX Laboratories Inc.", sector: "Healthcare" },
  { symbol: "ALGN", name: "Align Technology Inc.", sector: "Healthcare" },
  { symbol: "WDAY", name: "Workday Inc.", sector: "Technology" },
  { symbol: "SNOW", name: "Snowflake Inc.", sector: "Technology" },
  { symbol: "ZM", name: "Zoom Video Communications Inc.", sector: "Technology" },
  { symbol: "SPOT", name: "Spotify Technology S.A.", sector: "Communication Services" },
  { symbol: "SNAP", name: "Snap Inc.", sector: "Communication Services" },
  { symbol: "PINS", name: "Pinterest Inc.", sector: "Communication Services" },
  { symbol: "UBER", name: "Uber Technologies Inc.", sector: "Consumer Discretionary" },
  { symbol: "LYFT", name: "Lyft Inc.", sector: "Consumer Discretionary" },
  { symbol: "ABNB", name: "Airbnb Inc.", sector: "Consumer Discretionary" },
  { symbol: "DASH", name: "DoorDash Inc.", sector: "Consumer Discretionary" },
  { symbol: "COIN", name: "Coinbase Global Inc.", sector: "Financial" },
  { symbol: "ROKU", name: "Roku Inc.", sector: "Communication Services" },
  { symbol: "CRWD", name: "CrowdStrike Holdings Inc.", sector: "Technology" },
  { symbol: "ZS", name: "Zscaler Inc.", sector: "Technology" },
  { symbol: "OKTA", name: "Okta Inc.", sector: "Technology" },
  { symbol: "PLTR", name: "Palantir Technologies Inc.", sector: "Technology" },
  { symbol: "PATH", name: "UiPath Inc.", sector: "Technology" },
  { symbol: "RBLX", name: "Roblox Corporation", sector: "Communication Services" },
  { symbol: "HOOD", name: "Robinhood Markets Inc.", sector: "Financial" },
  { symbol: "LCID", name: "Lucid Group Inc.", sector: "Consumer Discretionary" },
  { symbol: "RIVN", name: "Rivian Automotive Inc.", sector: "Consumer Discretionary" },
  { symbol: "NIO", name: "NIO Inc.", sector: "Consumer Discretionary" },
  { symbol: "XPEV", name: "XPeng Inc.", sector: "Consumer Discretionary" },
  { symbol: "LI", name: "Li Auto Inc.", sector: "Consumer Discretionary" },
  { symbol: "BIDU", name: "Baidu Inc.", sector: "Technology" },
  { symbol: "JD", name: "JD.com Inc.", sector: "Consumer Discretionary" },
  { symbol: "PDD", name: "Pinduoduo Inc.", sector: "Consumer Discretionary" },
  { symbol: "BABA", name: "Alibaba Group Holding Limited", sector: "Consumer Discretionary" },
  { symbol: "TCEHY", name: "Tencent Holdings Limited", sector: "Communication Services" },
  { symbol: "NTES", name: "NetEase Inc.", sector: "Communication Services" },
  { symbol: "ASML", name: "ASML Holding N.V.", sector: "Technology" },
  { symbol: "SHOP", name: "Shopify Inc.", sector: "Technology" },
  { symbol: "SE", name: "Sea Limited", sector: "Consumer Discretionary" },
  { symbol: "MELI", name: "MercadoLibre Inc.", sector: "Consumer Discretionary" },
  { symbol: "AFRM", name: "Affirm Holdings Inc.", sector: "Financial" },
  { symbol: "UPST", name: "Upstart Holdings Inc.", sector: "Financial" },
  { symbol: "SOFI", name: "SoFi Technologies Inc.", sector: "Financial" },
  { symbol: "CHWY", name: "Chewy Inc.", sector: "Consumer Discretionary" },
  { symbol: "ETSY", name: "Etsy Inc.", sector: "Consumer Discretionary" },
  { symbol: "FTCH", name: "Farfetch Limited", sector: "Consumer Discretionary" },
  { symbol: "W", name: "Wayfair Inc.", sector: "Consumer Discretionary" },
  { symbol: "PTON", name: "Peloton Interactive Inc.", sector: "Consumer Discretionary" },
  { symbol: "BYND", name: "Beyond Meat Inc.", sector: "Consumer Staples" },
  { symbol: "OATLY", name: "Oatly Group AB", sector: "Consumer Staples" }
];

export const StockSearchCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof stockDatabase>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Filter stocks based on search query
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = stockDatabase.filter(stock => 
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.sector.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8); // Limit to 8 suggestions
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchQuery]);

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

  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
  ];

  const features = [
    { icon: Brain, title: "AI Predictions", description: "Advanced machine learning algorithms" },
    { icon: TrendingUp, title: "Real-time Data", description: "Live market updates" },
    { icon: BarChart3, title: "Technical Analysis", description: "Professional charting tools" },
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
            Stock Analysis Dashboard
          </CardTitle>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Search by stock symbol or company name to get AI-powered predictions, real-time data, and comprehensive market analysis
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
                <Brain className="h-5 w-5" />
                <span>Get AI Analysis</span>
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
