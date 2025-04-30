import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Camera, Calendar, MapPin, Aperture } from "lucide-react";
import { FaBehance, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Button } from "../components/ui/button";
import { portfolioCategories } from "../lib/portfolioData";
import { useLightbox } from "../hooks/useLightbox";

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { openLightbox } = useLightbox();
  
  // Find the category data based on the categoryId
  const categoryData = portfolioCategories.find(cat => cat.id === categoryId);
  
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If the category doesn't exist, redirect to home
  if (!categoryData) {
    useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Header with navigation */}
      <div className="bg-white border-b border-gray-100 py-4 mb-8 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-navy">Marina Weishaupt</Link>
          
          <div className="flex space-x-6 items-center">
            <Link to="/" className="text-navy hover:text-navy/80 hidden md:block">Work</Link>
            
            <div className="flex space-x-2">
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" 
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                <FaBehance className="text-navy text-sm" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                <FaInstagram className="text-navy text-sm" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                <FaLinkedin className="text-navy text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back button */}
      <div className="container mx-auto px-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={handleGoBack}
          className="text-navy hover:text-navy/70 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          Back to Work
        </Button>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-md">
          <img 
            src={categoryData.images[0].src} 
            alt={categoryData.title}
            className="w-full h-auto object-cover"
            onClick={() => openLightbox(categoryData.images[0].src, categoryData.images[0].title)}
          />
        </div>
        
        {/* Description */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4 text-navy">{categoryData.title}</h1>
          <p className="text-lg mb-6 leading-relaxed">{categoryData.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-navy/70" />
              <div>
                <p className="font-medium mb-1">Location</p>
                <p className="text-gray-600">{categoryData.location}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Aperture className="h-4 w-4 mr-2 mt-0.5 text-navy/70" />
              <div>
                <p className="font-medium mb-1">Equipment</p>
                <p className="text-gray-600">{categoryData.equipment}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-4 w-4 mr-2 mt-0.5 text-navy/70" />
              <div>
                <p className="font-medium mb-1">Year</p>
                <p className="text-gray-600">{categoryData.year}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gallery */}
        <div className="space-y-6">
          {categoryData.images.slice(1).map((image, index) => (
            <div 
              key={`${categoryData.id}-${index + 1}`}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => openLightbox(image.src, image.title)}
            >
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-medium text-navy">{image.title}</h3>
                <p className="text-sm text-gray-500">{image.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}