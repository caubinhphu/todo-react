import React from 'react';
import shortid from 'shortid';
import './App.css';

import TodoList from './TodoList/TodoList';
import Header from './Header/Header';
// import Clock from './Clock/Clock';
// import Counter from './Counter/Counter';

class App extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   showCounter: true,
    // };

    this.state = {
      todoList: [],
    };
  }

  // toggleCounter() {
  //   this.setState({ showCounter: !this.state.showCounter });
  // }

  handleClickItem(item) {
    // return (event) => {
    //   console.log(item, event);
    // };
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

  render() {
    return (
      <div className="App">
        <Header onAddNewTodo={(input) => this.handleAddNewTodo(input)} />
        <TodoList
          todoList={this.state.todoList}
          onClickItem={(item) => this.handleClickItem(item)}
          onRemoveItem={(item) => this.handleRemoveItem(item)}
          onToggleAll={() => this.handleToggleAll()}
          onEditItem={(item) => this.handelEditItem(item)}
          isCompletedAll={this.state.todoList.every((todo) => todo.isCompleted)}
        />
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
    console.log(this.state);
    console.log(prevState);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('todo-list', JSON.stringify(this.state.todoList));
  }
}

export default App;
