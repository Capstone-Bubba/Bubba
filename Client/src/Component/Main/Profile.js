import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import ProfileImg from '../../images/defaultImg.png'
import moment from 'moment';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    flex-wrap: wrap;
`
const Text = styled.div`
    margin:5px;
    font-size: 13px;
`
const Button = styled.button`
    margin:15px;
    font-weight: bold;
    width: 150px;
    height: 50px;
    font-size : 15px;
    background: skyblue;
`
function Profile() {
    const [data, setData] = useState("")
    useEffect(() => {
        async function check() {
            await axios.get('http://localhost:8000/baby').then((res) => {
                console.log(res.data.result)
                setData(res.data.result)
            })
        }
        console.log(data)
        check()
    }, [])
    const imgUrl = "/images/baby"+data[0].baby_picture
    console.log(imgUrl)
    return (
        <Layout>
            {data ?
            <>
            <Avatar
                alt="아기 사진"
                src={imgUrl}
                sx={{ width: 180, height: 180 }}
            />
            <Text >이름 : {data[0].baby_name}</Text>
            <Text>생년월일 : {moment(data[0].birth).format('YYYY-MM-DD')}</Text>
            <Button>프로필 등록</Button> </>
            :
            <>Wait</>}
            


        </Layout>
    )
}

export default Profile
