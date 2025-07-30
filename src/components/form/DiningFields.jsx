import React, { useState, useEffect } from 'react';
import { TextInput, SelectInput, TextArea } from './FieldComponents';

export default function DiningFields({ data, onChange }) {
  const cuisines = [
    'Bakery',
    'Bar Food',
    'Barbecue',
    'Cafe',
    'Chinese',
    'Continental',
    'Fast Food',
    'Indian',
    'International',
    'Italian',
    'Mediterranean',
    'Mughlai',
    'Multi-cuisine',
    'North Indian',
    'Punjabi',
    'South Indian',
    'Street Food',
    'Vegetarian',
  ];

  const categories = ['Street Food', 'Casual Dining', 'Fine Dining', 'Cafe/Bakery', 'Other'];

  const priceRanges = ['$', '$$', '$$$', '$$$$'];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Initialize features with default values if not present
  const [features, setFeatures] = useState({
    delivery: false,
    takeout: false,
    outdoorSeating: false,
    parking: false,
    wifi: false,
    acceptsReservations: false,
    ...(data.features || {}),
  });

  // Initialize opening hours with default values if not present
  const [openingHours, setOpeningHours] = useState({
    monday: 'Closed',
    tuesday: 'Closed',
    wednesday: 'Closed',
    thursday: 'Closed',
    friday: 'Closed',
    saturday: 'Closed',
    sunday: 'Closed',
    ...(data.openingHours || {}),
  });

  // Handle features change
  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    const newFeatures = { ...features, [name]: checked };
    setFeatures(newFeatures);
    // Trigger parent's onChange with the new features
    onChange({ target: { name: 'features', value: newFeatures } });
  };

  // Handle opening hours change
  const handleOpeningHoursChange = (day, value) => {
    const newOpeningHours = { ...openingHours, [day]: value };
    setOpeningHours(newOpeningHours);
    // Trigger parent's onChange with the new opening hours
    onChange({ target: { name: 'openingHours', value: newOpeningHours } });
  };

  // Handle adding a new famous dish
  const handleAddDish = () => {
    const newDish = prompt('Enter a famous dish:');
    if (newDish && newDish.trim()) {
      const updatedDishes = [...(data.famousDishes || []), newDish.trim()];
      onChange({ target: { name: 'famousDishes', value: updatedDishes } });
    }
  };

  // Handle removing a famous dish
  const handleRemoveDish = (index) => {
    const updatedDishes = [...(data.famousDishes || [])];
    updatedDishes.splice(index, 1);
    onChange({ target: { name: 'famousDishes', value: updatedDishes } });
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-400">Dining Details</h2>

      {/* Cuisine Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-teal-300">Cuisine & Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput
            label="Primary Cuisine"
            name="cuisine"
            value={data.cuisine || ''}
            onChange={onChange}
            options={cuisines}
            required
          />
          <SelectInput
            label="Category"
            name="category"
            value={data.category || ''}
            onChange={onChange}
            options={categories}
            required
          />
        </div>
      </div>

      {/* Famous Dishes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-teal-300">Famous Dishes</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {(data.famousDishes || []).map((dish, index) => (
            <div key={index} className="bg-gray-700 px-3 py-1 rounded-full flex items-center">
              <span className="mr-2">{dish}</span>
              <button
                type="button"
                onClick={() => handleRemoveDish(index)}
                className="text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddDish}
          className="text-teal-400 hover:text-teal-300 text-sm flex items-center"
        >
          + Add Famous Dish
        </button>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-teal-300">Price Range</h3>
        <SelectInput
          name="priceRange"
          value={data.priceRange || '$$'}
          onChange={onChange}
          options={priceRanges}
        />
      </div>

      {/* Opening Hours */}
      <div className="space-y-2 my-6">
        <h3 className="text-lg font-semibold text-teal-300">Opening Hours</h3>
        <div className="relative">
          <textarea
            className={`w-full h-64 bg-gray-700 border ${data.openingHours ? 'border-gray-600' : 'border-red-500'} rounded px-3 py-2 text-white font-mono text-sm`}
            value={JSON.stringify(data.openingHours, null, 2)}
            onChange={(e) => {
              try {
                const val = JSON.parse(e.target.value);
                onChange({ target: { name: 'openingHours', value: val } });
              } catch (err) {
                console.warn('Invalid JSON format');
              }
            }}
            spellCheck={false}
            placeholder={'{\n  "monday": "9:00 AM - 7:00 PM",\n  "tuesday": "9:00 AM - 7:00 PM"\n}'}
          />
          <div className="mt-1 text-xs text-gray-400">
            Edit the JSON object above. Example: {'{"monday": "9:00 AM - 7:00 PM"}'}
          </div>
        </div>
      </div>
      {/* <div className="space-y-2">
        <h3 className="text-lg font-semibold text-teal-300">Opening Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {days.map((day) => (
            <div key={day} className="flex items-center">
              <span className="w-24 capitalize">{day}:</span>
              <input
                type="text"
                value={openingHours[day] || ''}
                onChange={(e) => handleOpeningHoursChange(day, e.target.value)}
                className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                placeholder="e.g., 9:00 AM - 10:00 PM"
              />
            </div>
          ))}
        </div>
      </div> */}

      {/* Features */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-teal-300">Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(features).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2 text-gray-300">
              <input
                type="checkbox"
                name={key}
                checked={!!value}
                onChange={handleFeatureChange}
                className="rounded border-gray-600 text-teal-500"
              />
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
