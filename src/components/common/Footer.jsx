import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiMail } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaYoutube, FaPepperHot, FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-cream pt-16 font-body text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Logo & About */}
          <div className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center justify-center mb-4">
              <img src="/logo.jpg" alt="Tikhi Rasoi Logo" className="w-24 h-24 object-cover rounded-full drop-shadow-lg" />
            </div>
            <p className="text-xs text-gray-700 leading-relaxed mb-4">
              Tikhi Rasoi Pure Veg Café & Restro is a perfect blend of delicious food, warm ambience and great service.
            </p>
            <p className="text-xs font-bold text-primary tracking-wider uppercase">Powered By Thunders Cafe</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/offer" className="hover:text-primary transition-colors">Offers</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Menu */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">Our Menu</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><Link to="/menu" className="hover:text-primary transition-colors">Pizza</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Chinese</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Main Course</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Tandoor</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Salads</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Shakes & Beverages</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <FiPhone className="text-primary mt-1 text-lg flex-shrink-0" />
                <div>
                  <p>9359823934</p>
                  <p>9319681932</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1 text-lg flex-shrink-0" />
                <p>Sumit Bazar ke Baju Me,<br/>Gondia Road, Balaghat (M.P.)</p>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="text-primary mt-1 text-lg flex-shrink-0" />
                <p>tikhi.mirchi.restro@gmail.com</p>
              </li>
            </ul>
          </div>

          {/* Follow Us & Veg Badge */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">Follow Us</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/tikhi_rasoi_/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#111] border border-white/5 text-gray-400 hover:text-white hover:bg-gold hover:scale-110 flex items-center justify-center transition-all shadow-lg hover:shadow-gold/20">
                <FaInstagram />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                <FaYoutube />
              </a>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-2 border-veg text-veg rounded-full flex items-center justify-center mb-1">
                <FaLeaf className="text-3xl" />
              </div>
              <p className="text-xs font-bold text-veg">100% PURE VEG</p>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-primary text-white py-4 text-center">
        <p className="text-xs font-light tracking-wide flex items-center justify-center gap-2">
          © {new Date().getFullYear()} Tikhi Rasoi Pure Veg Café & Restro. All Rights Reserved.
          <FaPepperHot className="text-gold-soft opacity-70" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
