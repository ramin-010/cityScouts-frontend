import React from 'react';
import { TextArea, TextInput } from './FieldComponents';

/* Opening hours, rating & reviews – shared by Attraction & Dining */
export default function OpeningRatingReviews({ data, onChange }) {
  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4 text-teal-400">Hours & Rating</h2>

      {/* Opening Hours – simple comma-string for now; adjust as needed */}

      <TextInput
        label="Rating (1-5)"
        name="rating"
        value={data.rating}
        onChange={onChange}
        type="number"
        placeholder="4"
      />

      {/* Reviews */}
      <TextArea
        label="Reviews (IDs or text, comma-separated)"
        name="reviews"
        value={Array.isArray(data.reviews) ? data.reviews.join(', ') : data.reviews || ''}
        onChange={(e) =>
          onChange({
            target: { name: 'reviews', value: e.target.value.split(',').map((v) => v.trim()) },
          })
        }
        placeholder="reviewId1, reviewId2"
      />
    </section>
  );
}
