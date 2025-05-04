function SearchBar({ searchTerm, setSearchTerm, isLoading }) {
    const handleClearSearch = () => {
      setSearchTerm('')
    }
    
    return (
      <div className="search-section">
        <div className="search-input-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for a word..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-btn" 
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {isLoading && <div className="loading">Searching...</div>}
      </div>
    );
  }
  export default SearchBar;