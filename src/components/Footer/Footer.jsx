import React from 'react';

import Button from '../Button/Button';

import './Footer.css';

class Footer extends React.Component {
  render() {
    const {
      leftNum,
      onClickClearCompleted,
      onClickFilterAll,
      onClickFilterActive,
      onClickFilterCompleted,
      filterActive,
    } = this.props;
    return (
      <div className="footer">
        <div className="footer-item-left">
          <small>{`${leftNum} ${leftNum === 1 ? 'item' : 'items'} left`}</small>
        </div>
        <div className="footer-item-filter">
          <Button active={filterActive === 'all'} onClick={onClickFilterAll}>
            All
          </Button>
          <Button
            active={filterActive === 'active'}
            onClick={onClickFilterActive}
          >
            Active
          </Button>
          <Button
            active={filterActive === 'completed'}
            onClick={onClickFilterCompleted}
          >
            Completed
          </Button>
        </div>
        <div className="footer-item-remove">
          <Button onClick={onClickClearCompleted}>Clear completed</Button>
        </div>
      </div>
    );
  }
}

export default Footer;
