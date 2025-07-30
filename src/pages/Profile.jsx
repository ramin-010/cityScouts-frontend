import React, { act, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../recoil/useAuth';
import elanteMall from '../assets/elante_mall.png';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledWrapper } from '../components/externalComps/flipCardComp';

const Profile = () => {
  const { updateProfile, currentUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('My Profile');
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [formData, setFormData] = useState({
    name: currentUser?.name,
    mainImage: '',
    password: '',
    email: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const [toggleEdit, setToggleEdit] = useState({
    email: false,
    password: false,
    image: false,
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      const formData = new FormData();

      await updateProfile(formData);
      setUpdateSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setUpdateError('Error Updating data : Please try again');
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: currentUser?.name || '',
      photoUrl: currentUser?.photoUrl || '',
    });
    setToggleEdit((prev) => ({
      ...prev,
      email: false,
      password: false,
      image: false,
    }));
  };

  const savedItems = {
    attractions: [
      {
        id: '1',
        name: 'Rock Garden',
        category: 'Landmark',
        location: 'Sector 1, Chandigarh',
      },
      {
        id: '2',
        name: 'Sukhna Lake',
        category: 'Lakes & Waterfront',
        location: 'Sector 1, Chandigarh',
      },
      {
        id: '3',
        name: 'Rock Garden',
        category: 'Landmark',
        location: 'Sector 1, Chandigarh',
      },
      {
        id: '4',
        name: 'Sukhna Lake',
        category: 'Lakes & Waterfront',
        location: 'Sector 1, Chandigarh',
      },
    ],
    restaurants: [
      {
        id: '1',
        name: 'Pal Dhaba',
        category: 'North Indian',
        location: 'Sector 28, Chandigarh',
      },
      {
        id: '2',
        name: "Gopal's 56",
        category: 'Multi-Cuisine',
        location: 'Sector 8, Chandigarh',
      },
    ],
    events: [
      {
        id: '1',
        name: 'Rose Festival',
        category: 'Festival',
        date: 'February 23-25, 2024',
      },
      {
        id: '2',
        name: 'International Yoga Day',
        category: 'Health & Wellness',
        date: 'June 21, 2024',
      },
    ],
  };

  return (
    <>
      <div className="min-h-screen container mx-auto bg-gray-900 pt-24 px-3">
        <div className="max-w-[75vw] mx-auto  w-full px-4">
          <h1 className="text-4xl font-chillax font-semibold">Your Profile</h1>
          <div className="flex flex-col md:flex-row gap-8 mt-10">
            <div className="w-full md:w-64 rounded-lg overflow-hidden">
              <nav className="divide-y divide-gray-600">
                {['My Profile', 'Saved Attraction', 'Saved Restraunts', 'Saved Events'].map(
                  (e, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(e)}
                      className={`w-full flex px-3 py-2.5 text-white font-excon font-semibold text-lg 
                                ${
                                  activeTab == e
                                    ? 'bg-[#d1e7ea] text-myteal-900'
                                    : 'bg-gray-800  text-gray-900 hover:bg-gray-600 '
                                }
                                `}
                    >
                      {e}
                    </button>
                  )
                )}
              </nav>
            </div>

            <div className="bg-gray-800 flex-1 rounded-lg py-3 px-4">
              {activeTab == 'My Profile' && (
                <div className="">
                  <div className="flex justify-between mb-5">
                    <h2 className="text-2xl font-excon">Account Information</h2>
                    {!isEditing && (
                      <button
                        className="bg-[#2cb290] hover:bg-myteal-700 py-2 px-2 rounded-lg"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  <div className="">
                    {updateSuccess && !isEditing && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeIn' }}
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                      >
                        Profile updated successfully!
                      </motion.div>
                    )}
                    {updateError && !isEditing && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeIn' }}
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 font-normal rounded relative mb-4 "
                      >
                        {updateError}
                      </motion.div>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSumbit}>
                      <div className="space-y-3">
                        <div>
                          <label>
                            <p className="text-sm font-chillax">Display Name</p>
                          </label>
                          <input
                            className="border border-gray-900 text-gray-900 px-4 py-2 rounded relative  w-full"
                            placeholder="Enter your name"
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            value={formData.name}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email">
                            <p className="text-sm font-chillax ">Email</p>
                          </label>
                          {toggleEdit.email ? (
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder={currentUser.email}
                              className="border border-gray-900 text-gray-900 px-4 py-2 rounded w-full"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                              }
                              required
                            />
                          ) : (
                            <button
                              className="bg-red-900 text-[0.7rem] py-1 px-2 rounded-sm"
                              onClick={() =>
                                setToggleEdit((prev) => ({
                                  ...prev,
                                  email: !prev.email,
                                }))
                              }
                            >
                              Edit email
                            </button>
                          )}
                        </div>

                        <div className="relative">
                          <label>
                            <p className="text-sm font-chillax">Password</p>
                          </label>
                          {toggleEdit.password ? (
                            <>
                              <input
                                type={showPassword ? 'text' : 'password'}
                                className="border border-gray-900 text-gray-900 px-4 py-2 rounded w-full pr-12"
                                placeholder="Please only enter Password, If needed a change"
                                name="password"
                                value={formData.password}
                                onChange={(e) =>
                                  setFormData({ ...formData, password: e.target.value })
                                }
                              />
                              <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-2 top-8 text-sm text-gray-900 focus:outline-none flex items-center"
                              >
                                {showPassword ? 'Hide' : 'View'}
                              </button>
                            </>
                          ) : (
                            <button
                              className="bg-red-900 text-[0.7rem] py-1 px-2 rounded-sm"
                              onClick={() =>
                                setToggleEdit((prev) => ({
                                  ...prev,
                                  password: !prev.password,
                                }))
                              }
                            >
                              Edit password
                            </button>
                          )}
                        </div>

                        <div>
                          <label>
                            <p className="text-sm font-excon ">Want to Change the Profile Pic ?</p>
                          </label>
                          {toggleEdit.mainImage ? (
                            <input
                              className=" bg-gray-700 px-4 py-4 text-white rounded relative mb-4  w-full"
                              placeholder="eg : http://dummy/photo"
                              type="file"
                              id="photoUrl"
                              name="photoUrl"
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  mainImage: e.target.files[0],
                                }))
                              }
                              value={formData.mainImage}
                            />
                          ) : (
                            <button
                              className="bg-red-900 text-[0.7rem] py-1 px-2 rounded-sm"
                              onClick={() =>
                                setToggleEdit((prev) => ({
                                  ...prev,
                                  mainImage: !prev.mainImage,
                                }))
                              }
                            >
                              Edit Profile
                            </button>
                          )}
                        </div>

                        <div className="space-x-3">
                          <button
                            type="submit"
                            className="bg-myteal-600 rounded-md py-2 px-3 font-semibold hover:bg-myteal-700"
                          >
                            Save Changes
                          </button>
                          <button
                            className="bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 px-5 py-2 rounded-md transition"
                            onClick={cancelEdit}
                            type="button"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-teal-100 flex-shrink-0 shadow-sm border border-teal-200">
                        {currentUser && currentUser?.mainImagePublicId ? (
                          <img
                            src={currentUser?.mainImagePublicId}
                            alt={currentUser?.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl text-teal-600 bg-teal-50">
                            {currentUser && currentUser?.name
                              ? (currentUser?.name).charAt(0).toUpperCase()
                              : 'U'}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-300">
                          {currentUser?.name}
                        </h3>
                        <p className="text-gray-500 mb-1">Email: {currentUser?.email}</p>
                        <p className="text-gray-500">
                          Member since: {new Date(currentUser?.created_on).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab == 'Saved Attraction' && (
                <div className="">
                  <div className="mb-5">
                    <h2 className="text-2xl font-excon">Saved Attraction</h2>
                  </div>
                  {currentUser.favourites.attractions.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                      {currentUser.favourites.attractions.map((e, idx) => (
                        <Link key={idx}>
                          <SavedItemComponent
                            name={e.name}
                            category={e.category}
                            img={e.mainImage}
                            location={e.location.city}
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-[#b9dbe0] rounded-lg">
                      <p className="text-gray-700 mb-4">You haven't saved any attractions yet.</p>

                      <Link
                        to="/attractions"
                        className="text-myteal-900 font-medium hover:text-teal-700"
                      >
                        Browse Attractions
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab == 'Saved Restraunts' && (
                <div className="">
                  <div className="mb-5">
                    <h2 className="text-2xl font-excon">Saved Attraction</h2>
                  </div>
                  {currentUser.favourites.dinings.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                      {currentUser.favourites.dinings.map((e, idx) => (
                        <Link key={idx}>
                          <SavedItemComponent
                            name={e.name}
                            category={e.category}
                            img={e.mainImage}
                            location={e.location.city}
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-[#b9dbe0] rounded-lg">
                      <p className="text-gray-700 mb-4">You haven't saved any attractions yet.</p>

                      <Link
                        to="/attractions"
                        className="text-myteal-900 font-medium hover:text-teal-700"
                      >
                        Browse Attractions
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab == 'Saved Events' && (
                <div className="">
                  <div className="mb-5">
                    <h2 className="text-2xl font-excon">Saved Attraction</h2>
                  </div>
                  {currentUser.favourites.events.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                      {currentUser.favourites.events.map((e, idx) => (
                        <Link key={idx}>
                          <SavedItemComponent
                            name={e.name}
                            category={e.category}
                            img={e.mainImage}
                            location={e.location.city}
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-[#b9dbe0] rounded-lg">
                      <p className="text-gray-700 mb-4">You haven't saved any attractions yet.</p>

                      <Link
                        to="/attractions"
                        className="text-myteal-900 font-medium hover:text-teal-700"
                      >
                        Browse Attractions
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SavedItemComponent = ({ img, name, category, location }) => {
  return (
    <>
      <StyledWrapper>
        <div className="card">
          <img src={img} alt={name} className="card__icon" loading="lazy" />
          <div className="card__content">
            <p className="card__title">{name}</p>
            <p className="card__description">{category}</p>
            <p className="card_location">{location}</p>
          </div>
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Remove from favorites logic would go here
            }}
          >
            <svg className="w-4 h-4 text-red-500 " fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </StyledWrapper>
    </>
  );
};

// 👇 Define styled-component styles here

export default Profile;
