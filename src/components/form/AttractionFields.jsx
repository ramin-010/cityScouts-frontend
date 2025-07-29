import React from 'react';
import { TextInput, TextArea, SelectInput } from './FieldComponents';
export default function AttractionFields({ data, onChange }) {
  const categories = [
    'Landmarks',
    'Museums',
    'Parks',
    'Entertainment',
    'Religious Sites',
    'Shopping',
    'Tours',
    'Other',
  ];
    

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4 text-teal-400">Attraction Details</h2>
      <SelectInput
        label="Category"
        name="category"
        value={data.category}
        onChange={onChange}
        options={categories}
      />

      <TextArea
        label="Features (comma separated)"
        name="features"
        value={data.features?.join(', ') || ''}
        onChange={(e) =>
          onChange({
            target: { name: 'features', value: e.target.value.split(',').map((s) => s.trim()) },
          })
        }
        placeholder="Guided tours, Souvenir shop"
      />


      <div className="space-y-2 my-6">
        <h3 className="text-lg font-semibold text-teal-300">Opening Hours</h3>
        <div className="relative">
          <textarea
            className={`w-full h-64 bg-gray-700 border ${data.openingHours ? 'border-gray-600' : 'border-red-500'} rounded px-3 py-2 text-white font-mono text-sm`}
            value={JSON.stringify(data.openingHours , null , 2)}
            onChange={(e) => {
              try {
                const val = JSON.parse(e.target.value);
                onChange({ target: { name: 'openingHours', value: val } });
              } catch (err) {
                console.warn("Invalid JSON format");
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

      {/* <div className="space-y-2 my-10">
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
        
      {/* Ticket Prices */}
      <div className="grid grid-cols-2 gap-4">
        {['adult', 'child', 'student', 'senior'].map((age) => (
          <TextInput
            key={age}
            label={`Ticket Price (${age})`}
            name={`ticketPrice.${age}`}
            value={data.ticketPrice?.[age] || 0}
            onChange={onChange}
            type="number"
          />
        ))}
      </div>
    </section>
  );
}
