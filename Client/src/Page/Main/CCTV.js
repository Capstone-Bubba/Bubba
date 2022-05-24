// import axios from 'axios'
// import React, {useState, useEffect} from 'react'

// function CCTV() {
//   const [data, setData] = useState();
//   useEffect(() => {
//     async function check() {
//         await axios.get('http://localhost:8000/cctv').then((res) => {
//             console.log(res)
//             setData(res)
//         })
//     }
//     // console.log(data)
//     check()
// }, []);
//     const img = document.getElementById('img'),
//         socket = io('');
//     socket.on('data', function(data) {
//         img.src = 'data:image/j peg;base64,' + data;
//     });
//    socket.on('user.count', function(number){
//       document.getElementById('user-count').innerHTML=number;
//    });
//   return (
//     <div>
//       <h1>접속자 수 : <span id='user-count'>?</span></h1>
//       <img id="img"/>
//     </div>
//   )
// }

// export default CCTV
