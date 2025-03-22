
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-ucla-lightGrey p-4">
      <div className="glass-card p-8 max-w-md w-full text-center animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-ucla-blue/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-ucla-blue font-bold text-3xl">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-ucla-darkBlue">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="UCLA-button inline-flex items-center mx-auto">
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
