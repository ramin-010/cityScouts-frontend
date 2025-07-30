import { useState, useEffect } from 'react';

const useDebounce = (query, delay) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, query]);

  return debouncedQuery;
};

export default useDebounce;
