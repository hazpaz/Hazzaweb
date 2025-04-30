import { FaBehance, FaInstagram, FaLinkedinIn, FaFlickr } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-navy mb-4 md:mb-0">&copy; {currentYear} Marina Weishaupt. All rights reserved.</p>
          <div className="flex space-x-4">
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
          </div>
        </div>
      </div>
    </footer>
  );
}