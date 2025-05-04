import { useState, useEffect } from 'react'
import './styles/App.css'
import useDebounce from './hooks/useDebounce'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [wordData, setWordData] = useState(null)
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchWord(debouncedSearchTerm)
    } else {
      setWordData(null)
    }
  }, [debouncedSearchTerm])
  
  const searchWord = async (word) => {
    if (!word.trim()) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`)
      
      if (!response.ok) {
        throw new Error('واژه مورد نظر یافت نشد')
      }
      
      const data = await response.json()
      setWordData(data)
    } catch (err) {
      setError(err.message)
      setWordData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="header">
        <h1>واژه‌نامه پارسی</h1>
        <button 
          className="theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'فعال کردن حالت روشن' : 'فعال کردن حالت تاریک'}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading && <div className="loading">در حال جستجو...</div>}
        </div>
        <div className="results-section">
          {error && <div className="error">{error}</div>}
          {!isLoading && !error && wordData && (
            <div className="word-data">
              <h2>{wordData[0].word}</h2>
              {wordData[0].phonetic && (
                <p className="phonetic">{wordData[0].phonetic}</p>
              )}
              
              {wordData[0].meanings.map((meaning, idx) => (
                <div key={idx} className="meaning">
                  <h3 className="part-of-speech">{meaning.partOfSpeech}</h3>
                  <ul className="definitions">
                    {meaning.definitions.map((def, defIdx) => (
                      <li key={defIdx} className="definition">
                        <p>{def.definition}</p>
                        {def.example && <p className="example">"{def.example}"</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {wordData[0].origin && (
                <div className="origin">
                  <h3>ریشه:</h3>
                  <p>{wordData[0].origin}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>با استفاده از <a href="https://dictionaryapi.dev" target="_blank" rel="noopener noreferrer">Dictionary API</a></p>
      </footer>
    </div>
  )
}

export default App