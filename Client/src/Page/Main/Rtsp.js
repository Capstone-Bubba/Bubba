import React, { useState,useEffect } from "react";
import axios from 'axios';


function Rtsp(props) {

    const [data, setData] = useState("")
    console.log(props.user_num)
    useEffect(() => {
        async function check() {
            const params = { num: props.user_num }
            await axios.get('http://localhost:8000/auth/rtsp', { params }
            ).then(async (res) => {
                const _data = await res.data.result.map((rowData) => (
                    {
                        rtsp: rowData.rtsp,
                    }
                ))
                setData(_data)
                console.log(data)
            })
        }
        check()
    }, []);
  return (
    <div>
          <button>주소 받기</button>
        </div>
  )
}

export default Rtsp