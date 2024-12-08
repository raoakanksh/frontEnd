import React, { useState } from 'react';

function SearchBar({ onSearch, searchQuery, onClear }) {
  const [query, setQuery] = useState(searchQuery || '');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for packages..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={onClear} style={{ marginLeft: '10px' }}>
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
