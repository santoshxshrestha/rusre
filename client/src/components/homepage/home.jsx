function Home(){
    return (
        <div className = "container">
            <a href="/search"> <i className="fa-solid fa-magnifying-glass"></i> search</a>
            <div className="quote">here goes the quote</div>
            <div className="author">here goes the writer name</div>

            <div className="button">
                <button className="next">next</button>
            </div>
        </div>
    )
}

export default Home;
