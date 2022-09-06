import React, { useState, useEffect } from "react";
import axios from 'axios';


function Rtsp(props) {
    const [Adress, setAdress] = useState("");
    console.log(props.user_num)
    // useEffect(() => {
    //     async function check() {
    //         const params = { num: props.user_num }
    //         await axios.post('http://localhost:8000/auth/rtsp', { params }
    //         ).then(async (res) => {
    //             const _data = await res.data.result.map((rowData) => (
    //                 {
    //                     rtsp: rowData.rtsp,
    //                 }
    //             ))
    //             setData(_data)
    //             console.log(data)
    //         })
    //     }
    //     check()
    // }, []);
    const adressHandler = (e) => {
        e.preventDefault();
        setAdress(e.target.value);
      };

    const submitHandler = (e) => {
        e.preventDefault();
       
        let body = {
          adress: Adress,
        };
    const params = {user_num: props.user_num}
        axios
          .post("http://localhost:8000/auth/rtsp", body , {params} )
          .then((res) => console.log(res));
      };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <form
                onSubmit={submitHandler}
                style={{ display: "flex", flexDirection: "Column" }}
            >
                <label>주소 입력</label>
                <input value={Adress} onChange={adressHandler}></input>
             
                <button style={{marginTop: "15%"}}type="submit">주소 받기</button>
            </form>
        </div>
    )
}

export default Rtsp