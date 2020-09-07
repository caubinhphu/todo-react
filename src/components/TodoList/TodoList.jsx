import React from 'react';
import classNames from 'classnames';
import TodoItem from '../TodoItem/TodoItem';

import './TodoList.css';

class TodoList extends React.Component {
  render() {
    // console.log('todo list render');
    const {
      todoList,
      isCompletedAll,
      onClickItem,
      onRemoveItem,
      onToggleAll,
      onEditItem,
    } = this.props;
    return (
      todoList.length !== 0 && (
        <div className="main">
          <label
            htmlFor="toggle-all"
            className={classNames('toggle-all-label', {
              'toggle-all-label-all': isCompletedAll,
            })}
            onClick={onToggleAll}
          >
            {/* <img src={downArrow} alt="toggle-all-img" width="25px" /> */}
          </label>
          <input type="checkbox" className="toggle-all" id="toggle-all" />
          <ul className="todo-list">
            {todoList.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onClickItem={(item) => onClickItem(item)}
                onRemoveItem={(item) => onRemoveItem(item)}
                onEditItem={(item) => onEditItem(item)}
              />
            ))}
          </ul>
        </div>
      )
    );
  }
}

export default TodoList;
