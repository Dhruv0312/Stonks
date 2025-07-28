import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Activity } from "lucide-react";

const Header = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  return (
    <header className="border-b border-border/30 bg-gradient-card backdrop-blur-sm sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="h-8 w-8 text-gradient-primary animate-pulse-glow" />
            <div className="absolute inset-0 h-8 w-8 text-primary/20 blur-sm">
              <Activity className="h-8 w-8" />
            </div>
          </div>
          <span className="text-xl font-bold text-gradient-primary">
            StockSight
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-foreground hover:text-gradient-primary transition-all duration-300 font-medium px-3 py-2 rounded-xl hover:bg-primary/10 hover:shadow-soft">
            Home
          </a>
          <a href="/dashboard" className="text-muted-foreground hover:text-secondary-purple transition-all duration-300 px-3 py-2 rounded-xl hover:bg-secondary-purple/10 hover:shadow-purple">
            Dashboard
          </a>
          <a href="/how-it-works" className="text-muted-foreground hover:text-accent transition-all duration-300 px-3 py-2 rounded-xl hover:bg-accent/10 hover:shadow-success">
            How It Works
          </a>
          <a href="/about" className="text-muted-foreground hover:text-accent-orange transition-all duration-300 px-3 py-2 rounded-xl hover:bg-accent-orange/10 hover:shadow-accent">
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary-purple/10 hover:shadow-glow transition-all duration-300"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="outline" className="hidden sm:flex rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:shadow-soft transition-all duration-300">
            Sign In
          </Button>
          <Button className="bg-gradient-primary hover:bg-gradient-rainbow rounded-xl px-6 shadow-glow hover:shadow-purple transition-all duration-300 hover:scale-105">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;