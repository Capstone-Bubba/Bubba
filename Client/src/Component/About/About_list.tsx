import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const List = styled.ul`
display:flex;
cursor:pointer;
justify-content: space-around;
font-size: 1.6rem;
list-style: none;
`
const ListItem = styled.li`

`

function About_list() {
    return (
        <div>
            <List>
                <ListItem>
               <Link to='/about_t'>App</Link>
                </ListItem>
                <ListItem>
            <Link to='/about_m'>Web</Link>
                </ListItem>
                <ListItem>
                <Link to='/about_b'>Guide</Link>
                </ListItem>
            </List>
        </div>
    )
}

export default About_list