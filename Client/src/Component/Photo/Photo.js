import { Avatar } from '@mui/material';
import React from 'react'

function photo({photos}) {
    // const imgUrl = "/Image/baby/" + photos;
    const imgURL = 'http://localhost:8000/static/images/baby/' + photos
    return (
        <div>
            <Avatar
                alt="아기 사진"
                src={imgURL}
                sx={{ width: 180, height: 180 }}
            />
        </div>
    )
}

export default photo
