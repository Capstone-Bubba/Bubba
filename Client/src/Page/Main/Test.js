import React, { useState } from 'react';
import axios from 'axios';
const data = require('../../sound/logo512.png')
const hungry = require('../../sound/hungry/hungry.wav');
const belly_pain = require('../../sound/belly_pain/belly_pain.wav');
const burping = require('../../sound/burping/burping.wav');
const discomfort = require('../../sound/discomfort/discomfort.wav');
const tired = require('../../sound/tired/tired.wav');

function Test(props) {
    const submitHandler = async (e) => {
        let body = {
            data: e.target.value,
        };


        if(body.data == 'hungry') {
            let audio = new Audio(hungry);
            audio.play().catch(e => {
                console.log(e)
            })
        }
        if(body.data == 'belly_pain') {
            let audio = new Audio(belly_pain);
            audio.play().catch(e => {
                console.log(e)
            })
        }
        if(body.data == 'burping') {
            let audio = new Audio(burping);
            audio.play().catch(e => {
                console.log(e)
            })
        }
        if(body.data == 'discomfort') {
            let audio = new Audio(discomfort);
            audio.play().catch(e => {
                console.log(e)
            })
        }
        if(body.data == 'tired') {
            let audio = new Audio(tired);
            audio.play().catch(e => {
                console.log(e)
            })
        }
        

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
            <button onClick={submitHandler} value='discomfort' >불편함</button>
            <button onClick={submitHandler} value='belly_pain'>배아픔</button>
            <button onClick={submitHandler} value='tired'>피곤함</button>
            <img src={data}/>
        </div>
    )
}

export default Test;