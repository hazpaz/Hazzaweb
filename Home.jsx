import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import WorkSection from "../components/WorkSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <WorkSection />
      <ContactSection />
    </>
  );
}