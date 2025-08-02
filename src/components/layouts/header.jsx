import React, { useEffect, useState, useRef } from 'react';
import {
  FaUser,
  FaMapMarkerAlt,
  FaUtensils,
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { useAuth } from '../../recoil/useAuth';
import { Link, useLocation } from 'react-router-dom';
import GlobalSearch from '../features/GlobalSearch';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isAuthenticated, user, logout,loading } = useAuth();
  const location = useLocation();
  const profileRef = useRef(null);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileRef]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setShowProfileMenu(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
      window.location.href = '/';
    } catch (err) {}
  };

  const isActive = (path) =>
    location.pathname === path
      ? 'text-myteal-400 font-semibold'
      : 'text-gray-300 hover:text-myteal-300';

  return (
    <header
      className={`fixed w-[100vw] md:h-20 z-50 transition-all duration-300 animate-fadeInMore ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}
    >
      <div className=" mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 animate-fadeInMore md:mr-10 ml-2">
            <FaMapMarkerAlt className="text-myteal-500 text-2xl" />
            <span className="md:text-3xl text-2xl font-bold text-white font-chillax">
              City<span className="text-myteal-500">Scouts</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 animate-fadeInMore">
            <Link
              to="/attractions"
              className={`${isActive('/attractions')} font-medium transition-colors`}
            >
              Attractions
            </Link>
            <Link to="/dining" className={`${isActive('/dining')} font-medium transition-colors`}>
              Dining
            </Link>
            <Link to="/events" className={`${isActive('/events')} font-medium transition-colors`}>
              Events
            </Link>
          </nav>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4 animate-fadeInMore">
            {(user?.role === 'admin' ||
              user?.role === 'recruiter' ||
              user?.role === 'contributor') && (
              <div className="px-3 py-2 bg-myteal-600 hover:bg-myteal-900 rounded-full md:mr-4">
                <Link to="/admin">
                  <p className="font-chillax font-bold">Dashboard</p>
                </Link>
              </div>
            )}
            <GlobalSearch />

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full px-3 py-2 transition-colors"
                >
                  <img
                    src={user?.profilePic || '#'}
                    alt={user?.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover border-2 border-myteal-500"
                  />
                  <span className="hidden lg:inline">{user?.name?.split(' ')[0] || 'User'}</span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 animate-fadeIn border border-gray-700">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="inline-block bg-transparent hover:bg-gray-800 text-teal-400 hover:text-teal-300 border border-teal-500 hover:border-teal-400 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="inline-block bg-myteal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <GlobalSearch />

            <div className="flex flex-col space-y-2">
              <Link
                to="/attractions"
                className="text-gray-300 hover:text-myteal-400 py-2 flex items-center space-x-2"
              >
                <FaMapMarkerAlt />
                <span>Attractions</span>
              </Link>
              <Link
                to="/dining"
                className="text-gray-300 hover:text-myteal-400 py-2 flex items-center space-x-2"
              >
                <FaUtensils />
                <span>Dining</span>
              </Link>
              <Link
                to="/events"
                className="text-gray-300 hover:text-myteal-400 py-2 flex items-center space-x-2"
              >
                <FaCalendarAlt />
                <span>Events</span>
              </Link>
              {(user?.role === 'admin' ||
                user?.role === 'recruiter' ||
                user?.role === 'contributor') && (
                <Link
                  to="/admin"
                  className="text-gray-300 hover:text-myteal-400 py-2 flex items-center space-x-2"
                >
                  <FaUser />
                  <span>Admin</span>
                </Link>
              )}
            </div>

            <div className="pt-4 border-t border-gray-700">
              {loading ? null : isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3 py-2">
                    <img
                      src={user?.profilePic || '#'}
                      alt={user?.name || 'User'}
                      className="w-10 h-10 rounded-full object-cover border-2 border-myteal-500"
                    />
                    <div>
                      <p className="text-white font-medium">{user?.name || 'User'}</p>
                      <p className="text-gray-400 text-sm">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-center"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-center"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-center"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-myteal-600 hover:bg-myteal-700 text-white py-2 px-4 rounded-md text-center shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
