import { useRecoilState } from 'recoil';
import {
  currentUserAtom,
  isAuthenticatedAtom,
  loadingAtom,
  errorAtom,
  hasCheckedAuthAtom,
} from './authAtoms';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [hasCheckedAuth, setHasCheckedAuth] = useRecoilState(hasCheckedAuthAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_FETCH_URL}/api/auth/getMe`, {
          withCredentials: true,
        });
        if (res.data.data && res.data.success) {
          setCurrentUser(res.data.data);
          setIsAuthenticated(true);
          setHasCheckedAuth(true);
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setError(err.response?.data?.message || 'Authentication check failed');
      } finally {
        setLoading(false);
      }
    };
    if (!hasCheckedAuth) {
      checkAuth();
    }
  }, [hasCheckedAuth]);

  //login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError('');

      const res = await axios.post(
        `${import.meta.env.VITE_FETCH_URL}/api/auth/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      setCurrentUser(res.data.data);
      setIsAuthenticated(true);
      return res.data;
    } catch (err) {
      const backendMessage = err.response?.data?.message;
      setError(backendMessage || 'Something went wrong, Login failed');
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  //signup function

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError(''); // Clear any previous errors

      const res = await axios.post(
        `${import.meta.env.VITE_FETCH_URL}/api/auth/register`,
        { name, email, password },
        {
          withCredentials: true,
        }
      );

      setCurrentUser(res.data.data);
      setIsAuthenticated(true);
      return res.data;
    } catch (err) {
      const backendMessage = err?.response?.data?.message;

      setError(backendMessage || 'Something went wrong, Signup failed');
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  //Logout function

  const logout = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_FETCH_URL}/api/auth/logout`, null, {
        withCredentials: true,
      });

      if (res.data?.success) {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
    
      console.log('Form Data form the useAuth udpate profile sending this data:');
      for (let [key, value] of userData.entries()) {
        console.log(key, value);
      }
      const response = await axios.put(
        `${import.meta.env.VITE_FETCH_URL}/api/users/updateProfile/${currentUser._id}`,
        userData,
        { withCredentials: true }
      );
      const updatadUser = response.data;

      setCurrentUser(updatadUser);
      setError(null);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Profile update Failed. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return {
    //these values will be avialable to all the childrens of AuthProvider
    currentUser,
    isAuthenticated,
    loading,
    error,
    user: currentUser,
    login,
    signup,
    logout,
    updateProfile,
  };
};
