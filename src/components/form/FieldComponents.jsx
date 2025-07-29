import React from 'react';

// Reusable basic form field components. Keep these minimal but flexible.
// None of these fields are marked as required so that partial updates work.

export const TextInput = ({ label, name, value, onChange, placeholder = '', type = 'text' }) => (
  <div className="mb-4">
    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

export const TextArea = ({ label, name, value, onChange, placeholder = '', rows = 3 }) => (
  <div className="mb-4">
    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor={name}>
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

export const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select',
}) => (
  <div className="mb-4">
    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor={name}>
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
  </div>
);

export const Checkbox = ({ label, name, checked, onChange }) => (
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={!!checked}
      onChange={onChange}
      className="h-4 w-4 text-teal-500 focus:ring-teal-400 border-gray-600 rounded"
    />
    <label htmlFor={name} className="ml-2 text-sm text-gray-300">
      {label}
    </label>
  </div>
);

export const ImageUploader = ({ images = [], onImagesChange }) => {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    onImagesChange([...images, ...files]);
  };
  const remove = (idx) => {
    const dup = [...images];
    dup.splice(idx, 1);
    onImagesChange(dup);
  };
  return (
    <div className="mb-6">
      <p className="text-gray-300 mb-2">Images</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className="relative group">
            <img src={img.url} alt={img.alt} className="w-full h-32 object-cover rounded-md" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full opacity-0 group-hover:opacity-100"
            >
              X
            </button>
          </div>
        ))}
        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-600 rounded-md cursor-pointer hover:border-teal-500">
          <span className="text-gray-400 text-sm">Add</span>
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
        </label>
      </div>
    </div>
  );
};
