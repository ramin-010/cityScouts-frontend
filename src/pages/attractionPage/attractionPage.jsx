import hero from '@/assets/Hero_image_Hompage.jpg';
import hero2 from '@/assets/new/japeneseGarden.webp'

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalCardComponent from '@/components/features/GlobalCardComp';
import useFetchWithQuery from '../../hooks/useFetchWithQuery';
import useDebounce from '../../hooks/useDebounce';

const AttractionItem = memo(({ item }) => (
  <GlobalCardComponent page="attractions" slug={item.slug} img={item.mainImage} itemId={item._id}>
    <GlobalCardDetails
      name={item.name}
      category={item.category}
      description={item.description}
      rating={item.rating}
      totalReviews={item.reviews} //need to be changed or new schema should be added
      price={'2'} // this also
      features={item.features}
    />
  </GlobalCardComponent>
));

const Attraction = () => {
  // const [attractions, setAttractions] = useState([]);
  // const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    location: '',
    rating: '',
    price: '',
  });
  const [featured, setFeatured] = useState([]);

  const debouncedQuery = useDebounce(searchQuery, 1000);

  //!dynamic req start
  const {
    data,
    loading,
    hasMore,
    fetchMore: originalFetchMore,
    resetData,
    currentPage,
    error,
  } = useFetchWithQuery(`${import.meta.env.VITE_FETCH_URL}/api/attractions`, {
    page: 1,
    limit: 9,
    category: activeFilters.category,
    location: activeFilters.location,
    rating: activeFilters.rating,
    price: activeFilters.price,
    search: searchQuery,
  });

  // Memoize the fetchMore function to prevent unnecessary re-renders
  const fetchMore = useCallback(() => {
    if (!loading) {
      return originalFetchMore();
    }
  }, [loading, originalFetchMore]);

  const isFetchingRef = useRef(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;

      // Only trigger when scrolling down
      if (scrollDirection !== 'down') return;

      // Calculate distance from bottom
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + windowHeight;
      const scrollThreshold = window.innerWidth < 768 ? 500 : 200; // Larger threshold for mobile
      const distanceFromBottom = documentHeight - scrollPosition;

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Only proceed if we're close to the bottom and not already loading
      if (
        distanceFromBottom < scrollThreshold &&
        hasMore &&
        !loading &&
        !isFetchingRef.current
      ) {
        // Use a small debounce to prevent multiple rapid triggers
        scrollTimeout.current = setTimeout(() => {
          isFetchingRef.current = true;
          fetchMore().finally(() => {
            isFetchingRef.current = false;
          });
        }, 50);
      }
    };

    // Add passive: true for better scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [hasMore, loading, fetchMore]);

  // handling filter change
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const updatedFilter = {
        ...prev,
        [filterType]: prev[filterType] === value ? '' : value,
      };
      resetData(updatedFilter);
      return updatedFilter;
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

  //for only rendering the featured attraction on mount
  useEffect(() => {
    if (data.length > 0 && featured.length === 0) {
      setFeatured(data.filter((e) => e.isFeatured));
    }
  }, [data]);

  //clear filter
  const clearFilters = () => {
    setActiveFilters(() => {
      const updated = {
        category: '',
        location: '',
        rating: '',
        price: '',
      };
      resetData(updated);
      return updated;
    });
  };

  return (
    <>
      <div className=" flex justify-center md:max-w-[97vw] max-w-[97vw] flex-col px-4 md:px-10 lg:px-20 my-28 md:my-44 mx-auto animate-fadeInMore">
        {/* Header Section */}
        <h1 className="absolute tracking-tight md:py-2 py-1 md:top-[-3.4rem] top-[-3rem]  md:text-[1.8rem] text-2xl font-semibold font-chillax text-gray-100 bg-gradient-to-r from-gray-900/90 via-teal-700/5 to-transparent rounded-lg px-3 z-10 ">
          Attractions In Chandigarh
        </h1>
        <section className="w-full flex flex-col lg:flex-row gap-8 mb-12">
          <div className="relative top-2 w-full lg:w-[45%] h-[40vh] md:h-[60vh] rounded-xl overflow-hidden">
            <img src={hero2} className="h-full w-full object-cover object-top" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

            {/* Featured List - scrollable on mobile */}
            <div className="absolute inset-0 md:mt-4 mt-2 md:px-4 px-3 overflow-y-auto max-h-full flex flex-col gap-3 z-20 featured-scrollbar">
              <h3 className="text-gray-800 font-bold text-xl tracking-wider font-chillax mb-1 px-1">
                {' '}
              </h3>
              <div className="space-y-3">
                {featured.map((item) => (
                  <FetureAttraction
                    key={item._id}
                    _id={item._id}
                    slug={item.slug}
                    mainImage={item.mainImage}
                    name={item.name}
                    category={item.category}
                    rating={item.rating}
                    totalReviews={item.reviews?.length || 0}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="w-full lg:w-[55%] md:h-[65vh] space-y-5">
            <h1 className="text-gray-200 text-2xl font-excon">
              Discover the best places to visit in the city
            </h1>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search attractions, locations..."
                className="w-full p-3 pl-10 pr-4 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-myteal-500"
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

            {/* Filter Groups */}
            {[
              {
                title: 'Categories',
                key: 'category',
                values: [
                  'Parks',
                  'Landmarks',
                  'Museums',
                  'Entertainment',
                  'Religious Sites',
                  'Shopping',
                  'Tours',
                ],
              },
              {
                title: 'Location',
                key: 'location',
                values: ['Sector 1', 'Sector 16', 'Panchkula', 'Industrial Area'],
              },
              { title: 'Rating', key: 'rating', values: ['4.5', '4.0', '3.5'] },
            ].map(({ title, key, values }) => (
              <div key={key}>
                <h3 className="text-sm font-medium text-gray-300 mb-2">{title}</h3>
                <div className="flex flex-wrap gap-2">
                  {values.map((e) => (
                    <button
                      key={e}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeFilters[key] === e
                          ? 'bg-myteal-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => handleFilterChange(key, e)}
                    >
                      {key === 'rating' ? `${e}+ ★` : e}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Clear Filters */}
            {(activeFilters.category ||
              activeFilters.location ||
              activeFilters.rating ||
              activeFilters.price ||
              searchQuery) && (
              <div>
                <button
                  className="text-sm text-myteal-400 hover:text-myteal-300 flex items-center"
                  onClick={clearFilters}
                >
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Results Section */}
        <section className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <AttractionItem key={`${item._id}-${item.updatedAt || ''}`} item={item} />
          ))}
          {loading && (
            <div className="col-span-full flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-teal-500"></div>
              <p className="ml-4 font-khand font-medium">Loading more attractions...</p>
            </div>
          )}
          {!loading && data.length === 0 && (
            <div className="text-center py-16 bg-gray-800 rounded-xl border border-gray-700 w-[90vw]  ">
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
              <h3 className="mt-4 text-lg font-medium text-white">No attractions found</h3>
              <p className="mt-2 text-gray-400">
                Try adjusting your filters or search for something else.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

const GlobalCardDetails = (props) => {
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300 line-clamp-1">
            {props.name}
          </h3>
          <span className="bg-gray-700 text-teal-400 text-xs px-2 py-1 rounded">
            {props.category}
          </span>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2">{props.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-yellow-400 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {props.rating}
            </div>
            {props.totalReviews.length > 5 && (
              <span className="text-gray-400 text-sm ml-1">({props.totalReviews})</span>
            )}
          </div>
          <span
            className={`text-sm ${
              props.price === 'Free' || props.price === 'Free Entry'
                ? 'text-green-400'
                : 'text-gray-300'
            }`}
          >
            {props.price}
          </span>
        </div>

        {props.features && (
          <div className="mt-4 pt-4 border-t border-gray-700 flex flex-wrap gap-1.5">
            {props.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-[0.7rem] bg-gray-700 text-gray-300 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

import { Link } from 'react-router-dom';

const FetureAttraction = (props) => {
  const { _id, slug, imageUrl, mainImage, name, rating, totalReviews, category } = props;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-800/15 hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/0 hover:border-teal-500/30 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-xl hover:shadow-teal-500/5">
      <Link
        to={`/attractions/${slug}`}
        className="flex items-center p-1 px-3 space-x-3 transition-transform duration-300 hover:scale-[1.02] "
      >
        {/* Content */}
        <div className="flex-1 min-w-0">
          {category && (
            <span className="inline-block  py-0.5 mb-1 text-[10px] font-semibold font-chillax tracking-wide text-teal-400 bg-teal-900/30 rounded-sm px-1">
              {category}
            </span>
          )}
          <h4 className="text-sm font-semibold text-white line-clamp-2  leading-tight group-hover:text-teal-300 transition-colors">
            {name}
          </h4>
          <div className="mt-1 flex items-center text-xs text-gray-400">
            <span className="flex items-center">
              <svg
                className="w-3.5 h-3.5 mr-1 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating ? rating.toFixed(1) : 'N/A'}
              {totalReviews > 0 && (
                <span className="ml-1 text-gray-500">
                  ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Arrow  */}
        <div className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
};
export default Attraction;
