import React from 'react';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
    this.onAddNewTodo = this.props.onAddNewTodo;
  }

  onChange(event) {
    this.setState({
      inputValue: event.currentTarget.value,
    });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      let input = this.state.inputValue;
      if (input) {
        input = input.trim();
        this.onAddNewTodo(input);
        this.setState({
          inputValue: '',
        });
      }
    }
  }

  render() {
    return (
      <div className="Header">
        <input
          type="text"
          placeholder="Enter new todo"
          onKeyUp={(event) => this.handleKeyUp(event)}
          value={this.state.inputValue}
          onChange={(event) => this.onChange(event)}
        />
      </div>
    );
  }
}

export default Header;
