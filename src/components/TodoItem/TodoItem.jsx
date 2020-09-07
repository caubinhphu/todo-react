import React from 'react';
import classNames from 'classnames';

import './TodoItem.css';
import '../../assets/fonts/style.css';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      inputValue: '',
    };

    this.onEditItem = this.props.onEditItem;
    this.item = this.props.item;

    this.inputRef = React.createRef();

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleDoubleClick() {
    this.setState({
      isEdit: true,
      inputValue: this.item.content,
    });
  }

  handleOnChange(event) {
    this.setState({
      inputValue: event.currentTarget.value,
    });
  }

  handleOnKeyUp(event) {
    if (event.keyCode === 13) {
      this.editItem();
    } else if (event.keyCode === 27) {
      this.setState({
        isEdit: false,
        inputValue: '',
      });
    }
  }

  editItem() {
    let input = this.state.inputValue;
    input = input.trim();
    this.setState({
      isEdit: false,
      inputValue: '',
    });
    this.onEditItem({ ...this.item, content: input });
  }

  handleClickOutside(event) {
    if (
      this.inputRef?.current &&
      !this.inputRef?.current?.contains(event.target)
    ) {
      this.editItem();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.isEdit !== nextState.isEdit ||
      this.state.inputValue !== nextState.inputValue ||
      this.props.item.isCompleted !== nextProps.item.isCompleted ||
      this.props.item.content !== nextProps.item.content
    ) {
      // console.log(nextProps.item);
      this.item = nextProps.item;
      return true;
    }
    return false;
  }

  render() {
    // console.log('render: ', this.item.content);
    const { onClickItem, onRemoveItem } = this.props;
    const classes = classNames({
      'todo-item': true,
      'todo-item-completed': this.item.isCompleted,
    });
    const { isEdit } = this.state;

    return (
      <li className={classes}>
        {!isEdit && (
          // <img
          //   className="todo-status-img"
          //   src={this.item.isCompleted ? tick : circle}
          //   onClick={() => onClickItem(this.item)}
          //   alt="icon"
          //   width="32px"
          // />
          <div className="completed-icon">
            <i
              className={classNames('icomoon', {
                'icon-checkbox-checked text-green': this.item.isCompleted,
                'icon-checkbox-unchecked': !this.item.isCompleted,
              })}
              onClick={() => onClickItem(this.item)}
            ></i>
          </div>
        )}

        {!isEdit ? (
          <div className="todo-content" onDoubleClick={this.handleDoubleClick}>
            {this.item.content}
          </div>
        ) : (
          <input
            autoFocus
            type="text"
            className="todo-edit"
            value={this.state.inputValue}
            onChange={this.handleOnChange}
            onKeyUp={(event) => this.handleOnKeyUp(event)}
            ref={this.inputRef}
          />
        )}

        {!isEdit && (
          <button
            className="todo-remove-btn"
            type="button"
            onClick={() => onRemoveItem(this.item)}
          >
            X
          </button>
        )}
      </li>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
}

export default TodoItem;
