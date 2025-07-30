import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkedAlt,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-8 sm:pt-12 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <FaMapMarkerAlt className="text-teal-500 text-xl sm:text-2xl" />
              <span className="text-xl sm:text-2xl font-bold text-white">
                City<span className="text-teal-500">Scouts</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
              Discover the best of Chandigarh with CityScouts. Your ultimate guide to local
              attractions, dining, events, and transportation options.
            </p>
            <div className="flex space-x-4 flex-wrap gap-2">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <Link
                  to="/attractions"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Explore Attractions
                </Link>
              </li>
              <li>
                <Link to="/dining" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Find Restaurants
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-teal-400 transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 border-b border-gray-700 pb-2">
              Top Destinations
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <Link
                  to="/attractions/1"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Sukhna Lake
                </Link>
              </li>
              <li>
                <Link
                  to="/attractions/2"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Rock Garden
                </Link>
              </li>
              <li>
                <Link
                  to="/attractions/4"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Capitol Complex
                </Link>
              </li>
              <li>
                <Link
                  to="/dining/1"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Pal Dhaba
                </Link>
              </li>
              <li>
                <Link
                  to="/events/1"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  Rose Festival
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 border-b border-gray-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li className="flex items-start space-x-3">
                <FaMapMarkedAlt className="text-teal-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">SCO 123-124, Sector 17-C, Chandigarh, 160017</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-teal-500 flex-shrink-0" />
                <span className="text-gray-400">+91 172 1234567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-teal-500 flex-shrink-0" />
                <span className="text-gray-400">info@cityscouts.com</span>
              </li>
            </ul>

            <form className="mt-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-800 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 border-0 flex-grow w-0 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-r-md transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-0 text-center sm:text-left">
            &copy; {currentYear} CityScouts. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            <Link to="/privacy" className="text-gray-400 hover:text-teal-400 text-xs sm:text-sm whitespace-nowrap">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-teal-400 text-xs sm:text-sm whitespace-nowrap">
              Terms of Service
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-teal-400 text-xs sm:text-sm whitespace-nowrap">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
