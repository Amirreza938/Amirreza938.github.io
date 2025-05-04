function Header({ darkMode, toggleDarkMode }) {
    return (
      <header className="header">
        <h1>English Dictionary</h1>
        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode}
          aria-label={darkMode ? 'Enable light mode' : 'Enable dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
    );
  }
  
  export default Header;