import { useState, useEffect } from 'react'
import './styles/App.css'
import useDebounce from './hooks/useDebounce'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WordDefinition from './components/WordDefinition'
import RecentSearches from './components/RecentSearches';
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [wordData, setWordData] = useState(null)
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', [])
  
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
      
      // Add to recent searches
      addToRecentSearches(word.trim())
    } catch (err) {
      setError(err.message)
      setWordData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const addToRecentSearches = (word) => {
    setRecentSearches(prev => {
      // If the word already exists, remove it
      const filtered = prev.filter(item => item.toLowerCase() !== word.toLowerCase())
      
      // Add the word to the beginning of the array
      // and keep only the latest 5 searches
      return [word, ...filtered].slice(0, 5)
    })
  }

  const handleRecentSearchClick = (word) => {
    setSearchTerm(word)
  }

  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          isLoading={isLoading} 
        />
        
        {!isLoading && !wordData && !error && (
          <RecentSearches 
            searches={recentSearches} 
            onSearchClick={handleRecentSearchClick} 
          />
        )}
        
        <div className="results-section">
          {error && <div className="error">{error}</div>}
          {!isLoading && !error && wordData && (
            <WordDefinition wordData={wordData} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App