import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaFilter, FaMoneyBillWave, FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useFetchWithQuery from '../../hooks/useFetchWithQuery';
import useDebounce from '../../hooks/useDebounce';
import FavoriteButton from '../../components/features/favorites';

const DiningItem = memo(({ dining }) => {
  const [imageError, setImageError] = useState('');
  return (
    <motion.div
      key={dining.id || dining._id}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <Link
        to={`/dining/${dining.slug}`}
        className="block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 relative "
      >
         <div className='absolute '>
             {<div className=' p-2 '> <FavoriteButton itemType={'dinings'} itemId={dining._id}/></div>}
          </div>
        <div className="md:flex">
          <div className="md:w-[25rem]  w-full ">
            {!imageError ? (
              <div className='w-full h-full flex items-center justify-center'>
                <img
                src={dining.mainImage}
                onError={() => setImageError(true)}
                alt={dining.name}
                className="w-[98%] h-[98%] object-cover rounded-lg"
              />
              
              </div>
          ) : (
            <div className="w-full h-full  object-cover rounded-xl mt-0.5  text-white bg-gray-900 flex text-center justify-center items-center font-khand">
              Oops...! <br /> Image Not Available yet
            </div>
            )}
           
          </div>
          <div className="md:p-6 p-4 md:w-2/3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="bg-gray-700 text-myteal-400 text-xs uppercase px-2 py-1 rounded mr-2">
                  {dining.cuisine}
                </span>
                <span className="text-gray-400 text-sm">{dining.priceRange}</span>
              </div>
              <div className="flex items-center bg-gray-700 px-2 py-1 rounded">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-white font-medium md:text-base text-sm">{dining.rating}</span>
                <span className="text-gray-400 text-xs ml-1">({dining.reviews})</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{dining.name}</h3>
            <p className="text-gray-400 mb-2 md:text-base text-sm">{dining.location.address}</p>
            <p className="text-gray-300 mb-4 md:text-base text-sm">{dining.description}</p>

            <div className="flex flex-wrap gap-2">
              {Object.entries(dining.features).map(
                ([key, value], idx) =>
                  value && ( // Only show if the feature is available/true
                    <span
                      key={`${dining._id}-${key}`}
                      className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                    >
                      {key}
                    </span>
                  )
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

const Dining = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    category: 'All',
    prices: 'All Prices',
    rating: 'All Ratings',
    features: [],
  });
  const [featured, setFeatured] = useState([]);
  const debouncedQuery = useDebounce(searchQuery, 1000)

  const { data, loading, error, hasMore, fetchMore, resetData, currentPage } = useFetchWithQuery(
    `${import.meta.env.VITE_FETCH_URL}/api/dining`,
    {
      page: 1,
      limit: 9,
      category: activeFilters.category,
      prices: activeFilters.prices,
      rating: activeFilters.rating,
      features: activeFilters.features,
      search: searchQuery,
    }
  );

  //handle pagination scroll
  const isFetchingRef = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
          document.documentElement.scrollHeight &&
        hasMore &&
        !loading &&
        !isFetchingRef.current
      ) {
        isFetchingRef.current = true;
        fetchMore().finally(() => {
          isFetchingRef.current = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  //handle filter change
  const handleFilterChange = (filterType, value) => {
    const defaultValues = {
      category: 'All',
      prices: 'All Prices',
      rating: 'All Ratings',
    };
    setActiveFilters((prev) => {
      const updatedFilter = {
        ...prev,
        [filterType]: prev[filterType] == value ? defaultValues[filterType] : value,
      }
      resetData(updatedFilter);
      return updatedFilter;
    });
   
  };

  //handle feature change
  const handleFeatureChange = (value) => {
    setActiveFilters((prev) => {
      const updatedFeature = {
          ...prev,
          ['features']: prev['features'].includes(value)
          ? prev['features'].filter((e) => e !== value)
          : [...prev['features'], value],
      }
      resetData(updatedFeature);
      return updatedFeature;
    });
  };
 
    const searchQueryHandler = (e) => {
        setSearchQuery(e.target.value);
    };
    useEffect(() => {
      resetData({
        search: debouncedQuery,
      });
    }, [debouncedQuery]);
    
  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 animate-fadeInMore">
      <div className="md:max-w-[85vw] max-w-[97vw] mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Restaurants in Chandigarh</h1>
          <p className="text-gray-400 mt-2">Discover the best dining spots in the city</p>
        </div>

        <div className="flex flex-col md:flex-row z-50">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 z-50">
            <div className="sticky top-24 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Filters</h2>

              {[
                {
                  title: 'category',
                  key: 'category',
                  values: ['All', 'Street Food', 'Casual Dining', 'Fine Dining', 'Cafe/Bakery', 'Other'],
                },
                {
                  title: 'Price Range',
                  key: 'prices',
                  values: ['All Prices', 'Budget', 'Moderate', 'Expensive'],
                },
                {
                  title: 'Rating',
                  key: 'rating',
                  values: ['All Ratings', '4.5+', '4.0+', '3.5+'],
                },
                {
                  title: 'Features',
                  key: 'features',
                  values: ['Outdoor Seating', 'Free Wifi', 'Vegetarion Options', 'Family-friendly'],
                },
              ].map(({ title, key, values }) => (
                <div key={key}>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">{title}</h3>
                  <div
                    className={
                      key === 'features'
                        ? 'flex flex-wrap gap-1.5 mb-0'
                        : 'flex flex-wrap gap-1.5 mb-5'
                    }
                  >
                    {values.map((e) =>
                      key === 'features' ? (
                        <button
                          key={e}
                          className={`flex items-center w-full px-3 py-2 rounded-md text-sm text-left m-0.5
                                ${
                                  activeFilters.features.includes(e)
                                    ? 'bg-myteal-600/20 text-myteal-400 border border-myteal-800'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-transparent'
                                }`}
                          onClick={() => handleFeatureChange(e)}
                        >
                          <span
                            className={`inline-block mr-2 rounded px-[7px] h-4 shrink 
                            ${
                              activeFilters.features.includes(e) ? 'bg-myteal-500' : 'bg-gray-600'
                            }`}
                          ></span>
                          {e}
                        </button>
                      ) : (
                        <button
                          key={e}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activeFilters[key] === e
                              ? 'bg-myteal-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                          onClick={() => handleFilterChange(key, e)}
                        >
                          {e}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}

          <div className="w-full md:w-3/4  z-0">
            {/* Sticky Search and Sort - Wrapper */}
            <div className=" z-30 bg-gray-900  pb-2 min-h-full">
              {/* Search Bar */}

              <div className=" sticky top-20 z-50 bg-gray-900 pt-3 pb-[0.25px] shadow-xl rounded-md pl-8 mb-2">
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Search restaurants, cuisine, or location..."
                    className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-myteal-500"
                    value={searchQuery}
                    onChange={searchQueryHandler}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="flex justify-between items-center mb-5">
                  <div className="text-gray-300">
                    {data.length} {data.length === 1 ? 'result' : 'results'} found
                  </div>
                  <div className="relative">
                    <select className="bg-gray-800 text-white pl-4 pr-8 py-1 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-myteal-500 appearance-none">
                      <option value="popularity">Sort by: Popularity</option>
                      <option value="rating">Sort by: Rating</option>
                      <option value="price-low">Sort by: Price (Low to High)</option>
                      <option value="price-high">Sort by: Price (High to Low)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/* Restaurants List */}
              <motion.div
                key={data.slug}
                className="space-y-6 pl-10 w-[60vw]"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {data.map((dining, idx) => (
                  <DiningItem dining={dining} key={`${dining._id}-${dining.createdAt || ''}`} />
                ))}
              </motion.div>
              {loading && (
                <div className="flex justify-center items-center h-full w-full py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-myteal-500"></div>
                </div>
              )}
              {!loading && data.length == 0 && (
                <div className="text-center py-16 ml-6 bg-gray-800 rounded-xl border  border-gray-700">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-white">No restaurants found</h3>
                  <p className="mt-2 text-gray-400">
                    Try adjusting your filters or search for something else.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilters((prev) => ({
                        ...prev,
                        category: 'All',
                        prices: 'All Prices',
                        rating: 'All Ratings',
                        features: [],
                      }));
                    }}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-myteal-600 hover:bg-myteal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myteal-500"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dining;
