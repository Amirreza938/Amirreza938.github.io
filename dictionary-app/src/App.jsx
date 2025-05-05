import { useState, useEffect } from 'react'
import './styles/App.css'
import useDebounce from './hooks/useDebounce'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WordDefinition from './components/WordDefinition'
import RecentSearches from './components/RecentSearches'
import LoadingState from './components/LoadingState'
import EmptyState from './components/EmptyState'
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
      setError(null)
    }
  }, [debouncedSearchTerm])
  
  const searchWord = async (word) => {
    if (!word.trim()) return
    
    setIsLoading(true)
    setError(null)
    
    // Scroll to top of container
    const container = document.querySelector('.container')
    if (container) {
      container.scrollTop = 0
    }
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`)
      
      if (!response.ok) {
        throw new Error('Word not found')
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

  const showRecents = !isLoading && !wordData && !error && recentSearches.length > 0
  const showEmptyState = !isLoading && !wordData && !error && !searchTerm && recentSearches.length === 0

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          isLoading={isLoading} 
        />
        
        {showRecents && (
          <RecentSearches 
            searches={recentSearches} 
            onSearchClick={handleRecentSearchClick} 
          />
        )}
        
        <div className="results-section">
          {isLoading && <LoadingState />}
          {error && <div className="error">{error}</div>}
          {!isLoading && !error && wordData && (
            <WordDefinition wordData={wordData} />
          )}
          {showEmptyState && <EmptyState />}
        </div>
      </main>
      <Footer />
    </div>
  )
}

// App implements:
// - Theme switching (dark/light mode)
// - Search functionality with debounce
// - Recent searches tracking
// - Error handling
// - Responsive layout

export default App