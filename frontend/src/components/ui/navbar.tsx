import { useState } from 'react';
import { ThemeToggle } from './themeToggle';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur-sm fixed top-0 z-50">
      <div className="w-full mx-auto px-8 max-w-[1400px] flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brain text-white font-bold">B</div>
          <span className="text-xl font-semibold">SecondBrain</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          <ThemeToggle />
          <Button variant="default" size="sm">Sign Up Free</Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-4 bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-foreground hover:text-primary px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-foreground hover:text-primary px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              How it Works
            </a>
            <a 
              href="#testimonials" 
              className="text-foreground hover:text-primary px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <Button className="mt-2">Sign Up Free</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
