import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return;
    }

    setSearching(true);

    const apiKey = import.meta.env.VITE_PEXEL_API;
    const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=10`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch search results. Status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.photos);

      onSearch(data.photos);
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    } finally {
      setSearching(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="bg-gray-300 flex items-center border border-gray-300 rounded-full p-4 px-4 w-full">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-gray-300 ml-4 focus:outline-none placeholder-gray-500 w-full"
        />
      </div>

      {searching && <div className="absolute top-16 left-0 right-0 bg-white p-4 shadow-md">Buscando...</div>}

      <div className="mt-2">
        {searchResults.map((result) => (
          <div key={result.id} className="mb-2">
            <img src={result.src.original} alt={result.photographer} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
