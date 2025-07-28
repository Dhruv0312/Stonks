import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Grid3X3, 
  List, 
  Filter, 
  Target, 
  Zap, 
  Building2, 
  TrendingUp, 
  Database,
  RefreshCw 
} from "lucide-react";
import { CompanyLogoWithFallback } from "@/components/CompanyLogo";
import { formatMarketCap } from "@/lib/utils";

// Stock database with real companies
const stockDatabase = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", marketCap: 3000000000000 },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology", marketCap: 2800000000000 },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology", marketCap: 1800000000000 },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Cyclical", marketCap: 1600000000000 },
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology", marketCap: 1200000000000 },
  { symbol: "META", name: "Meta Platforms Inc.", sector: "Technology", marketCap: 800000000000 },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Consumer Cyclical", marketCap: 700000000000 },
  { symbol: "BRK.A", name: "Berkshire Hathaway Inc.", sector: "Financial Services", marketCap: 800000000000 },
  { symbol: "UNH", name: "UnitedHealth Group Inc.", sector: "Healthcare", marketCap: 450000000000 },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", marketCap: 400000000000 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services", marketCap: 450000000000 },
  { symbol: "V", name: "Visa Inc.", sector: "Financial Services", marketCap: 500000000000 },
  { symbol: "PG", name: "Procter & Gamble Co.", sector: "Consumer Defensive", marketCap: 350000000000 },
  { symbol: "HD", name: "The Home Depot Inc.", sector: "Consumer Cyclical", marketCap: 300000000000 },
  { symbol: "MA", name: "Mastercard Inc.", sector: "Financial Services", marketCap: 400000000000 },
  { symbol: "DIS", name: "The Walt Disney Company", sector: "Communication Services", marketCap: 180000000000 },
  { symbol: "PYPL", name: "PayPal Holdings Inc.", sector: "Financial Services", marketCap: 70000000000 },
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Technology", marketCap: 250000000000 },
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Communication Services", marketCap: 200000000000 },
  { symbol: "CRM", name: "Salesforce Inc.", sector: "Technology", marketCap: 200000000000 },
  { symbol: "INTC", name: "Intel Corporation", sector: "Technology", marketCap: 180000000000 },
  { symbol: "VZ", name: "Verizon Communications Inc.", sector: "Communication Services", marketCap: 160000000000 },
  { symbol: "KO", name: "The Coca-Cola Company", sector: "Consumer Defensive", marketCap: 250000000000 },
  { symbol: "PEP", name: "PepsiCo Inc.", sector: "Consumer Defensive", marketCap: 230000000000 },
  { symbol: "ABT", name: "Abbott Laboratories", sector: "Healthcare", marketCap: 200000000000 },
  { symbol: "TMO", name: "Thermo Fisher Scientific Inc.", sector: "Healthcare", marketCap: 200000000000 },
  { symbol: "COST", name: "Costco Wholesale Corporation", sector: "Consumer Defensive", marketCap: 250000000000 },
  { symbol: "AVGO", name: "Broadcom Inc.", sector: "Technology", marketCap: 200000000000 },
  { symbol: "ACN", name: "Accenture plc", sector: "Technology", marketCap: 180000000000 },
  { symbol: "DHR", name: "Danaher Corporation", sector: "Healthcare", marketCap: 180000000000 },
  { symbol: "LLY", name: "Eli Lilly and Company", sector: "Healthcare", marketCap: 500000000000 },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer Defensive", marketCap: 400000000000 },
  { symbol: "BAC", name: "Bank of America Corp.", sector: "Financial Services", marketCap: 250000000000 },
  { symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare", marketCap: 160000000000 },
  { symbol: "TXN", name: "Texas Instruments Inc.", sector: "Technology", marketCap: 150000000000 },
  { symbol: "HON", name: "Honeywell International Inc.", sector: "Industrials", marketCap: 120000000000 },
  { symbol: "QCOM", name: "QUALCOMM Inc.", sector: "Technology", marketCap: 140000000000 },
  { symbol: "ORCL", name: "Oracle Corporation", sector: "Technology", marketCap: 300000000000 },
  { symbol: "IBM", name: "International Business Machines", sector: "Technology", marketCap: 140000000000 },
  { symbol: "CSCO", name: "Cisco Systems Inc.", sector: "Technology", marketCap: 200000000000 },
  { symbol: "CMCSA", name: "Comcast Corporation", sector: "Communication Services", marketCap: 180000000000 },
  { symbol: "GE", name: "General Electric Company", sector: "Industrials", marketCap: 100000000000 },
  { symbol: "AMGN", name: "Amgen Inc.", sector: "Healthcare", marketCap: 150000000000 },
  { symbol: "ISRG", name: "Intuitive Surgical Inc.", sector: "Healthcare", marketCap: 100000000000 },
  { symbol: "GILD", name: "Gilead Sciences Inc.", sector: "Healthcare", marketCap: 100000000000 },
  { symbol: "MDLZ", name: "Mondelez International Inc.", sector: "Consumer Defensive", marketCap: 90000000000 },
  { symbol: "ADP", name: "Automatic Data Processing Inc.", sector: "Technology", marketCap: 90000000000 },
  { symbol: "REGN", name: "Regeneron Pharmaceuticals Inc.", sector: "Healthcare", marketCap: 80000000000 },
  { symbol: "BMY", name: "Bristol-Myers Squibb Company", sector: "Healthcare", marketCap: 100000000000 },
  { symbol: "RTX", name: "Raytheon Technologies Corporation", sector: "Industrials", marketCap: 120000000000 },
  { symbol: "LOW", name: "Lowe's Companies Inc.", sector: "Consumer Cyclical", marketCap: 120000000000 },
  { symbol: "UPS", name: "United Parcel Service Inc.", sector: "Industrials", marketCap: 140000000000 },
  { symbol: "SPGI", name: "S&P Global Inc.", sector: "Financial Services", marketCap: 120000000000 },
  { symbol: "INTU", name: "Intuit Inc.", sector: "Technology", marketCap: 150000000000 },
  { symbol: "MS", name: "Morgan Stanley", sector: "Financial Services", marketCap: 140000000000 },
  { symbol: "GS", name: "The Goldman Sachs Group Inc.", sector: "Financial Services", marketCap: 120000000000 },
  { symbol: "BLK", name: "BlackRock Inc.", sector: "Financial Services", marketCap: 100000000000 },
  { symbol: "SCHW", name: "The Charles Schwab Corporation", sector: "Financial Services", marketCap: 100000000000 },
  { symbol: "AXP", name: "American Express Company", sector: "Financial Services", marketCap: 120000000000 },
  { symbol: "CAT", name: "Caterpillar Inc.", sector: "Industrials", marketCap: 120000000000 },
  { symbol: "DE", name: "Deere & Company", sector: "Industrials", marketCap: 100000000000 },
  { symbol: "MMC", name: "Marsh & McLennan Companies Inc.", sector: "Financial Services", marketCap: 80000000000 },
  { symbol: "PLD", name: "Prologis Inc.", sector: "Real Estate", marketCap: 100000000000 },
  { symbol: "CCI", name: "Crown Castle Inc.", sector: "Real Estate", marketCap: 60000000000 },
  { symbol: "AMT", name: "American Tower Corporation", marketCap: 80000000000 },
  { symbol: "EQIX", name: "Equinix Inc.", sector: "Real Estate", marketCap: 70000000000 },
  { symbol: "O", name: "Realty Income Corporation", sector: "Real Estate", marketCap: 40000000000 },
  { symbol: "WELL", name: "Welltower Inc.", sector: "Real Estate", marketCap: 50000000000 },
  { symbol: "PSA", name: "Public Storage", sector: "Real Estate", marketCap: 50000000000 },
  { symbol: "EQR", name: "Equity Residential", sector: "Real Estate", marketCap: 30000000000 },
  { symbol: "AVB", name: "AvalonBay Communities Inc.", sector: "Real Estate", marketCap: 25000000000 },
  { symbol: "BXP", name: "Boston Properties Inc.", sector: "Real Estate", marketCap: 10000000000 },
  { symbol: "VICI", name: "VICI Properties Inc.", sector: "Real Estate", marketCap: 30000000000 },
  { symbol: "DLR", name: "Digital Realty Trust Inc.", sector: "Real Estate", marketCap: 40000000000 },
  { symbol: "ARE", name: "Alexandria Real Estate Equities Inc.", sector: "Real Estate", marketCap: 20000000000 },
  { symbol: "MAA", name: "Mid-America Apartment Communities Inc.", sector: "Real Estate", marketCap: 15000000000 },
  { symbol: "UDR", name: "UDR Inc.", sector: "Real Estate", marketCap: 10000000000 },
  { symbol: "ESS", name: "Essex Property Trust Inc.", sector: "Real Estate", marketCap: 15000000000 },
  { symbol: "CPT", name: "Camden Property Trust", sector: "Real Estate", marketCap: 10000000000 },
  { symbol: "AIV", name: "Apartment Investment and Management Company", sector: "Real Estate", marketCap: 5000000000 }
];



const AllStocks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Get unique sectors
  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(stockDatabase.map(stock => stock.sector))];
    return uniqueSectors.sort();
  }, []);

  // Filter stocks based on search term and sector
  const filteredStocks = useMemo(() => {
    return stockDatabase.filter(stock => {
      const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.sector.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = selectedSector === "all" || stock.sector === selectedSector;
      return matchesSearch && matchesSector;
    });
  }, [searchTerm, selectedSector]);

  const LoadingSpinner = () => {
    if (isLoading) return <span className="inline-block"><RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" /></span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            All Stocks
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive database of stocks with real-time data, company profiles, and AI-powered analysis
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="card-matte mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by symbol, company name, or sector..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-matte pl-10"
                />
              </div>

              {/* Sector Filter */}
              <div className="flex gap-2">
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="input-matte"
                >
                  <option value="all">All Sectors</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">View Mode:</span>
            <div className="flex bg-secondary rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "btn-matte" : "bg-transparent"}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "btn-matte" : "bg-transparent"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-muted-foreground text-sm">
            {filteredStocks.length} stocks found
          </div>
        </div>

        {/* Stocks Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStocks.map((stock) => (
              <Card
                key={stock.symbol}
                className="card-matte hover:bg-accent cursor-pointer transition-all duration-300"
                onClick={() => window.location.href = `/dashboard?symbol=${stock.symbol}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CompanyLogoWithFallback
                      symbol={stock.symbol}
                      companyName={stock.name}
                      size="w-12 h-12"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-lg">{stock.symbol}</h3>
                      <div className="text-muted-foreground text-sm truncate">{stock.name}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Sector</span>
                      <Badge className="badge-matte">{stock.sector}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Market Cap</span>
                      <div className="flex items-center gap-1">
                        <span className="text-foreground font-medium">{formatMarketCap(stock.marketCap)}</span>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStocks.map((stock) => (
              <Card
                key={stock.symbol}
                className="card-matte hover:bg-accent cursor-pointer transition-all duration-300"
                onClick={() => window.location.href = `/dashboard?symbol=${stock.symbol}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <CompanyLogoWithFallback
                      symbol={stock.symbol}
                      companyName={stock.name}
                      size="w-16 h-16"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground text-xl">{stock.symbol}</h3>
                        <Badge className="badge-matte">{stock.sector}</Badge>
                      </div>
                      <div className="text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground font-medium text-lg">{formatMarketCap(stock.marketCap)}</div>
                      <div className="text-muted-foreground text-sm">Market Cap</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
          <Card className="card-matte">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stockDatabase.length}</div>
              <div className="text-muted-foreground text-sm">Total Stocks</div>
            </CardContent>
          </Card>
          <Card className="card-matte">
            <CardContent className="p-4 text-center">
              <Building2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{sectors.length}</div>
              <div className="text-muted-foreground text-sm">Sectors</div>
            </CardContent>
          </Card>
          <Card className="card-matte">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">Real-time</div>
              <div className="text-muted-foreground text-sm">Market Data</div>
            </CardContent>
          </Card>
          <Card className="card-matte">
            <CardContent className="p-4 text-center">
              <Database className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">AI</div>
              <div className="text-muted-foreground text-sm">Powered Analysis</div>
            </CardContent>
          </Card>
          <Card className="card-matte">
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">Fast</div>
              <div className="text-muted-foreground text-sm">Performance</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AllStocks; 