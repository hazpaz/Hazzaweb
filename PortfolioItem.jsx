export default function PortfolioItem({ item, onClick }) {
  return (
    <div className="portfolio-item group" data-category={item.category}>
      <div 
        className="portfolio-link-area block overflow-hidden relative cursor-pointer rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
        onClick={onClick}
      >
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-80 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-navy/5 group-hover:bg-navy/10 transition-colors duration-300"></div>
        <div className="absolute bottom-0 right-0 bg-navy/80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-xl font-medium">{item.title}</h3>
          <p className="text-sm">{item.year}</p>
          <p className="text-xs mt-1">Click for more</p>
        </div>
      </div>
    </div>
  );
}