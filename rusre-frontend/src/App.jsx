import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/random', { method: 'POST' });
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="theme-toggle"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <div className="quote-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading wisdom...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>😢 {error}</p>
            <button onClick={fetchQuote} className="retry-button">
              Try Again
            </button>
          </div>
        ) : data ? (
          <>
            <span className="category-badge">{data.Category}</span>
            <h1 className="quote-text">"{data.Quote}"</h1>
            <p className="quote-author">— {data.Author}</p>
            <button onClick={fetchQuote} className="new-quote-button">
              Get New Quote
            </button>
          </>
        ) : null}
      </div>
      
      <footer className="footer">
        <p>Quote Generator App</p>
      </footer>
    </div>
  );
}

export default App;
