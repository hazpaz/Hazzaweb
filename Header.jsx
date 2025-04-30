import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { FaBehance, FaInstagram, FaLinkedinIn, FaFlickr } from "react-icons/fa";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll event to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there and then scroll
    if (location.pathname !== '/') {
      // We'll have to navigate to the home page first
      // and add a URL hash so the useEffect in Home.jsx can handle the scrolling
      window.location.href = `/#${targetId}`;
      return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white z-50 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-navy font-medium text-lg">Marina Weishaupt</Link>
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="#work" 
                  className="text-navy hover:text-navy/70 transition-colors duration-300"
                  onClick={(e) => handleAnchorClick(e, 'work')}
                >
                  Work
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-navy hover:text-navy/70 transition-colors duration-300"
                  onClick={(e) => handleAnchorClick(e, 'contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-navy/70 transition-colors duration-300 hidden sm:block">
            <FaBehance className="text-lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-navy/70 transition-colors duration-300 hidden sm:block">
            <FaInstagram className="text-lg" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-navy/70 transition-colors duration-300 hidden sm:block">
            <FaLinkedinIn className="text-lg" />
          </a>
          <a href="https://flickr.com" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-navy/70 transition-colors duration-300 hidden sm:block">
            <FaFlickr className="text-lg" />
          </a>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-navy" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <ul className="py-4 px-6 space-y-4">
            <li>
              <a 
                href="#work" 
                className="block text-navy hover:text-navy/70 transition-colors duration-300"
                onClick={(e) => handleAnchorClick(e, 'work')}
              >
                Work
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="block text-navy hover:text-navy/70 transition-colors duration-300"
                onClick={(e) => handleAnchorClick(e, 'contact')}
              >
                Contact
              </a>
            </li>
            <li className="pt-4 flex space-x-4">
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-navy/70 transition-colors duration-300">
                <FaBehance className="text-lg" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-navy/70 transition-colors duration-300">
                <FaInstagram className="text-lg" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-navy/70 transition-colors duration-300">
                <FaLinkedinIn className="text-lg" />
              </a>
              <a href="https://flickr.com" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-navy/70 transition-colors duration-300">
                <FaFlickr className="text-lg" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}