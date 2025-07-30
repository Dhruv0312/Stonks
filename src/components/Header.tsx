import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 floating-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-bold text-lg leading-none">Stonks</span>
              <span className="text-muted-foreground text-xs leading-none">Market Data</span>
            </div>
        </div>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium hover:scale-105 transform"
            >
            Home
          </Link>
            <Link 
              to="/all-stocks" 
              className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              All Stocks
            </Link>

            <Link 
              to="/how-it-works" 
              className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium hover:scale-105 transform"
            >
            How It Works
          </Link>

        </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
              className="w-10 h-10 rounded-2xl hover:bg-accent transition-all duration-300"
          >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-2xl hover:bg-accent transition-all duration-300"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="w-10 h-10 rounded-2xl hover:bg-accent transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium py-2 px-4 rounded-xl hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/all-stocks" 
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium py-2 px-4 rounded-xl hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Stocks
              </Link>

              <Link 
                to="/how-it-works" 
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium py-2 px-4 rounded-xl hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>

            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;