import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Photo from '../Photo/Photo'
import styled from 'styled-components';
import ProfileImg from '../../images/defaultImg.png'
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    flex-wrap: wrap;
`
const Text = styled.div`
    margin-top:2%;
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
function Profile({}) {
    const [data, setData] = useState("")
    let photos = ""
    const navigate = useNavigate()
    try {
        useEffect(() => {
            async function check() {
                await axios.get('http://localhost:8000/baby').then((res) => {
                    console.log('Profile')
                    setData(res.data.result[0])
                })
            }
            check()
        }, []);
        photos = data.baby_picture
    } catch(err) {
        console.log(err)
        navigate('/baby')
    }

   
    // console.log(data)
    console.log(photos);
    return (
        <Layout>
            {data ?
            <>
            <Photo
               photos={photos}
            />
            <Text >이름 : {data.baby_name}</Text>
            <Text>생년월일 : {moment(data.birth).format('YYYY-MM-DD')}</Text>
            <Button style={{marginBottom:"10%",marginTop:"5%"}}><Link style={{ textDecoration: 'none', color: '#000', }} to="/baby">프로필 등록</Link></Button> </>
            :
            <>Wait</>}
        </Layout>
    )
}
export default {Profile};
// export default Profile;
