import React, {useState, useEffect} from 'react'
import './App.css';
import Router from './routes';
import axios from 'axios';
import sdf from './Component/Main/Profile'
function App() {
  const [data, setData] = useState([]);
  // console.log(sdf.asd);
  useEffect(() => {
    async function check(){
      await axios.get('http://localhost:8000/auth/home').then((res) => {
        console.log('asd')
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