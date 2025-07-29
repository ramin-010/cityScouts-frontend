import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url, {
          signal: abortController.signal,
          withCredentials: true,
        });

        setData(res.data.data);
        setError(null);
      } catch (err) {
        if (err.name != 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
