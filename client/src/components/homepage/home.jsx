import { useState } from "react";

function Home(){
    const [quote, setQuote] = useState("here goes the quote");
    const [author, setAuthor] = useState("here goes the writer name");
    
    const fetchNewQuote = () => {
        const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" }
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote.text);
        setAuthor(randomQuote.author);
    };
    
    return (
        <div className="container">
            <a href="/search"> <i className="fa-solid fa-magnifying-glass"></i> search</a>
            <div className="quote">{quote}</div>
            <div className="author">{author}</div>

            <div className="button">
                <button className="next" onClick={fetchNewQuote}>next</button>
            </div>
        </div>
    )
}

export default Home;
