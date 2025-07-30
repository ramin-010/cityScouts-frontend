import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useDebounce from './useDebounce';

const useFetchWithQuery = (url, intialQuery = {}, options = {}) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(intialQuery);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasmore] = useState(true);
  const [error, setError] = useState(null);
  const page = useRef(intialQuery.page || 1);
  const controllerRef = useRef(null);
  // const debouncedQuery = useDebounce(query, 1000)

  const fetchData = async (reset = false) => {
    // cancel in-flight request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    // fresh controller for this request
    controllerRef.current = new AbortController();

    try {
      setLoading(true);
      const currentPage = reset ? 1 : page.current + 1;

      const queryParams = new URLSearchParams({
        ...query,
        page: currentPage,
      });

      const res = await axios.get(`${url}?${queryParams}`, {
        withCredentials: true,
        signal: controllerRef.current.signal,
      });
      const fetchedData = res.data.data;
      const totalData = res.data.total;

      if (reset) {
        setData(fetchedData);
        page.current = 1;
        setHasmore(fetchedData.length < totalData);
      } else {
        setData((prev) => {
          const combined = [...prev, ...fetchedData];

          setHasmore(combined.length < totalData);
          return combined;
        });
        page.current += 1;
      }
    } catch (err) {
      if (err.code !== 'ERR_CANCELED') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const resetData = (newQuery = {}) => {
    setQuery((prev) => {
      const updatedQuery = {
        ...prev,
        ...newQuery,
      };
      return updatedQuery;
    });

    setData([]);
    page.current = 1;
  };
  useEffect(() => {
    fetchData(true);
  }, [query]);

  return {
    data,
    loading,
    hasMore,
    error,
    fetchMore: () => fetchData(false),
    resetData,
    currentPage: page.current,
  };
};

export default useFetchWithQuery;
