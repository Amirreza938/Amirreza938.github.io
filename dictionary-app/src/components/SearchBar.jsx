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
            placeholder="واژه مورد نظر را جستجو کنید..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-btn" 
              onClick={handleClearSearch}
              aria-label="پاک کردن جستجو"
            >
              ✕
            </button>
          )}
        </div>
        {isLoading && <div className="loading">در حال جستجو...</div>}
      </div>
    );
  }
  export default SearchBar;