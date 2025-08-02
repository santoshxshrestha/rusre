import { useState, useEffect } from 'react'
import './App.css'

 function App() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    async function fetchData(){
      const response = await fetch('/api/json', {method: 'POST'});
      const json = await response.json();
      setData(json);
    };

    fetchData();
  },[]);
  return (
    <div>
    <h1>
    calling the rust api
    </h1>
    {data ? (
      <>
      <p>Name: {data.name}</p>
      <p>Messge: {data.message}</p>
      </>
    ):(
      <p> loading ... </p>
    )}
    </div>
  )
}


export default App
