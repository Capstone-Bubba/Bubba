import React from 'react';
import '../../Style/Notice.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Notice() {
    const [dataFromServer, setData] = useState([]);
    const [btnPage, setBtnPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const PageCount = (page) => {
        setPageCount(page);
    }

    useEffect(async () => {
        await axios.get('http://localhost:8000/notice', {
            params: { page: btnPage }
        })
            .then((response) => {
                setData(response.data.result);
                PageCount(response.data.page.COUNT);
            })
    }, [btnPage]);

    const renderDataLink = dataFromServer.map((data) => {
        return (
                <tr className='line'>
                    <td className='category'>공지</td>
                    <td className='title'>   <Link to={`/notice/detail/${data.nid}`}>{data.n_title} </Link></td>  
                    <td className='author'>{data.n_writer}</td>
                    <td className='createAt'>{data.n_writer_date}</td>
                </tr>
        )
    })

    const renderButton = () => {
        const btn = [];
        for (let i = 1; i <= Math.ceil(pageCount / 10); i++) {
            btn.push(<button onClick={() => {
                setBtnPage(i);
            }}>{i}</button>)
        }
        return btn;
    }

    return (
        <div className='notice_main'>
            <div>
                <h1 className='head'>공지사항</h1>
            </div>
            <table className='header_table'>
                <thead className='notice_header'>
                    <tr>
                        <th>분류</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody className='notice_body'>
                    {renderDataLink}
                    <br></br>
                </tbody>
            </table>
            <div className='pageBtn'>
                {renderButton()}
            </div>
        </div>
    );
}

export default Notice;
