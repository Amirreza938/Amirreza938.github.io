function SearchBar({ searchTerm, setSearchTerm, isLoading }) {
    return (
      <div className="search-section">
        <input 
          type="text" 
          className="search-input" 
          placeholder="واژه مورد نظر را جستجو کنید..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading && <div className="loading">در حال جستجو...</div>}
      </div>
    );
  }
  
  export default SearchBar;