import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  // Add fade-in animation on mount
  useEffect(() => {
    document.body.style.background = '#111827';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 px-4 py-12">
      <div className="max-w-4xl w-full mx-auto text-center animate-fadeIn">
        <div className="mb-8">
          <h1 className="text-6xl font-black text-teal-500 mb-2">404</h1>
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Page Not Found</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all duration-200 font-medium"
          >
            <FaHome className="text-lg" />
            Back to Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 hover:bg-gray-800 text-gray-200 rounded-lg transition-all duration-200 font-medium"
          >
            <FaArrowLeft className="text-lg" />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>If you think this is a mistake, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
