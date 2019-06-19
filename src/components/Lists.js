import React from 'react'

import styled from 'styled-components'

import ListItem from './ListItem'

const Lists = ({ items, setActiveList }) => (
  <Wrapper>
    {items.map(item => {
      const showTodosList = e => {
        setActiveList(item.id)
      }

      return <ListItem key={item.id} {...item} showTodosList={showTodosList} />
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default Lists
