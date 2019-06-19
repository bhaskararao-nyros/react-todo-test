import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import AddList from './components/AddList'
import Lists from './components/Lists'

function App () {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {

            const lists = todos.getLists()
            const active_list = todos.getActiveList();
            const selectedFilter = todos.selectedFilter();
            const show_todolist = active_list && active_list.name ? true : false;

            return (
              <TodosWrapper>
                { !show_todolist ? 
                <StyledCounter>
                  <AddList onAddList={todos.createList} />
                  <Lists items={lists} setActiveList={todos.setActiveList} />
                </StyledCounter>
                :
                <StyledCounter>
                  <Paragraph> {active_list.name} </Paragraph>

                  <AddTodo onAddTodo={todos.createTodo} />

                  <TodoList 
                    name={active_list.name} 
                    items={active_list.todos} 
                    toggleComplete={todos.toggleComplete}
                    onFilter={todos.onFilter} 
                    selectedFilter={selectedFilter} 
                  /> 

                </StyledCounter>
                }
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: grid;
  flex-direction: column;
`

const StyledCounter = styled.div`
  /* ... */
`
const Paragraph = styled.p`
  font-size: 30px;
  font-weight: bold;
`

export default App
