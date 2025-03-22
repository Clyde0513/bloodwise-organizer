
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-ucla-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">BP</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-ucla-darkBlue">BP Organizer</h1>
              <p className="text-xs text-ucla-blue">UCLA Health</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#home" 
              className="text-sm font-medium text-gray-700 hover:text-ucla-blue transition-colors"
            >
              Home
            </a>
            <a 
              href="#features" 
              className="text-sm font-medium text-gray-700 hover:text-ucla-blue transition-colors"
            >
              Features
            </a>
            <a 
              href="#upload" 
              className="text-sm font-medium text-gray-700 hover:text-ucla-blue transition-colors"
            >
              Upload
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium text-gray-700 hover:text-ucla-blue transition-colors"
            >
              About
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#home" 
                className="text-sm font-medium text-gray-700 hover:text-ucla-blue transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#features" 
                className="text-sm font-medium text-gray-700 hover:text-ucla-blue transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#upload" 
                className="text-sm font-medium text-gray-700 hover:text-ucla-blue transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Upload
              </a>
              <a 
                href="#about" 
                className="text-sm font-medium text-gray-700 hover:text-ucla-blue transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
