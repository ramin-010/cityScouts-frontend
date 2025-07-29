import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import MapView from '../../components/externalComps/mapView';

function formatOpeningHours(hours) {
  if (!hours || hours.toLowerCase() === 'closed') return 'Closed';
  // Match time ranges like '09:00 AM - 05:00 PM' or '13:00 - 21:00'
  const timeRangeRegex =
    /([0-9]{1,2}:[0-9]{2}(?:\s*[APMapm]{2})?)\s*-\s*([0-9]{1,2}:[0-9]{2}(?:\s*[APMapm]{2})?)/;
  const match = hours.match(timeRangeRegex);
  if (match) {
    return `${to12Hour(match[1])} - ${to12Hour(match[2])}`;
  }
  // Single time (e.g., 'Open 24 hours')
  return hours;
}

function to12Hour(time) {
  // If already has AM/PM, just format spacing
  if (/am|pm/i.test(time)) {
    return time.replace(/\s+/g, '').toUpperCase().replace(/AM/, ' AM').replace(/PM/, ' PM');
  }
  // Convert 24-hour to 12-hour
  const [h, m] = time.split(':');
  let hour = parseInt(h, 10);
  const minute = m;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
}

const AttractionDetail = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const { data, error, loading } = useFetch(`${import.meta.env.VITE_FETCH_URL}/api/attractions/${slug}`);

  useEffect(() => {
    document.title = `CityScouts | Attraction Details`;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-12 flex items-center justify-center ">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading attraction details...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center py-12 bg-gray-800 rounded-lg shadow-sm border border-gray-700 max-w-md mx-auto">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Attraction not found</h3>
          <p className="text-gray-400 mb-6">
            The attraction you're looking for may have been removed or doesn't exist.
          </p>
          <Link
            to="/attractions"
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
          >
            Back to Attractions
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages =
    data.galleryImages && data.galleryImages.length > 1 ? data.galleryImages : [data.mainImage];  

  // Note: GeoJSON uses [longitude, latitude] order
  const longitude = data.location?.coordinates?.coordinates?.[0] || 76.7794;
  const latitude = data.location?.coordinates?.coordinates?.[1] || 30.7333;
  console.log("this is the coordinaties ",data.location?.coordinates?.coordinates?.[0])
  console.log("sec coor",data.location?.coordinates?.coordinates?.[1])
  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 animate-fadeInMore">
      <div className="md:max-w-[85vw] max-w-[97vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-4 flex items-center gap-2 sticky top-20 z-40 bg-gray-900/80 py-2">
          <Link
            to="/attractions"
            className="flex items-center text-teal-400 hover:text-teal-300 font-medium text-sm"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Attractions
          </Link>
        </div>

        {/* Header Section */}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row gap-8 mb-6">
              <div className="flex-1">
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">{data.name}</h1>
                    <p className="text-gray-400 text-base mb-2">
                      Discover details, location, and tips for your visit.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-gray-300 mt-2">
                      <span className="px-2 py-1 rounded bg-gray-700 text-teal-400 text-xs font-semibold uppercase tracking-wide">
                        {data.category}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                        {data.rating?.toFixed(1) || 'N/A'}
                      </span>
                      <span className="text-gray-400 text-sm">({data.reviews || 0} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-700 bg-gray-800">
                <div className="w-full h-96 relative">
                  <img
                    src={galleryImages[0]}
                    alt={data.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>

              </div>

              {/* Quick Facts Card */}
              <div className="lg:w-80 flex-shrink-0 ">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 h-full">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-gray-400 text-xs mb-1">Address</span>
                      <span className="text-gray-200 text-sm">
                        { data.location?.address || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-xs mb-1">Opening Hours</span>
                      <span className="text-gray-200 text-sm">
                        {typeof data.openingHours === 'object' && data.openingHours !== null ? (
                          <ul className="list-none p-0 m-0 space-y-1">
                            {Object.entries(data.openingHours).map(([day, hours]) => (
                              <li key={day} className="flex justify-between">
                                <span className="capitalize">{day}:</span>{' '}
                                <span>{formatOpeningHours(hours)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          data.openingHours || 'N/A'
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-xs mb-1">Entry Fee</span>
                      <span className="text-gray-200 text-sm">
                        {data.ticketPrice && typeof data.ticketPrice === 'object'
                          ? `Adult: ₹${data.ticketPrice.adult || 0}, Child: ₹${data.ticketPrice.child || 0}, Senior: ₹${data.ticketPrice.senior || 0}`
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="mb-4 border-b border-gray-700">
              <nav className="flex gap-1">
                <button
                  className={`px-4 py-3 font-medium text-gray-300 hover:text-teal-400 border-b-2 ${activeTab === 'about' ? 'border-teal-400 text-teal-400' : 'border-transparent'}`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </button>
                <button
                  className={`px-4 py-3 font-medium text-gray-300 hover:text-teal-400 border-b-2 ${activeTab === 'location' ? 'border-teal-400 text-teal-400' : 'border-transparent'}`}
                  onClick={() => setActiveTab('location')}
                >
                  Location
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none text-gray-300">
                    <p>{data.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* Address Card */}
                    <div className="bg-gray-700/70 rounded-lg p-6 border border-gray-600 flex flex-col">
                      <span className="text-lg font-bold text-white mb-2">Address</span>
                      <span className="text-gray-200 text-base">
                        {data.location?.address || 'N/A'}
                      </span>
                    </div>
                    {/* Opening Hours Card */}
                    <div className="bg-gray-700/70 rounded-lg p-6 border border-gray-600 flex flex-col">
                      <span className="text-lg font-bold text-white mb-2">Opening Hours</span>
                      <span className="text-gray-200 text-base">
                        {typeof data.openingHours === 'object' && data.openingHours !== null
                          ? // If all days have the same hours, show just one range, else show first open day
                            (() => {
                              const hoursArr = Object.values(data.openingHours).filter(Boolean);
                              const uniqueHours = Array.from(new Set(hoursArr));
                              if (uniqueHours.length === 1) {
                                return formatOpeningHours(uniqueHours[0]);
                              } else {
                                // Show first open day's hours
                                const firstOpen = hoursArr.find(
                                  (h) => h && h.toLowerCase() !== 'closed'
                                );
                                return firstOpen ? formatOpeningHours(firstOpen) : 'Closed';
                              }
                            })()
                          : data.openingHours || 'N/A'}
                      </span>
                    </div>
                    {/* Entry Fee Card */}
                    <div className="bg-gray-700/70 rounded-lg p-6 border border-gray-600 flex flex-col">
                      <span className="text-lg font-bold text-white mb-2">Entry Fee</span>
                      <span className="text-gray-200 text-base">
                        {data.ticketPrice && typeof data.ticketPrice === 'object'
                          ? `Adult: ₹${data.ticketPrice.adult || 0},  Child: ₹${data.ticketPrice.child || 0},  Senior Citizen: ₹${data.ticketPrice.senior || 0}, Student: ₹${data.ticketPrice.student || 0}`
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'location' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">Location</h3>
                  <div className="h-80 rounded-lg overflow-hidden border border-gray-700">
                    <MapView latitude={latitude} longitude={longitude} name={data.name} />
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition"
                  >
                    Get Directions
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetail;
