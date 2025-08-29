import React, { useState } from 'react';
import useLocationStore from '../Api/stores/useLocationStore';

// Open-Meteo geocoding API for city suggestions
const CitySearch = ({ onSelect }) => {
  const [input, setInput] = useState('');
  const { suggestions, getCitysuggestion, showSuggestions, getmanualLocation } = useLocationStore();

  // When input changes, fetch suggestions
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 1) {
      getCitysuggestion(value);
    }
  };

  // Autofill input when a suggestion is clicked
  const handleSelect = (suggestion) => {
    setInput(suggestion.city || suggestion.display_name || '');
  };

  // On search button click, trigger manual weather search with the input value
  const handleSearch = (e) => {
    e.preventDefault();
    if (input && input.length > 1) {
      getmanualLocation(input);
    }
  };
  return (
    <form className='flex' onSubmit={handleSearch} autoComplete="off">
      <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
        <input
          type="text"
          value={typeof input === 'string' ? input : ''}
          onChange={handleChange}
          placeholder="Search for a city..."
          className="border px-2 py-1 w-full rounded"
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute bg-white border w-full mt-1 rounded shadow z-10">
            {suggestions.map((s, idx) => (
              <li
                key={s.place_id || s.id || idx}
                className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(s)}
              >
                {s.city ? `${s.city}` : ''}
                {s.country ? `, ${s.country}` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">search</button>
    </form>
  );
};

export default CitySearch;
