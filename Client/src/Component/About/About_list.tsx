import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
display:flex;
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
                    App
                </ListItem>
                <ListItem>
                    Web
                </ListItem>
                <ListItem>
                    Guide
                </ListItem>
            </List>
        </div>
    )
}

export default About_list