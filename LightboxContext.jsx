import { createContext, useState } from "react";
import Lightbox from "../components/Lightbox";

export const LightboxContext = createContext(null);

export const LightboxProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageTitle, setImageTitle] = useState(null);

  const openLightbox = (url, title) => {
    setImageUrl(url);
    setImageTitle(title || null);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <LightboxContext.Provider
      value={{
        isOpen,
        imageUrl,
        imageTitle,
        openLightbox,
        closeLightbox,
      }}
    >
      {children}
      <Lightbox />
    </LightboxContext.Provider>
  );
};