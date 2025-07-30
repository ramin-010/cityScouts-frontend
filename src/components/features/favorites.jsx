import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useFavorite from '../../hooks/useFavorite';

const FavoriteButton = ({ itemId, itemType }) => {
  const { isFavorite, toogleFavorite } = useFavorite(itemId, itemType);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await toogleFavorite();
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className="p-1.5 rounded-full bg-gray-900/70 hover:bg-gray-800 transition-colors"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <FaHeart className="text-md text-red-500" />
      ) : (
        <FaRegHeart className="text-md text-white hover:text-red-300" />
      )}
    </button>
  );
};

export default FavoriteButton;
