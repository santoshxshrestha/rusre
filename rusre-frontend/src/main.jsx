import React, { useState, useEffect } from 'react';

const QuotesApp = () => {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllQuotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/quotes');
      if (!response.ok) throw new Error('Failed to fetch quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/quotes/random');
      if (!response.ok) throw new Error('Failed to fetch random quote');
      const data = await response.json();
      setRandomQuote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
         Quotes App
      </h1>

      {error && (
        <div style={{ 
          background: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '20px',
          border: '1px solid #ffcdd2'
        }}>
          Error: {error}
        </div>
      )}

      <div style={{ 
        background: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#555', marginBottom: '15px' }}>Random Quote</h2>
        <button 
          onClick={fetchRandomQuote}
          disabled={loading}
          style={{
            background: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            marginBottom: '20px'
          }}
        >
          {loading ? 'Loading...' : 'Get Random Quote'}
        </button>

        {randomQuote && (
          <div style={{ 
            background: 'white', 
            padding: '15px', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <p style={{ fontSize: '18px', fontStyle: 'italic', margin: '0 0 10px 0' }}>
              "{randomQuote.text}"
            </p>
            <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>
              — {randomQuote.author}
            </p>
          </div>
        )}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#555', margin: '0' }}>All Quotes ({quotes.length})</h2>
          <button 
            onClick={fetchAllQuotes}
            disabled={loading}
            style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {loading && quotes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Loading quotes...
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {quotes.map(quote => (
              <div 
                key={quote.id}
                style={{
                  background: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <p style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.5', 
                  margin: '0 0 10px 0',
                  fontStyle: 'italic'
                }}>
                  "{quote.text}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#666', fontWeight: 'bold' }}>
                    — {quote.author}
                  </span>
                  <span style={{ fontSize: '12px', color: '#999' }}>
                    ID: {quote.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        padding: '20px', 
        borderTop: '1px solid #e0e0e0',
        color: '#666'
      }}>
        <p>React + Actix Web Integration Test</p>
        <p style={{ fontSize: '12px' }}>
          API running on localhost:8080 | Frontend on localhost:3000/5173
        </p>
      </div>
    </div>
  );
};

export default QuotesApp;
