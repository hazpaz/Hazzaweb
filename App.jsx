import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import CategoryDetail from "./pages/CategoryDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LightboxProvider } from "./context/LightboxContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LightboxProvider>
          <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryId" element={<CategoryDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </LightboxProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;