function Header({ darkMode, toggleDarkMode }) {
    return (
      <header className="header">
        <h1>واژه‌نامه پارسی</h1>
        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode}
          aria-label={darkMode ? 'فعال کردن حالت روشن' : 'فعال کردن حالت تاریک'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
    );
  }
  
  export default Header;