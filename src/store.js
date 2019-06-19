import { Container } from 'unstated'

const defaultState = {
  lists: [{
    id: 1,
    name: "sample",
    todos: [ 
      {
        id: 1,
        completed: false,
        text: 'Read README'
      },
      {
        id: 2,
        completed: false,
        text: 'Add one todo'
      },
      {
        id: 3,
        completed: false,
        text: 'Add filters'
      },
      {
        id: 4,
        completed: false,
        text: 'Add multiple lists'
      },
      {
        id: 5,
        completed: false,
        text: 'Optional: add tests'
      }
    ]
  }],
  active_list: {},
  selected_filter: 'all'
}

class TodosContainer extends Container {
  constructor (props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage () {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getLists () {
    return this.state.lists
  }

  getActiveList () {
    return this.state.active_list
  }

  selectedFilter () {
    return this.state.selected_filter
  }

  setActiveList = id => {
    const active_list = this.state.lists.find(i => i.id === id)
    this.setState({ 
      active_list: active_list
    });
  }

  toggleComplete = async id => {
    const item = this.state.active_list.todos.find(i => i.id === id)
    const completed = !item.completed

    await this.setState(state => {
      var active_list = state.active_list;
      const updated_todos = state.active_list.todos.map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })

      active_list.todos = updated_todos;

      return { 'active_list': active_list }
    })

    this.syncStorage()
  }

  createTodo = async text => {
    await this.setState(state => {

      const item = {
        completed: false,
        text,
        id: state.active_list.todos.length + 1
      }

      var active_list = state.active_list;
      active_list.todos = active_list.todos.concat(item);

      return { active_list }
    })

    this.syncStorage()
  }

  createList = async name => {
    await this.setState(state => {

      const item = {
        id: state.lists.length + 1,
        name,
        todos: []
      }

      const lists = state.lists.concat(item);

      return { lists }
    })

    this.syncStorage()
  }

  onFilter = async e => {

    let value = e.target.value;

    var storage = this.readStorage()

    var active_list = storage.active_list;

    await this.setState(state => {

      var filtered_todos = active_list.todos.filter(item => {
        if (value === 'completed' && item.completed === true) {
          return item;
        }
        if (value === 'active' && item.completed === false) {
          return item;
        }
        if (value === 'all') {
          return item;
        }
      });

      active_list.todos = filtered_todos;

      return { active_list }

    });
  }
}

export default TodosContainer
