import React, { useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import ProfileImg from '../../images/defaultImg.png'

const Layout = styled.div `
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    flex-wrap: wrap;
`
const Text = styled.div `
    margin:5px;
    font-size: 13px;
`
const Button = styled.button `
    margin:15px;
    font-weight: bold;
    width: 150px;
    height: 50px;
    font-size : 15px;
    background: skyblue;
`
function Profile() {
    return (
        <Layout>
            <Avatar
                alt="Remy Sharp"
                src={ProfileImg}
                sx={{ width: 180, height: 180 }}
            />
            <Text>이름 :백찬영</Text>
            <Text>나이 : 19</Text>
            <Button>프로필 등록</Button>


        </Layout>
    )
}

export default Profile
