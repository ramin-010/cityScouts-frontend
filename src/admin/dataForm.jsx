import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import CommonFields from '../components/form/CommonFields';
import OpeningRatingReviews from '../components/form/OpeningRatingReviews';
import AttractionFields from '../components/form/AttractionFields';
import DiningFields from '../components/form/DiningFields';
import EventFields from '../components/form/EventFields';

import { useAuth } from '../recoil/useAuth';
import { toast } from 'react-toastify';
// Helper: immutably update nested state when input "name" uses dot-notation
const deepUpdate = (obj, pathArr, val) => {
  //!left
  if (!pathArr.length) return val;
  const [head, ...rest] = pathArr;
  return { ...obj, [head]: deepUpdate(obj[head] ?? {}, rest, val) };
};

const baseDefaults = {
  name: '', //done
  description: '', //done
  mainImage: '', //done
  images: [], //done
  location: {
    //done
    address: '',
    city: '',
    state: '',
    country: '',
    coordinates: {
      type: '',
      coordinates: [0, 0], // [longitude, latitude]
    },
  },
  isFeatured: false, //done
  isDeleted: false, //done
  publicIdMain: '', //done
  publicIdSub: [], //done
  category: '', //done
};

// Per-entity defaults
const entityDefaults = {
  attractions: {
    ticketPrice: { adult: 0, child: 0, student: 0, senior: 0 }, //done
    features: [], //done
    openingHours: {
      //done
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '9:00 AM - 7:00 PM',
    },
    rating: 0, //done
    reviews: [], //not handling review yet in the backend
  },
  dining: {
    cuisine: '', //done
    famousDishes: [], //done
    priceRange: '$$', //done
    features: {
      //done
      delivery: false,
      takeout: false,
      outdoorSeating: false,
      parking: false,
      wifi: false,
      acceptsReservations: false,
    },
    openingHours: {
      //done
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '9:00 AM - 7:00 PM',
    },
    rating: 0, //done
    reviews: [], //not handling review yet in the backend
  },
  events: {
    date: { start: '', end: '' }, //done
    time: { start: '', end: '' }, //done
    // ticketPrice: 0,  no need even though in the schema
    features: {
      //done
      familyFriendly: false,
      accessible: false,
      parking: false,
      outdoor: false,
      free: false,
    },
    organizer: {
      //done
      name: '',
      contact: {
        email: '',
        phone: '',
        website: '',
      },
    },
  },
};

const DataForm = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const qs = new URLSearchParams(search);
  const { user } = useAuth();

  const tab = qs.get('tab');
  let slug = '';

  const isAddMode = pathname.endsWith('/add');

  if (!isAddMode) {
    slug = qs.get('slug');
  }

  const [formData, setFormData] = useState({
    ...baseDefaults,
    ...entityDefaults[tab],
  });

  useEffect(() => {
    setFormData({ ...baseDefaults, ...entityDefaults[tab] });
  }, [tab]);

  useEffect(() => {
    if (!isAddMode) {
      setFormData((prev) => ({
        ...prev,
        openingHours: {},
      }));
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      if (user.role === 'contributor') {
        toast.info('Limited access: You are logged in as a contributor.', {
          position: 'top-right',
          autoClose: 6000,
          style: {
            background: '#1F2937',
            color: 'white',
          },
        });
      } else if (user.role === 'recruiter') {
        toast.info(
          'Limited access: You are logged in as a recruiter. Recruiters are only allowed to view the UI.',
          {
            position: 'top-right',
            autoClose: 6000,
            style: {
              background: '#1F2937',
              color: 'white',
            },
          }
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  // Generic onChange supporting nested names + checkboxes
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (name.includes('.')) {
      const pathArr = name.split('.');
      setFormData((prev) => deepUpdate(prev, pathArr, val));
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
    }
  };

  const handleImagesChange = (imgs) => setFormData((p) => ({ ...p, images: imgs }));

  //! Main function
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      //stringified data(5)
      if (formData.name) fd.append('name', formData.name);
      if (formData.description) fd.append('description', formData.description);
      if (formData.category) fd.append('category', formData.category);
      if (formData.isFeatured) fd.append('featured', formData.isFeatured);
      if (formData.isDeleted) fd.append('isDeleted', formData.isDeleted);

      //location(6)
      const locationObject = {
        address: formData.location?.address || '',
        city: formData.location?.city || '',
        state: formData.location?.state || '',
        country: formData.location?.country || 'India',
        coordinates: formData.location?.coordinates || {
          type: 'Point',
          coordinates: [0, 0],
        },
      };
      fd.append('location', JSON.stringify(locationObject)); //handling the location in the backend for its trueness

      // Other nested fields with conditional quering(12)
      if (tab === 'attractions' || tab === 'dining') {
        fd.append('openingHours', JSON.stringify(formData.openingHours || {}));
        fd.append('rating', JSON.stringify(formData.rating));
      }
      if (tab === 'attractions' || tab === 'events') {
        fd.append('ticketPrice', JSON.stringify(formData.ticketPrice || {}));
      }
      if (tab === 'dining') {
      if(formData.cuisine) fd.append('cuisine', JSON.stringify(formData.cuisine));
        fd.append('famousDishes', JSON.stringify(formData.famousDishes));
      if(formData.priceRange !== '$$')  fd.append('priceRange', JSON.stringify(formData.priceRange));
      }
      if (tab === 'events') {
        fd.append('date', JSON.stringify(formData.date || {}));
        fd.append('time', JSON.stringify(formData.time || {}));
        fd.append('organizer', JSON.stringify(formData.organizer || {}));
      }
      fd.append('features', JSON.stringify(formData.features || {}));
      // Files
      if (formData.mainImage) {
        if (formData.mainImage instanceof File) {
          fd.append('mainImage', formData.mainImage);
        } else if (typeof formData.mainImage === 'string') {
          fd.append('mainImageUrl', formData.mainImage);
        }
      }
      if (formData.publicIdMain) {
        fd.append('publicIdMain', formData.publicIdMain);
      }
      if (formData.publicIdSub.length > 0) {
        fd.append('publicIdSub', JSON.stringify(formData.publicIdSub));
      }

      if (Array.isArray(formData.images)) {
        formData.images.forEach((img, index) => {
          if (img instanceof File) {
            fd.append('images', img);
          } else if (typeof img === 'string') {
            fd.append('existingImages', JSON.stringify({ url: img }));
          }
        });
      }

      // for (let [key, val] of fd.entries()) {
      //   if (val instanceof File) {

      //   } else {

      //   }
      // }

      // Axios request
      const url = isAddMode
        ? `${import.meta.env.VITE_FETCH_URL}/api/${tab}/admin` //for adding
        : `${import.meta.env.VITE_FETCH_URL}/api/${tab}/admin/${slug}`; //for updating

      const res = await axios({
        method: isAddMode ? 'post' : 'put',
        url,
        data: fd,
        withCredentials: true,
      });
      toast.success(`${isAddMode ? 'Successfully Added' : 'Successfully updated'}`);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          `${isAddMode ? 'Error Adding the data' : 'Error updating the data'}`,
        {
          autoClose: 6000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold capitalize">
            {isAddMode ? 'Add' : 'Edit'} {tab}
          </h1>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-700 rounded-md">
            Back
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CommonFields
            slug={slug}
            tab={tab}
            data={formData}
            onChange={handleChange}
            onImagesChange={handleImagesChange}
          />

          {(tab === 'attractions' || tab === 'dining') && (
            <OpeningRatingReviews data={formData} onChange={handleChange} />
          )}

          {tab === 'attractions' && <AttractionFields data={formData} onChange={handleChange} />}
          {tab === 'dining' && <DiningFields data={formData} onChange={handleChange} />}
          {tab === 'events' && <EventFields data={formData} onChange={handleChange} />}

          <div className="pt-4 flex justify-end">
            <button type="submit" className="px-6 py-2 bg-teal-600 rounded-md">
              {loading
                ? isAddMode
                  ? 'Creating...'
                  : 'Updating...'
                : isAddMode
                  ? 'Create'
                  : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataForm;
