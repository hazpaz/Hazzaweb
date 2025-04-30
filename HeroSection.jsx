import { ChevronDown } from "lucide-react";
import { FaBehance, FaInstagram, FaFlickr } from "react-icons/fa";

export default function HeroSection() {
  // Handle smooth scrolling for the "scroll down" button
  const handleScrollDown = (e) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      const headerOffset = 70;
      const elementPosition = workSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen w-full flex flex-col md:flex-row pt-16">
      <div 
        className="w-full md:w-1/2 h-[50vh] md:h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')" }}
      ></div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hi! I'm Marina Weishaupt</h1>
          <p className="text-lg mb-8">I'm a photographer based in Ulm / southern Germany.</p>
          
          <div className="flex space-x-4 mb-10">
            <a 
              href="https://behance.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-secondary p-3 rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              <FaBehance className="text-navy" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-secondary p-3 rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              <FaInstagram className="text-navy" />
            </a>
            <a 
              href="https://flickr.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-secondary p-3 rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              <FaFlickr className="text-navy" />
            </a>
          </div>
          
          <a 
            href="#work" 
            className="block animate-bounce text-center text-navy"
            onClick={handleScrollDown}
          >
            <ChevronDown className="mx-auto h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}