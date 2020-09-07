import React from 'react';
import classNames from 'classnames';

import './Button.css';

class Button extends React.Component {
  render() {
    const { active, onClick, children } = this.props;
    return (
      <button
        type="button"
        className={classNames('button', {
          'button-active': active,
        })}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

export default Button;
