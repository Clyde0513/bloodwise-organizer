
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-ucla-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BP</span>
              </div>
              <div>
                <h2 className="font-bold text-lg text-ucla-darkBlue">BP Organizer</h2>
                <p className="text-xs text-ucla-blue">UCLA Health</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 max-w-md">
              Helping patients and healthcare providers organize and understand blood pressure data for better health monitoring.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-500 hover:text-ucla-blue transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-500 hover:text-ucla-blue transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-500 hover:text-ucla-blue transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-ucla-blue transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-500 hover:text-ucla-blue transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-ucla-blue transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-500 hover:text-ucla-blue transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-ucla-blue transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-500 hover:text-ucla-blue transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} BP Organizer. All rights reserved.
          </p>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-400" />
            <span>for UCLA Health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
