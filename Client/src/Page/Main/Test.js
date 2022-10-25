import React, { useState } from 'react';
import axios from 'axios';
const data = require('../../sound/logo512.png')

function Test(props) {
    // const [data, setData] = useState('');

    const submitHandler = async (e) => {
        // setData(e.target.value);
        let body = {
            data: e.target.value,
        };

        let audio = new Audio(`../../sound/${body.data}/${body.data}.wav`)

        audio.play().catch(e => {
            console.log(e)
        })

        const params = { user_num: props.user_num }

        axios.post('http://localhost:8000/auth/mfccTest', body, { params })
            .then((res) => {
                console.log(res)
            })
    };

    return (
        <div>
            <button onClick={submitHandler} value='hungry'>배고픔</button>
            <button onClick={submitHandler} value='burping'>트림</button>
            <button onClick={submitHandler} value='discomfort'>불편함</button>
            <button onClick={submitHandler} value='belly_pain'>배아픔</button>
            <button onClick={submitHandler} value='tired'>피곤함</button>
            <img src={data}/>
        </div>
    )
}

export default Test;