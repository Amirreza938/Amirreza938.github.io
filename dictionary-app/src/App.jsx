import { useState } from 'react'
import './styles/App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="header">
        <h1>واژه‌نامه پارسی</h1>
        <button 
          className="theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      <main className="container">
        <div className="search-section">
          <input 
            type="text" 
            className="search-input" 
            placeholder="واژه مورد نظر را جستجو کنید..."
          />
        </div>
        <div className="results-section">
          {/* نتایج جستجو اینجا نمایش داده می‌شود */}
        </div>
      </main>
      <footer className="footer">
        <p>با استفاده از <a href="https://dictionaryapi.dev" target="_blank" rel="noopener noreferrer">Dictionary API</a></p>
      </footer>
    </div>
  )
}

export default App