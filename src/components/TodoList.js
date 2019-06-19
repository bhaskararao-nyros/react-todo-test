import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'



const TodoList = ({ items, name, toggleComplete, onFilter, selectedFilter }) => (
  <Wrapper>
    <select defaultValue={selectedFilter} onChange={onFilter}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>

    {items.map(item => {
      const onComplete = e => {
        toggleComplete(item.id)
      }

      return <TodoItem key={item.id} {...item} onComplete={onComplete} />
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
