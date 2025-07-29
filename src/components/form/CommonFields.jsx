import React, { useEffect } from 'react';
import { TextInput, TextArea, ImageUploader } from './FieldComponents';
import MapView from '../externalComps/mapView';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
/*
 * CommonFields – fields present in ALL three common entities (Attraction, Dining, Event)
 * - name
 * - description
 * - mainImage (single file upload)
 * - images (array upload)
 * - location (address, city, state, country, coordinates)
 * - featured (boolean)
 * - isDeleted (boolean)
 *
 * - map view is not working yet
 *
 */

export default function CommonFields({ slug = 'default', tab, data, onChange, onImagesChange }) {
  const [slugData, setSlugData] = useState({ images: [], mainImagePublicId: '' });
  const [toDeleteIds, setToDeleteIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteMain, setDeleteMain] = useState(false);
  const { pathname } = useLocation();

  const mockdata = {
    images: [
      { publicId: 'attractions/taj-mahal/abc123xyz' },
      { publicId: 'attractions/taj-mahal/def456uvw' },
      { publicId: 'attractions/taj-mahal/ghi789rst' },
    ],
    mainImagePublicId: 'attractions/taj-mahal/main-1234abcd',
    name: 'Taj Mahal',
  };

  //only run incase if the api was /update
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("this is the slug data before" )
        const res = await axios.get(`${import.meta.env.VITE_FETCH_URL}/api/${tab}/admin/${slug}`, {withCredentials : true});
        const doc = res.data.data;
        console.log("this is the slug data " ,doc)
        setSlugData(doc);
      } catch (err) {
        console.log('err fetching data', err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug, tab]);

  // Update sub-image ids whenever checkbox list changes
  useEffect(() => {
    onChange({ target: { name: 'publicIdSub', value: toDeleteIds } });
  }, [toDeleteIds]);

  // Update main image id when toggle changes
  useEffect(() => {
    onChange({
      target: {
        name: 'publicIdMain',
        value: deleteMain ? slugData.mainImagePublicId : '',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMain, slugData.mainImagePublicId]);

  const handleCheckChange = (id) => {
    setToDeleteIds((prev) => (prev.includes(id) ? prev.filter((e) => e != id) : [...prev, id]));
    console.log(toDeleteIds);
  };
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { name: 'mainImage', value: file } });
    }
  };

  const [showMap, setShowMap] = useState(false);

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 ">
      <h2 className="text-xl font-semibold mb-4 text-teal-400">Basic Information</h2>
      <TextInput
        label="Name"
        name="name"
        value={data.name}
        onChange={onChange}
        placeholder="Enter name"
      />
      <TextArea
        label="Description"
        name="description"
        value={data.description}
        onChange={onChange}
        placeholder="Enter description"
      />

      {/* Main Image */}
      <div className="mb-4 grid justify-between p-4 bg-gray-700 md:grid-cols-2 grid-cols-1 rounded-lg gap-6 ">
        <div>
          <p className="text-gray-300 mb-2">Main Image</p>
          <input type="file" accept="image/*" onChange={handleMainImageChange} />
        </div>

        {/*only shown in /update */}
        {pathname.endsWith('/update') && (
          <div className="">
            <p className="text-gray-300 mb-2">Existing Image PublicId to Delete</p>
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={deleteMain}
                disabled={!slugData.mainImagePublicId}
                onChange={(e) => setDeleteMain(e.target.checked)}
              />
              {slugData.mainImagePublicId || 'No main image'}
            </label>
          </div>
        )}
      </div>

      {/* Image Gallery */}
      <ImageUploader images={data.images} onImagesChange={(imgs) => onImagesChange(imgs)} />

      {/* only showin in /update */}
      {pathname.endsWith('/update') && (
        <div className="container bg-gray-700 p-2 rounded-lg mb-8">
          <p className="text-gray-300 mb-2">Uncheck Images you want to keep in the Cloud</p>
          {slugData.images?.map((e) => (
            <label key={e.publicId} className="flex items-center my-3 gap-2">
              <input
                type="checkbox"
                checked={toDeleteIds.includes(e.publicId)}
                onChange={() => handleCheckChange(e.publicId)}
              />
              {e.publicId}
            </label>
          ))}
        </div>
      )}

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Address"
          name="location.address"
          value={data.location.address}
          onChange={onChange}
          placeholder="Street address"
        />
        <TextInput
          label="City"
          name="location.city"
          value={data.location.city}
          onChange={onChange}
        />
        <TextInput
          label="State"
          name="location.state"
          value={data.location.state}
          onChange={onChange}
        />
        <TextInput
          label="Country"
          name="location.country"
          value={data.location.country}
          onChange={onChange}
        />
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput
          label="Latitude"
          type="number"
          name="latitude"
          value={data.location?.coordinates?.coordinates?.[1] ?? ''} // lat is at index 1
          onChange={(e) => {
            const lat = parseFloat(e.target.value) || 0;
            const lng = parseFloat(data.location?.coordinates?.coordinates?.[0] || 0);
            onChange({
              target: {
                name: 'location.coordinates',
                value: {
                  type: 'Point',
                  coordinates: [lng, lat],
                },
              },
            });
          }}
          step="any"
        />
        <TextInput
          label="Longitude"
          type="number"
          name="longitude"
          value={data.location?.coordinates?.coordinates?.[0] ?? ''} // lng is at index 0
          onChange={(e) => {
            const lng = parseFloat(e.target.value) || 0;
            const lat = parseFloat(data.location?.coordinates?.coordinates?.[1] || 0);
            onChange({
              target: {
                name: 'location.coordinates',
                value: {
                  type: 'Point',
                  coordinates: [lng, lat],
                },
              },
            });
          }}
          step="any"
        />
      </div>

      {/* Preview Map Button */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowMap(true)}
          disabled={
            !(
              Array.isArray(data.location.coordinates.coordinates) &&
              data.location.coordinates.coordinates.length === 2 &&
              data.location.coordinates.coordinates.every(
                (c) => typeof c === 'number' && !Number.isNaN(c)
              )
            )
          }
          className="px-4 py-2 bg-teal-600 rounded disabled:opacity-50"
        >
          Show Map
        </button>
      </div>

      {/* Map */}
      {showMap &&
      data.location?.coordinates?.coordinates &&
      Array.isArray(data.location.coordinates.coordinates) &&
      data.location.coordinates.coordinates.length === 2 &&
      data.location.coordinates.coordinates.every(
        (c) => typeof c === 'number' && !Number.isNaN(c)
      ) ? (
        <MapView
          latitude={data.location.coordinates.coordinates[1]}
          longitude={data.location.coordinates.coordinates[0]}
        />
      ) : (
        <p className="text-gray-400 text-sm mt-2">
          Enter valid coordinates and click "Show Map" to preview.
        </p>
      )}

      <div className="flex items-center space-x-4 mt-4">
        <label className="flex items-center space-x-2 text-gray-300">
          <input type="checkbox" name="isFeatured" checked={data.isFeatured} onChange={onChange} />
          <span>Featured</span>
        </label>
        <label className="flex items-center space-x-2 text-gray-300">
          <input type="checkbox" name="isDeleted" checked={data.isDeleted} onChange={onChange} />
          <span>Is Deleted</span>
        </label>
      </div>
    </section>
  );
}
