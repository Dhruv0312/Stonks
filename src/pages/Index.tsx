import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStockData } from '@/hooks/useGoogleSheetsStockData';
import { TrendingUp, TrendingDown, Search, Activity, Github, Linkedin, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { CompanyLogoWithFallback } from "@/components/CompanyLogo";
import { formatPrice, formatChange, formatPercent } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  

  
  // Get stock data from Google Sheets
  const { data: stockData, isLoading: dataLoading } = useStockData();
  
  // Create stock database from Google Sheets data
  const stockDatabase = stockData && stockData.length > 1 ? stockData.slice(1).map((row: any[]) => ({
    symbol: row[1] || '', // Column B
    name: row[3] || '', // Column D
    sector: 'Technology', // Default sector
    price: row[4] || '0', // Column E
    change: row[5] || '0', // Column F
    changePercent: row[6] || '0%', // Column G
    marketCap: row[7] || '0' // Column H
  })) : [];

  // Popular stocks for display (6 stocks)
  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "NVDA", name: "NVIDIA Corp." },
    { symbol: "TSLA", name: "Tesla Inc." }
  ];

  // Extended list for backdrop animations (more variety)
  const backdropStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "NVDA", name: "NVIDIA Corp." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "META", name: "Meta Platforms" },
    { symbol: "NFLX", name: "Netflix Inc." },
    { symbol: "JPM", name: "JPMorgan Chase" },
    { symbol: "JNJ", name: "Johnson & Johnson" },
    { symbol: "V", name: "Visa Inc." },
    { symbol: "PG", name: "Procter & Gamble" },
    { symbol: "UNH", name: "UnitedHealth Group" },
    { symbol: "HD", name: "Home Depot" },
    { symbol: "MA", name: "Mastercard" },
    { symbol: "DIS", name: "Walt Disney" }
  ];

  // Live ticker stocks - show most popular companies that exist in the data
  const popularSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA", "META", "NFLX"];
  const tickerStocks = popularSymbols
    .map(symbol => {
      const stock = stockDatabase.find(s => s.symbol === symbol);
      return stock ? { symbol: stock.symbol, name: stock.name } : null;
    })
    .filter(Boolean) // Remove any null entries (stocks not found in data)
    .slice(0, 8); // Limit to 8 stocks

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
    setShowSuggestions(false);
    
    const stock = stockDatabase.find(s => 
      s.symbol.toLowerCase() === symbolToSearch.toLowerCase() ||
      s.name.toLowerCase().includes(symbolToSearch.toLowerCase())
    );
    const finalSymbol = stock ? stock.symbol : symbolToSearch.toUpperCase();
    navigate(`/stock/${finalSymbol}`);
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

  const handleStockClick = (stock: { symbol: string; name: string }) => {
    navigate(`/stock/${stock.symbol}`);
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          {/* Main floating logos across the entire page */}
          {backdropStocks.map((stock, index) => (
            <div
              key={`backdrop-${stock.symbol}`}
              className="absolute animate-float"
              style={{
                left: `${5 + (index * 6) % 90}%`,
                top: `${10 + (index * 8) % 80}%`,
                animationDelay: `${index * 1.5}s`,
                animationDuration: `${12 + index * 1.5}s`,
                opacity: 0.08,
                transform: `scale(${0.7 + (index % 4) * 0.15})`
              }}
            >
              <CompanyLogoWithFallback
                symbol={stock.symbol}
                companyName={stock.name}
                size="w-14 h-14"
              />
            </div>
          ))}
          
          {/* Additional floating elements for more variety */}
          {backdropStocks.slice(0, 8).map((stock, index) => (
            <div
              key={`backdrop-extra-${stock.symbol}`}
              className="absolute animate-float-reverse"
              style={{
                left: `${15 + (index * 10) % 70}%`,
                top: `${60 + (index * 12) % 35}%`,
                animationDelay: `${index * 2 + 8}s`,
                animationDuration: `${18 + index * 2}s`,
                opacity: 0.06,
                transform: `scale(${0.5 + (index % 3) * 0.2})`
              }}
            >
              <CompanyLogoWithFallback
                symbol={stock.symbol}
                companyName={stock.name}
                size="w-10 h-10"
              />
            </div>
          ))}

          {/* Small floating elements for extra density */}
          {backdropStocks.slice(0, 12).map((stock, index) => (
            <div
              key={`backdrop-small-${stock.symbol}`}
              className="absolute animate-float"
              style={{
                left: `${20 + (index * 8) % 60}%`,
                top: `${30 + (index * 6) % 50}%`,
                animationDelay: `${index * 3 + 12}s`,
                animationDuration: `${25 + index * 1}s`,
                opacity: 0.04,
                transform: `scale(${0.4 + (index % 2) * 0.1})`
              }}
            >
              <CompanyLogoWithFallback
                symbol={stock.symbol}
                companyName={stock.name}
                size="w-8 h-8"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <section className="w-full flex flex-col items-center justify-center py-12 bg-background relative">
          {/* Header backdrop logos */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backdropStocks.slice(0, 10).map((stock, index) => (
              <div
                key={`header-backdrop-${stock.symbol}`}
                className="absolute animate-float"
                style={{
                  left: `${20 + (index * 7) % 60}%`,
                  top: `${15 + (index * 10) % 70}%`,
                  animationDelay: `${index * 2}s`,
                  animationDuration: `${15 + index * 2}s`,
                  opacity: 0.05,
                  transform: `scale(${0.6 + (index % 3) * 0.2})`
                }}
              >
                <CompanyLogoWithFallback
                  symbol={stock.symbol}
                  companyName={stock.name}
                  size="w-12 h-12"
                />
              </div>
            ))}
            
            {/* Additional header backdrop elements */}
            {backdropStocks.slice(5, 12).map((stock, index) => (
              <div
                key={`header-backdrop-extra-${stock.symbol}`}
                className="absolute animate-float-reverse"
                style={{
                  left: `${10 + (index * 8) % 80}%`,
                  top: `${25 + (index * 8) % 60}%`,
                  animationDelay: `${index * 3 + 5}s`,
                  animationDuration: `${20 + index * 1.5}s`,
                  opacity: 0.03,
                  transform: `scale(${0.4 + (index % 2) * 0.15})`
                }}
              >
                <CompanyLogoWithFallback
                  symbol={stock.symbol}
                  companyName={stock.name}
                  size="w-8 h-8"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-gradient mb-6 animate-pulse-slow">
              Stonks
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-medium">
              Real-time stock data and market insights
            </p>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="container mx-auto px-4 py-8">
          <Card className="card-matte max-w-2xl mx-auto">
            <CardContent className="space-y-4">
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button
                onClick={() => handleSearch()}
                disabled={!searchQuery.trim()}
                className="w-full h-14 btn-matte text-lg font-semibold"
              >
                Search Stocks
              </Button>
            </CardContent>
          </Card>

          {/* Popular Stocks Small Tiles */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {popularStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => handleStockClick({ symbol: stock.symbol, name: stock.name })}
                  className="flex flex-col items-center p-3 card-matte hover:bg-accent cursor-pointer transition-all duration-300 group"
                >
                  <CompanyLogoWithFallback
                    symbol={stock.symbol}
                    companyName={stock.name}
                    size="w-8 h-8"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Market Ticker Section (8 tiles) */}
        <section className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-4 flex items-center justify-center gap-3">
              <div className="icon-rounded">
                <Activity className="h-8 w-8 text-gradient" />
              </div>
              Live Market Ticker
            </h2>
            <p className="text-muted-foreground text-lg font-medium">
              Real-time market data for popular stocks
            </p>
          </div>
          
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {tickerStocks.map((stock) => {
               // Use the parsed stock data directly from stockDatabase
               const stockInfo = stockDatabase.find(s => s.symbol === stock.symbol);
               
               const parsedData = stockInfo ? {
                 price: parseFloat(stockInfo.price?.replace(/[$,]/g, '') || '0'),
                 change: parseFloat(stockInfo.change?.replace(/[+%,]/g, '') || '0'),
                 changePercent: parseFloat(stockInfo.changePercent?.replace(/[+%,]/g, '') || '0'),
                 isPositive: parseFloat(stockInfo.change?.replace(/[+%,]/g, '') || '0') > 0,
                 isNegative: parseFloat(stockInfo.change?.replace(/[+%,]/g, '') || '0') < 0,
               } : null;
              
              return (
                <Card
                  key={stock.symbol}
                  className="card-matte hover:bg-accent cursor-pointer transition-all duration-300 group"
                  onClick={() => handleStockClick({ symbol: stock.symbol, name: stock.name })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CompanyLogoWithFallback
                        symbol={stock.symbol}
                        companyName={stock.name}
                        size="w-10 h-10"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground">{stock.symbol}</h3>
                        <div className="text-muted-foreground text-xs truncate">{stock.name}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-xs">Price</span>
                        <span className="text-foreground font-medium text-sm">
                          {dataLoading ? 'Loading...' : parsedData ? formatPrice(parsedData.price) : '-'}
                        </span>
                      </div>

                      {parsedData && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-xs">Change</span>
                          <div className={`flex items-center gap-1 ${
                            parsedData.isPositive ? 'text-green-500' : 
                            parsedData.isNegative ? 'text-red-500' : 'text-muted-foreground'
                          }`}>
                            {getChangeIcon(parsedData.change)}
                            <span className="text-xs font-medium">
                              {parsedData.isPositive ? '+' : ''}{parsedData.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

                 {/* Footer Section */}
         <footer className="bg-muted/20 py-12 mt-16 relative overflow-hidden">
           {/* Footer backdrop particles */}
           <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {backdropStocks.slice(0, 6).map((stock, index) => (
               <div
                 key={`footer-backdrop-${stock.symbol}`}
                 className="absolute animate-float"
                 style={{
                   left: `${10 + (index * 15) % 80}%`,
                   top: `${20 + (index * 12) % 60}%`,
                   animationDelay: `${index * 4}s`,
                   animationDuration: `${25 + index * 3}s`,
                   opacity: 0.03,
                   transform: `scale(${0.3 + (index % 2) * 0.1})`
                 }}
               >
                 <CompanyLogoWithFallback
                   symbol={stock.symbol}
                   companyName={stock.name}
                   size="w-6 h-6"
                 />
               </div>
             ))}
           </div>
           
           <div className="container mx-auto px-4 text-center relative z-10">
             <div className="flex flex-col items-center gap-6">
               <div className="flex items-center gap-6">
                 <a
                   href="https://github.com/dhruv0312"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-3 text-muted-foreground hover:text-gradient transition-all duration-300 group"
                 >
                   <div className="icon-rounded group-hover:scale-110 transition-transform">
                     <Github className="h-6 w-6" />
                   </div>
                   <span className="font-medium">GitHub</span>
                 </a>
                 <a
                   href="https://www.linkedin.com/in/dhruv0312"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-3 text-muted-foreground hover:text-gradient transition-all duration-300 group"
                 >
                   <div className="icon-rounded group-hover:scale-110 transition-transform">
                     <Linkedin className="h-6 w-6" />
                   </div>
                   <span className="font-medium">LinkedIn</span>
                 </a>
               </div>
               <div className="text-muted-foreground text-lg">
                 Made by <span className="font-bold text-gradient">Dhruv</span>
               </div>
             </div>
           </div>
         </footer>
      </div>

           </div>
   );
 };

export default Index;
