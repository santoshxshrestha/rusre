import { useState, useEffect } from 'react'
import './App.css'

 function App() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    async function fetchData(){
      const response = await fetch('/api/random', {method: 'POST'});
      const json = await response.json();
      setData(json);
    };

    fetchData();
  },[]);
  return (
    <div>
    {data ? (
      <>
      <h1> {data.text}</h1>
      <p> {data.author}</p>
      </>
    ):(
      <p> loading ... </p>
    )}
    </div>
  )
}


export default App
