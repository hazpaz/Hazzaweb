import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLightbox } from "../hooks/useLightbox";

export default function Lightbox() {
  const { isOpen, imageUrl, imageTitle, closeLightbox } = useLightbox();

  // Close the lightbox when the Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling when lightbox is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore scrolling when lightbox is closed
      document.body.style.overflow = "";
    };
  }, [isOpen, closeLightbox]);

  // Close the lightbox when clicking outside the image
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/90 flex justify-center items-center p-4"
          onClick={handleBackdropClick}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-colors duration-200 z-[101]"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl w-full max-h-[90vh]"
          >
            {imageTitle && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-3 px-6">
                <h3 className="text-lg font-medium">{imageTitle}</h3>
              </div>
            )}
            <img
              src={imageUrl}
              alt={imageTitle || "Image"}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}