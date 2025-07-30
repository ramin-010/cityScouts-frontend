import React from 'react';
import { TextInput, SelectInput } from './FieldComponents';

export default function EventFields({ data, onChange }) {
  const categories = ['Festival', 'Entertainment', 'Exhibition', 'Education', 'Sports', 'others'];

  // Handle feature toggle
  const handleFeatureToggle = (e) => {
    const { name, checked } = e.target;
    const newFeatures = { ...(data.features || {}), [name]: checked };
    onChange({ target: { name: 'features', value: newFeatures } });
  };
  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4 text-teal-400">Event Details</h2>

      {/* Features Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-teal-300">Features</h3>
        <div className="grid grid-cols-2 gap-2">
          {['familyFriendly', 'accessible', 'parking', 'outdoor', 'free'].map((feature) => (
            <label key={feature} className="flex items-center space-x-2 text-gray-300">
              <input
                type="checkbox"
                name={feature}
                checked={!!(data.features && data.features[feature])}
                onChange={handleFeatureToggle}
                className="rounded border-gray-600 text-teal-500"
              />
              <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
            </label>
          ))}
        </div>
      </div>
      <SelectInput
        label="Category"
        name="category"
        value={data.category}
        onChange={onChange}
        options={categories}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Start Date"
          type="date"
          name="date.start"
          value={data.date?.start}
          onChange={onChange}
        />
        <TextInput
          label="End Date"
          type="date"
          name="date.end"
          value={data.date?.end}
          onChange={onChange}
        />
        <TextInput
          label="Start Time"
          type="time"
          name="time.start"
          value={data.time?.start}
          onChange={onChange}
        />
        <TextInput
          label="End Time"
          type="time"
          name="time.end"
          value={data.time?.end}
          onChange={onChange}
        />
      </div>

      <TextInput
        label="Ticket Price"
        type="number"
        name="ticketPrice"
        value={data.ticketPrice}
        onChange={onChange}
      />

      <h3 className="text-lg font-semibold mt-4 mb-2 text-teal-300">Organizer</h3>
      <TextInput
        label="Organizer Name"
        name="organizer.name"
        value={data.organizer?.name}
        onChange={onChange}
      />
      <TextInput
        label="Email"
        type="email"
        name="organizer.contact.email"
        value={data.organizer?.contact?.email}
        onChange={onChange}
      />
      <TextInput
        label="Phone"
        type="tel"
        name="organizer.contact.phone"
        value={data.organizer?.contact?.phone}
        onChange={onChange}
      />
      <TextInput
        label="Website"
        type="url"
        name="organizer.contact.website"
        value={data.organizer?.contact?.website}
        onChange={onChange}
      />
    </section>
  );
}
