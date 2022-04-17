import React from 'react'
import styled from 'styled-components'
import { Link, Outlet } from 'react-router-dom'

const List = styled.ul`
display:flex;
cursor:pointer;
justify-content: space-around;
font-size: 1.6rem;
list-style: none;
`
const ListItem = styled.li`

`
const StyleLink = styled(Link)`
  text-decoration: none;
  color: #000
`

function About_list() {
    return (
        <div>
            <List>
                <ListItem>
               <StyleLink to='/'>App</StyleLink>
                </ListItem>
                <ListItem>
            <StyleLink to='/about_m'>Web</StyleLink>
                </ListItem>
                <ListItem>
                <StyleLink to='/about_b'>Guide</StyleLink>
                </ListItem>
            </List>
            <Outlet/>
        </div>
    )
}

export default About_list