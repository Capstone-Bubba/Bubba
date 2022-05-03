import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Google from '../../Component/Login/Google'

function About_M() {
//   const [isloggedin, setIsLoggedIn] = useState(false)

//   useEffect(() =>{

//     axios.get('http://localhost:3000/auth/google/callback')
//     .then(res=> {
//       console.log(res);
//       const {accessToken} = res.data;
//       console.log(accessToken);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//       setIsLoggedIn(true)

//     })
//   },[])
  return (
    <div>
     <Google/>
    </div>
  )
}

export default About_M
