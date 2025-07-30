import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FavoriteButton from './favorites';

const GlobalCardComponent = ({
  children,
  img = 'https://via.placeholder.com/800x600?text=Chandigarh+Carnival+Banner',
  slug,
  page,
  itemId,
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState('');
  const [showFavBtn, setShowFavBtn] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.endsWith('/')) {
      setShowFavBtn(!showFavBtn);
    }
  }, [pathname]);

  const handleCardClick = () => {
    navigate(`/${page}/${slug}`);
  };

  return (
    <div
    onClick={handleCardClick}
    className="w-full h-full flex flex-col bg-gray-800 backdrop-blur-sm rounded-xl transition-all duration-500 overflow-hidden shadow hover:shadow-xl border border-gray-900/80 hover:border-gray-900 group cursor-pointer"
  >
   <div className="md:h-56 h-44 w-[97%] mx-auto py-1.5 overflow-hidden rounded-lg">
        <div className="w-full h-full overflow-hidden rounded-lg">
          {!imageError ? (
            <img
              src={img}
              alt={slug || 'Card image'}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full text-white bg-gray-900 flex text-center justify-center items-center font-khand">
              Oops...! <br /> Image Not Available yet
            </div>
          )}
          <div className='inset-0 absolute w-full flex justify-end'>
             {showFavBtn && <div className=' p-2 '> <FavoriteButton itemType={page} itemId={itemId}/></div>}
          </div>
          
        </div>
      </div>
  
    {/* Children (Details section) */}
    <div className="flex-1 flex flex-col">
      {children}
    </div>
  </div>
  
  );
};

export default GlobalCardComponent;
