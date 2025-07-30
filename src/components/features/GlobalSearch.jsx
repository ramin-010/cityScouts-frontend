import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import useDebounce from '../../hooks/useDebounce';
import axios from 'axios';

const mockResults = [
  { id: 1, title: 'Rock Garden', category: 'Attraction', location: 'Chandigarh' },
  { id: 2, title: 'Sukhna Lake', category: 'Attraction', location: 'Chandigarh' },
  { id: 3, title: 'Pal Dhaba', category: 'Dining', location: 'Sector 28' },
  { id: 4, title: 'Rose Festival', category: 'Event', location: 'Sector 16' },
];

// search component for the header
const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState('');
  const [result, setResult] = useState([]);
  const wrapperRef = useRef(null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const { pathname } = useLocation();
  const [dontShowResult, setDontShowResult] = useState(false);

  useEffect(() => {
    setDontShowResult(pathname.endsWith('/search'));
  }, [pathname]);
  const debouncedQuery = useDebounce(query, 1000);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsResultOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async (query) => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_FETCH_URL}/api/v1/search-suggest?q=${query}`
        );

        const data = res.data.data;
        setResult(data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchData(debouncedQuery);
    }
  }, [debouncedQuery]);

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setResult([]);
      setQuery('');
    }
  };

  return (
    <div className="relative " ref={wrapperRef}>
      <div className="flex items-center">
        {/* mobile toggle button */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="md:hidden p-2 rounded-full bg-gray-800 hover:bg-gray-700"
        >
          <FaSearch className="text-gray-300" />
        </button>

        {/* Search input */}
        <div className={`${isSearchOpen ? 'block' : 'hidden md:block'} animate-fadeIn `}>
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                value={query}
                onChange={handleSearchChange}
                onFocus={() => setIsResultOpen(true)}
                className="w-full md:w-64 py-2 pl-10 pr-4 rounded-full bg-gray-800 z-20 text-white border border-gray-700 focus:outline-none focus:border-teal-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>
          {!dontShowResult && isResultOpen && result.length > 0 && (
            <div className="absolute w-full md:w-64 bg-gray-800 mt-1 rounded-lg shadow-lg z-50 animate-fadeInSlow overflow-hidden">
              <ul className="">
                {result.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-1 pl-2 hover:bg-gray-700/60 cursor-pointer transition-all"
                    onClick={() => navigate(`${item.model}/${item.slug}`)}
                  >
                    <p className="text-white font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.category} — {item.location.address}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
