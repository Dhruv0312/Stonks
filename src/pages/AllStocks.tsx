import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompanyLogoWithFallback } from '@/components/CompanyLogo';
import { formatPrice, formatChange, formatPercent } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Grid3X3, 
  List, 
  Filter, 
  ArrowUpDown,
  RefreshCw,
  Target,
  ArrowUp,
  ArrowDown,
  Zap,
  Building2,
  Database
} from 'lucide-react';
import { useStockData, useRSIData, useMACDData } from '@/hooks/useGoogleSheetsStockData';

// Helper function to parse stock data
const parseStockData = (stock: any) => {
  const price = parseFloat(stock.price?.replace(/[$,]/g, '')) || 0;
  const change = parseFloat(stock.change?.replace(/[+%,]/g, '')) || 0;
  const changePercent = parseFloat(stock.changePercent?.replace(/[+%,]/g, '')) || 0;
  
  let marketCap = 0;
  if (stock.marketCap) {
    const cleanMarketCap = stock.marketCap.toString().replace(/[$,BMTK\s]/gi, '');
    marketCap = parseFloat(cleanMarketCap) || 0;
    
    if (stock.marketCap.toString().toUpperCase().includes('T')) {
      marketCap *= 1e12;
    } else if (stock.marketCap.toString().toUpperCase().includes('B')) {
      marketCap *= 1e9;
    } else if (stock.marketCap.toString().toUpperCase().includes('M')) {
      marketCap *= 1e6;
    } else if (stock.marketCap.toString().toUpperCase().includes('K')) {
      marketCap *= 1e3;
    }
  }
  
  return {
    ...stock,
    price,
    change,
    changePercent,
    marketCap,
    isPositive: change >= 0,
    isNegative: change < 0
  };
};

// Helper function to format market cap
const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
};


type SortField = "symbol" | "name" | "marketCap";
type FilterRecommendation = "all" | "buy" | "sell" | "hold";
type SortDirection = "asc" | "desc";

const AllStocks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortField, setSortField] = useState<SortField>("symbol");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filterRecommendation, setFilterRecommendation] = useState<FilterRecommendation>("all");
  
  // Get stock data from Google Sheets
  const { data: stockData, isLoading, error } = useStockData();
  const { data: rsiData, isLoading: rsiLoading } = useRSIData();
  const { data: macdData, isLoading: macdLoading } = useMACDData();
  
  // Trading recommendation functions
  const getRSIRecommendation = (rsi: number) => {
    if (rsi >= 70) return "SELL";
    if (rsi <= 30) return "BUY";
    if (rsi > 50) return "HOLD";
    return "HOLD";
  };

  const getMACDRecommendation = (macd: number, macdSignal: number, macdHistogram: number) => {
    const isBullish = macd > macdSignal && macdHistogram > 0;
    const isBearish = macd < macdSignal && macdHistogram < 0;
    
    if (isBullish) return "BUY";
    if (isBearish) return "SELL";
    return "HOLD";
  };

  const getOverallRecommendation = (rsi: number, macd: number, macdSignal: number, macdHistogram: number) => {
    const rsiRec = getRSIRecommendation(rsi);
    const macdRec = getMACDRecommendation(macd, macdSignal, macdHistogram);
    
    // Simple logic: if both indicators agree, follow them; otherwise, HOLD
    if (rsiRec === macdRec) {
      return rsiRec;
    }
    return "HOLD";
  };

  // Create stock database from Google Sheets data
  const stockDatabase = stockData && stockData.length > 1 ? stockData.slice(1).map((row: any[]) => {
    const stock = {
      symbol: row[0] || '',
      name: row[1] || '',
      sector: row[2] || 'Technology',
      price: row[3] || '0',
      change: row[4] || '0',
      changePercent: row[5] || '0%',
      marketCap: row[6] || '0'
    };
    
    const parsedData = parseStockData(stock);
    
    // Find RSI and MACD data for this stock
    const rsiDataRow = rsiData && rsiData.length > 1 ? 
      rsiData.slice(1).find((rsiRow: any[]) => rsiRow[0] === stock.symbol) : null;
    const macdDataRow = macdData && macdData.length > 1 ? 
      macdData.slice(1).find((macdRow: any[]) => macdRow[0] === stock.symbol) : null;
    let recommendation = "HOLD";
    
    if (rsiDataRow && macdDataRow) {
      const rsi = parseFloat(rsiDataRow[1] || "0");
      const macd = parseFloat(macdDataRow[1] || "0");
      const macdSignal = parseFloat(macdDataRow[2] || "0");
      const macdHistogram = parseFloat(macdDataRow[3] || "0");
      
      recommendation = getOverallRecommendation(rsi, macd, macdSignal, macdHistogram);
    }
    
    return {
      symbol: stock.symbol,
      name: stock.name,
      sector: stock.sector,
      marketCap: parsedData.marketCap || 0,
      recommendation: recommendation as "BUY" | "SELL" | "HOLD"
    };
  }) : [];



  // Filter and sort stocks based on search term, recommendation filter, and sort criteria
  const filteredAndSortedStocks = useMemo(() => {
    let filtered = stockDatabase.filter(stock => {
      const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.sector.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRecommendation = filterRecommendation === "all" || 
                                   stock.recommendation.toLowerCase() === filterRecommendation.toLowerCase();
      
      return matchesSearch && matchesRecommendation;
    });

    // Sort the filtered stocks
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "symbol":
          aValue = a.symbol.toLowerCase();
          bValue = b.symbol.toLowerCase();
          break;
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "marketCap":
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
        default:
          aValue = a.symbol.toLowerCase();
          bValue = b.symbol.toLowerCase();
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        if (sortDirection === "asc") {
          return (aValue as number) - (bValue as number);
        } else {
          return (bValue as number) - (aValue as number);
        }
      }
    });

    return filtered;
  }, [searchTerm, filterRecommendation, sortField, sortDirection, stockDatabase]);

  const LoadingSpinner = () => {
    if (isLoading) return <span className="inline-block"><RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" /></span>;
    return null;
  };

  const handleStockClick = (stock: { symbol: string; name: string }) => {
    navigate(`/stock/${stock.symbol}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
                 {/* Header */}
         <div className="text-center mb-8">
           <h1 className="text-5xl font-black text-gradient mb-4 animate-fade-in">
             All Stocks
           </h1>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
             Explore your curated stock database from Google Sheets with real-time data and technical analysis
           </p>
         </div>

        {/* Search, Filters, and Sort Controls */}
        <Card className="card-matte mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Input */}
              <div className="flex-1 relative w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by symbol, company name, or sector..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-matte pl-10"
                />
              </div>

              {/* Recommendation Filter */}
              <div className="flex items-center gap-3">
                <div className="icon-rounded">
                  <Target className="h-4 w-4 text-gradient" />
                </div>
                <select
                  value={filterRecommendation}
                  onChange={(e) => setFilterRecommendation(e.target.value as FilterRecommendation)}
                  className="select-recommendation"
                >
                  <option value="all">All Recommendations</option>
                  <option value="buy">BUY</option>
                  <option value="sell">SELL</option>
                  <option value="hold">HOLD</option>
                </select>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-3">
                <div className="icon-rounded">
                  <ArrowUpDown className="h-4 w-4 text-gradient" />
                </div>
                <span className="text-sm font-medium text-foreground">Sort by:</span>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as SortField)}
                  className="select-sort"
                >
                  <option value="symbol">Symbol</option>
                  <option value="name">Name</option>
                  <option value="marketCap">Market Cap</option>
                </select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                  className="btn-matte-outline"
                >
                  {sortDirection === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {/* Sort Description */}
            <div className="mt-4 text-center lg:text-left">
              <div className="text-sm text-muted-foreground">
                {sortField === "symbol" && "Alphabetical by symbol"}
                {sortField === "name" && "Alphabetical by company name"}
                {sortField === "marketCap" && `Market cap ${sortDirection === "asc" ? "low to high" : "high to low"}`}
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
            {filteredAndSortedStocks.length} stocks found
          </div>
        </div>

        {/* Stocks Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedStocks.map((stock) => (
              <Card
                key={stock.symbol}
                className="card-matte hover:bg-accent cursor-pointer transition-all duration-300"
                onClick={() => handleStockClick({ symbol: stock.symbol, name: stock.name })}
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

                   {/* Recommendation Badge */}
                   <div className="mb-3">
                     <Badge 
                       className={`badge-matte ${
                         stock.recommendation === 'BUY' ? 'bg-green-500/20 text-green-600 border-green-500/30' :
                         stock.recommendation === 'SELL' ? 'bg-red-500/20 text-red-600 border-red-500/30' :
                         'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                       }`}
                     >
                       {stock.recommendation}
                     </Badge>
                   </div>

                                       <div className="space-y-3">
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
            {filteredAndSortedStocks.map((stock) => (
              <Card
                key={stock.symbol}
                className="card-matte hover:bg-accent cursor-pointer transition-all duration-300"
                onClick={() => handleStockClick({ symbol: stock.symbol, name: stock.name })}
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
                      </div>
                      <div className="text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-foreground font-medium text-lg">{formatMarketCap(stock.marketCap)}</div>
                        <div className="text-muted-foreground text-sm">Market Cap</div>
                        <div className="mt-2">
                          <Badge 
                            className={`badge-matte ${
                              stock.recommendation === 'BUY' ? 'bg-green-500/20 text-green-600 border-green-500/30' :
                              stock.recommendation === 'SELL' ? 'bg-red-500/20 text-red-600 border-red-500/30' :
                              'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                            }`}
                          >
                            {stock.recommendation}
                          </Badge>
                        </div>
                      </div>


                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
                 )}

         {/* Stats Cards */}
         <div className="grid grid-cols-2 md:grid-cols-8 gap-4 mt-12">
          <Card className="card-matte">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stockDatabase.length}</div>
              <div className="text-muted-foreground text-sm">Total Stocks</div>
            </CardContent>
          </Card>
          <Card className="card-matte">
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 text-green-500 mx-auto mb-2 flex items-center justify-center font-bold">BUY</div>
              <div className="text-2xl font-bold text-foreground">{stockDatabase.filter(s => s.recommendation === 'BUY').length}</div>
              <div className="text-muted-foreground text-sm">Buy Signals</div>
            </CardContent>
          </Card>
          <Card className="card-matte">
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 text-red-500 mx-auto mb-2 flex items-center justify-center font-bold">SELL</div>
              <div className="text-2xl font-bold text-foreground">{stockDatabase.filter(s => s.recommendation === 'SELL').length}</div>
              <div className="text-muted-foreground text-sm">Sell Signals</div>
            </CardContent>
          </Card>
          <Card className="card-matte">
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 text-yellow-500 mx-auto mb-2 flex items-center justify-center font-bold">HOLD</div>
              <div className="text-2xl font-bold text-foreground">{stockDatabase.filter(s => s.recommendation === 'HOLD').length}</div>
              <div className="text-muted-foreground text-sm">Hold Signals</div>
            </CardContent>
          </Card>
                     <Card className="card-matte">
             <CardContent className="p-4 text-center">
               <Building2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
               <div className="text-2xl font-bold text-foreground">1</div>
               <div className="text-muted-foreground text-sm">Sector</div>
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