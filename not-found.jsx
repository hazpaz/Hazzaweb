import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Button asChild className="bg-navy hover:bg-navy/90">
        <Link to="/">
          Return to Home
        </Link>
      </Button>
    </div>
  );
}