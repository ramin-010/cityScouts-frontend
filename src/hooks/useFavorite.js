import { favoriteAtom } from "../recoil/favBtnAtom";
import FavoriteButton from "../components/features/favorites";
import axios from 'axios';
import { useRecoilState } from "recoil";
import {useNavigate} from 'react-router-dom';

const useFavorite = (itemId, itemType) =>{
    const [favorites, setFavorites] = useRecoilState(favoriteAtom);
    const navigate = useNavigate();

    const isFavorite = favorites.includes(itemId);

    const toogleFavorite = async() =>{
        try{
            if(isFavorite){
                const res = await axios.delete(`${import.meta.env.VITE_FETCH_URL}/api/users/favorite/${itemId}`,{ data: { model: itemType },withCredentials: true});
                setFavorites(prev => prev.filter(id => id != itemId));
               
            }else{
                const res = await axios.post(`${import.meta.env.VITE_FETCH_URL}/api/users/favorite/${itemId}`,{model : itemType},{withCredentials: true});
                setFavorites(prev => [...prev, itemId]);
               
            }
        }catch(err){
            console.error(err.response?.data?.message || "something went wrong")
            if (err.response?.status === 401) {
                navigate('/login?message=Please login first');
              }
        }  
    }

    return {
        isFavorite,
        toogleFavorite
    }
}

export default useFavorite;