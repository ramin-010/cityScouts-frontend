import { favoriteAtom } from "../recoil/favBtnAtom";
import FavoriteButton from "../components/features/favorites";
import axios from 'axios';
import { useRecoilState } from "recoil";
 

const useFavorite = (itemId, itemType) =>{
    const [favorites, setFavorites] = useRecoilState(favoriteAtom);

    const isFavorite = favorites.includes(itemId);

    const toogleFavorite = async() =>{
        try{
            if(isFavorite){
                const res = await axios.delete(`${import.meta.env.VITE_FETCH_URL}/api/users/favorite/${itemId}`,{ data: { model: itemType },withCredentials: true});
                setFavorites(prev => prev.filter(id => id != itemId));
                console.log(res.data?.message)
            }else{
                setFavorites(prev => [...prev, itemId]);
                const res = await axios.post(`${import.meta.env.VITE_FETCH_URL}/api/users/favorite/${itemId}`,{model : itemType},{withCredentials: true});
                console.log(res.data?.message)
            }
        }catch(err){
            console.error(err.response?.data?.message || "something went wrong")
            if (err.response?.status === 401) {
                navigate('/login');
              }
        }  
    }

    return {
        isFavorite,
        toogleFavorite
    }
}

export default useFavorite;