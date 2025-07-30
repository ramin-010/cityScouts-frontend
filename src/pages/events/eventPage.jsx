import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import {FaArrowRight} from 'react-icons/fa'

import GlobalCardComponent from '../../components/features/GlobalCardComp';
import useFetchWithQuery from '../../hooks/useFetchWithQuery';
import useDebounce from '../../hooks/useDebounce';

const EventItem = memo(({ event }) => {
  return (
    <GlobalCardComponent
      page="events"
      slug={event.slug}
      img={event.mainImage}
      key={event._id}
      src={`/events/${event._id}`}
      itemId={event._id}
    >
      <div className="absolute top-3 right-3 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded">
        {event.category}
      </div>

      <div className="md:p-4 md:pt-3 p-3">
        <h3 className="text-xl  font-bold text-white mb-2 line-clamp-1">{event.name}</h3>
        <div className='h-24 p-1 my-1'>
        <div className="flex items-center text-gray-400 mb-1 md:text-base text-sm">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
       

        <div className="flex items-center md:text-base text-sm text-gray-400 mb-1">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {event.created_on}
        </div>

        <div className="flex items-center md:text-base text-sm text-gray-400 mb-3">
        <div className='flex'>
          <CiLocationOn className="text-xl text-gray-400 mr-1"/>
          <p className="text-md text-gray-400 mb-2 line-clamp-1">{event.location.address}</p>
        </div>
        </div>
        </div>
        <p className="text-gray-300 mb-1 line-clamp-2 md:text-base ">{event.description}</p>

        <div className="flex pt-2">
          <span className="flex items-center font-semibold text-teal-400 text-sm">
            View Details
            <FaArrowRight className='pl-2 text-xl'/>
          </span>
        </div>
      </div>
    </GlobalCardComponent>
  );
});

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setactiveFilter] = useState('all');
  const debouncedQuery = useDebounce(searchQuery, 1000)

  //! dynamic backed req start

  const { data, loading, hasMore, error, fetchMore, resetData, currentPage } = useFetchWithQuery(
    `${import.meta.env.VITE_FETCH_URL}/api/events`,
    {
      page: 1,
      limit: 9,
      filter: activeFilter,
      search: searchQuery,
    }
  );

  // Handle filter change
  const handleFilterChange = (category) => {
    setactiveFilter(category);
    resetData( {filter :category} );
  };

  // Enhanced infinite scroll with better mobile support
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

  //setting page title
  useEffect(() => {
    document.title = 'Events in Chandigarh | CityScouts';
    console.log(data);
    return () => {
      document.title = 'CityScouts';
    };
  }, [data]);

   const searchQueryHandler = (e) => {
          setSearchQuery(e.target.value);
      };
    useEffect(() => {
      resetData({
        search: debouncedQuery,
      });
    }, [debouncedQuery]);

  return (
    <>
      <div className="min-h-screen bg-gray-900 pt-24 pb-12 animate-fadeInMore">
        <div className="md:max-w-[85vw] max-w-[97vw] mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Upcoming Events in Chandigarh</h1>
            <p className="text-gray-400 mt-2">Discover the best events happening in the city</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent pl-10 bg-gray-800 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['all', 'Festival', 'Entertainment', 'Exhibition', 'Education', 'Sports', 'others'].map(
                (category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-md capitalize ${
                      activeFilter === category
                        ? 'bg-myteal-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => handleFilterChange(category)}
                  >
                    {category === 'all' ? 'All Events' : category === 'Education' ? 'Education/Tech' : category}
                  </button>
                )
              )}
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((event) => (
              <EventItem key={`${event._id}-${event.createdAt || ''}`} event={event} />
            ))}

            {loading && (
              <div className="col-span-full flex flex-col justify-center items-center py-10">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-teal-500 mb-4"></div>
                <p className="ml-4 font-khand font-medium">Loading more events...</p>
              </div>
            )}
            {!loading && data.length == 0 && (
              <div className="text-center py-12 bg-gray-800 rounded-xl shadow-md border border-gray-700 w-[80vw]">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">No events found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={() => {
                    setactiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Events;
