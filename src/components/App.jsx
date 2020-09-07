import React from 'react';
import shortid from 'shortid';
import './App.css';

import TodoList from './TodoList/TodoList';
import Header from './Header/Header';
import Footer from './Footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      filterActive: 'all', // all - active - completed
    };

    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.handleClickFilterAll = this.handleClickFilterAll.bind(this);
    this.handleClickFilterActive = this.handleClickFilterActive.bind(this);
    this.handleClickFilterCompleted = this.handleClickFilterCompleted.bind(
      this
    );
    this.handleClickClearCompleted = this.handleClickClearCompleted.bind(this);
  }

  handleClickItem(item) {
    const { todoList } = this.state;
    const index = todoList.findIndex((todo) => todo.id === item.id);
    if (index !== -1) {
      this.setState({
        todoList: [
          ...todoList.slice(0, index),
          { ...todoList[index], isCompleted: !todoList[index].isCompleted },
          ...todoList.slice(index + 1),
        ],
      });
    }
  }

  handleAddNewTodo(input) {
    this.setState({
      todoList: [
        { id: shortid.generate(), content: input, isCompleted: false },
        ...this.state.todoList,
      ],
    });
  }

  handleRemoveItem(item) {
    const { todoList } = this.state;
    const index = todoList.findIndex((todo) => todo.id === item.id);
    if (index !== -1) {
      this.setState({
        todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
      });
    }
  }

  handleToggleAll() {
    const { todoList } = this.state;
    if (todoList.every((todo) => todo.isCompleted)) {
      this.setState({
        todoList: todoList.map((todo) => {
          return { ...todo, isCompleted: false };
        }),
      });
    } else {
      this.setState({
        todoList: todoList.map((todo) => {
          return { ...todo, isCompleted: true };
        }),
      });
    }
  }

  handelEditItem(item) {
    const { todoList } = this.state;
    const index = todoList.findIndex((todo) => todo.id === item.id);
    if (index !== -1) {
      if (item.content) {
        this.setState({
          todoList: [
            ...todoList.slice(0, index),
            item,
            ...todoList.slice(index + 1),
          ],
        });
      } else {
        this.setState({
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        });
      }
    }
  }

  handleClickFilterAll() {
    if (this.state.filterActive !== 'all') {
      this.setState({
        filterActive: 'all',
      });
    }
  }
  handleClickFilterActive() {
    if (this.state.filterActive !== 'active') {
      this.setState({
        filterActive: 'active',
      });
    }
  }
  handleClickFilterCompleted() {
    if (this.state.filterActive !== 'completed') {
      this.setState({
        filterActive: 'completed',
      });
    }
  }
  handleClickClearCompleted() {
    const { todoList } = this.state;
    const newTodoList = todoList.filter((todo) => !todo.isCompleted);
    this.setState({
      todoList: newTodoList,
    });
  }

  render() {
    const { todoList, filterActive } = this.state;
    let todoListFilter = [];
    switch (filterActive) {
      case 'active':
        todoListFilter = todoList.filter((todo) => !todo.isCompleted);
        break;
      case 'completed':
        todoListFilter = todoList.filter((todo) => todo.isCompleted);
        break;
      default:
        todoListFilter = todoList;
        break;
    }
    return (
      <div className="app">
        <h1 className="app-heading">todos</h1>
        <Header onAddNewTodo={(input) => this.handleAddNewTodo(input)} />
        <TodoList
          todoList={todoListFilter}
          onClickItem={(item) => this.handleClickItem(item)}
          onRemoveItem={(item) => this.handleRemoveItem(item)}
          onToggleAll={this.handleToggleAll}
          onEditItem={(item) => this.handelEditItem(item)}
          isCompletedAll={todoList.every((todo) => todo.isCompleted)}
        />
        {this.state.todoList.length > 0 && (
          <Footer
            leftNum={todoList.filter((todo) => !todo.isCompleted).length}
            filterActive={filterActive}
            onClickFilterAll={this.handleClickFilterAll}
            onClickFilterActive={this.handleClickFilterActive}
            onClickFilterCompleted={this.handleClickFilterCompleted}
            onClickClearCompleted={this.handleClickClearCompleted}
          />
        )}
      </div>
    );
  }

  componentDidMount() {
    const todoList = localStorage.getItem('todo-list');
    if (todoList) {
      this.setState({
        todoList: JSON.parse(todoList),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state);
    // console.log(prevState);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('todo-list', JSON.stringify(this.state.todoList));
  }
}

export default App;
