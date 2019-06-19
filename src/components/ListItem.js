import React from 'react'

import styled from 'styled-components'

const ListItem = ({ name, showTodosList }) => (
  <Wrapper>
    <code>
      <Text onClick={showTodosList}>{name}</Text>
    </code>
  </Wrapper>
)

const Wrapper = styled.p`
  font-size: 24px;
  cursor: pointer;
`

const Text = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`

export default ListItem
