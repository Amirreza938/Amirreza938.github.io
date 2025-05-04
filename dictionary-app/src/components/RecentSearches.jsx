function RecentSearches({ searches, onSearchClick }) {
    if (!searches || searches.length === 0) return null;
    
    return (
      <div className="recent-searches">
        <h3>جستجوهای اخیر</h3>
        <div className="search-tags">
          {searches.map((search, index) => (
            <button 
              key={index} 
              className="search-tag" 
              onClick={() => onSearchClick(search)}
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default RecentSearches;