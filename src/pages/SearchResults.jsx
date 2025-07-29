import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUtensils, FaCalendarAlt, FaBus, FaArrowLeft } from 'react-icons/fa';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Set page title
  useEffect(() => {
    document.title = `Search Results for "${query}" | CityScouts`;
    return () => {
      document.title = 'CityScouts';
    };
  }, [query]);

  const mockResults = {
    attractions: [
      {
        id: '1',
        name: 'Sukhna Lake',
        location: 'Sector 1, Chandigarh',
        type: 'attraction',
        image:
          'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500&h=300',
      },
      {
        id: '2',
        name: 'Rock Garden',
        location: 'Sector 1, Chandigarh',
        type: 'attraction',
        image:
          'https://images.unsplash.com/photo-1624644128945-2fb99e8fd425?auto=format&fit=crop&q=80&w=500&h=300',
      },
      {
        id: '4',
        name: 'Capitol Complex',
        location: 'Sector 1, Chandigarh',
        type: 'attraction',
        image:
          'https://images.unsplash.com/photo-1588083949404-c4f1893dc3ce?auto=format&fit=crop&q=80&w=500&h=300',
      },
    ],
    restaurants: [
      {
        id: '1',
        name: 'Pal Dhaba',
        location: 'Sector 28, Chandigarh',
        type: 'restaurant',
        image:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=500&h=300',
      },
      {
        id: '2',
        name: "Gopal's 56",
        location: 'Sector 8, Chandigarh',
        type: 'restaurant',
        image:
          'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=500&h=300',
      },
    ],
    events: [
      {
        id: '1',
        name: 'Rose Festival',
        location: 'Rose Garden, Sector 16',
        type: 'event',
        image:
          'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&q=80&w=500&h=300',
      },
      {
        id: '2',
        name: 'Chandigarh Carnival',
        location: 'Leisure Valley, Sector 10',
        type: 'event',
        image:
          'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=500&h=300',
      },
    ],
    transport: [
      {
        id: '1',
        name: 'City Bus Service',
        location: 'Chandigarh',
        type: 'transport',
        image:
          'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=500&h=300',
      },
      {
        id: '2',
        name: 'Auto Rickshaw',
        location: 'Chandigarh',
        type: 'transport',
        image:
          'https://images.unsplash.com/photo-1606489129187-1452d560629c?auto=format&fit=crop&q=80&w=500&h=300',
      },
    ],
  };

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      const allResults = [];

      // Search through all categories
      Object.entries(mockResults).forEach(([category, items]) => {
        items.forEach((item) => {
          if (
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.location.toLowerCase().includes(query.toLowerCase())
          ) {
            allResults.push(item);
          }
        });
      });

      setResults(allResults);
      setLoading(false);
    }, 800);
  }, [query]);

  // Get filtered results based on active filter
  const getFilteredResults = () => {
    if (activeFilter === 'all') return results;
    return results.filter((item) => item.type === activeFilter);
  };

  // Get count of results by type
  const getCountByType = (type) => {
    if (type === 'all') return results.length;
    return results.filter((item) => item.type === type).length;
  };

  // Get icon based on result type
  const getIcon = (type) => {
    switch (type) {
      case 'attraction':
        return <FaMapMarkerAlt className="text-teal-500" />;
      case 'restaurant':
        return <FaUtensils className="text-orange-500" />;
      case 'event':
        return <FaCalendarAlt className="text-purple-500" />;
      case 'transport':
        return <FaBus className="text-blue-500" />;
      default:
        return null;
    }
  };

  // Get URL based on result type
  const getUrl = (item) => {
    switch (item.type) {
      case 'attraction':
        return `/attractions/${item.id}`;
      case 'restaurant':
        return `/dining/${item.id}`;
      case 'event':
        return `/events/${item.id}`;
      case 'transport':
        return `/transport/${item.id}`;
      default:
        return '#';
    }
  };

  // Get type display text
  const getTypeDisplay = (type) => {
    switch (type) {
      case 'attraction':
        return 'Attraction';
      case 'restaurant':
        return 'Restaurant';
      case 'event':
        return 'Event';
      case 'transport':
        return 'Transport';
      default:
        return type;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen my-20 text-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-teal-500 hover:text-teal-400 mb-4">
          <FaArrowLeft className="mr-2" /> Back to home
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Search results for "{query}"</h1>
          {!loading && <p className="text-gray-400 mt-1">Found {results.length} results</p>}
        </div>

        {/* Filter tabs */}
        <div className="border-b border-gray-700 mb-6">
          <div className="flex overflow-x-auto custom-scrollbar pb-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`mr-4 px-3 py-2 font-medium text-sm rounded-t-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'text-teal-500 border-b-2 border-teal-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All ({getCountByType('all')})
            </button>
            {['attraction', 'restaurant', 'event', 'transport'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`mr-4 px-3 py-2 font-medium text-sm rounded-t-lg transition-colors flex items-center whitespace-nowrap ${
                  activeFilter === type
                    ? 'text-teal-500 border-b-2 border-teal-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {getIcon(type)}
                <span className="ml-2">
                  {getTypeDisplay(type)}s ({getCountByType(type)})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : getFilteredResults().length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2">No results found</h3>
            <p className="text-gray-400">
              We couldn't find any matches for "{query}" in this category. Try adjusting your search
              query or checking different categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredResults().map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                to={getUrl(item)}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow hover:opacity-90"
              >
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    {getIcon(item.type)}
                    <span className="text-sm text-gray-400 ml-2">{getTypeDisplay(item.type)}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.location}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
