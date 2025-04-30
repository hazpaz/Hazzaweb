import { useNavigate } from "react-router-dom";
import PortfolioItem from "./PortfolioItem";
import { portfolioItems, portfolioCategories } from "../lib/portfolioData"; 
import { useLightbox } from "../hooks/useLightbox";

export default function WorkSection() {
  const navigate = useNavigate();
  const { openLightbox } = useLightbox();

  const handlePortfolioClick = (
    e, 
    categoryId,
    imageUrl,
    title
  ) => {
    // If they clicked directly on the item wrapper, go to category page
    if (e.target.classList.contains('portfolio-link-area')) {
      navigate(`/category/${categoryId}`);
    } else {
      // Otherwise it was the image or overlay that was clicked, open lightbox
      openLightbox(imageUrl, title);
    }
  };

  return (
    <section id="work" className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">My Work</h2>
      
      {/* Portfolio categories section */}
      <div className="mb-16 text-center">
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Click on any portfolio item to view more details about that collection.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {portfolioItems.map((item) => (
          <PortfolioItem
            key={item.id}
            item={item}
            onClick={(e) => handlePortfolioClick(e, item.category, item.imageUrl, item.title)}
          />
        ))}
      </div>
    </section>
  );
}