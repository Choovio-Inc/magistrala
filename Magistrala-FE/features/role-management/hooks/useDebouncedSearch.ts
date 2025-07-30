import { useState, useEffect, useCallback } from 'react';

interface UseDebouncedSearchOptions {
  delay?: number;
  minLength?: number;
}

export const useDebouncedSearch = (options: UseDebouncedSearchOptions = {}) => {
  const { delay = 300, minLength = 0 } = options;
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= minLength || searchTerm.length === 0) {
        setDebouncedSearchTerm(searchTerm);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay, minLength]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearch,
    clearSearch,
    isSearching: searchTerm !== debouncedSearchTerm
  };
}; 