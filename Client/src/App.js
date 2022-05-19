import React, {useState, useEffect} from 'react'
import './App.css';
import Router from './routes';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function check(){
      await axios.get('http://localhost:8000/auth/home').then((res) => {
        // console.log(res.data.result)
        setData(res.data.result)
      })
    }

    check()
  },[])
  return (
    <>
      <Router userData={data[0]}/>
    </>  
  )
}
export default App