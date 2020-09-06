import React from 'react';
import './Counter.css';

class Counter extends React.Component {
  constructor(props) {
    console.log('counter constructor');
    super(props);

    this.state = {
      count: 0,
      t: 2,
    };
  }

  increaseCounter() {
    // console.log('counter increase');
    this.setState({
      count: this.state.count + 1,
      test: 1,
    });
  }

  decreaseCounter() {
    // console.log('counter decrease');
    this.setState({
      count: this.state.count - 1,
    });
  }

  render() {
    console.log('counter render');
    return (
      <div className="counter">
        <button onClick={this.decreaseCounter.bind(this)}>-</button>
        <span>{this.state.count}</span>
        <button onClick={() => this.increaseCounter()}>+</button>
      </div>
    );
  }

  componentDidMount() {
    console.log('counter mount');
  }
  componentWillUnmount() {
    console.log('counter unmount');
  }
  componentDidUpdate() {
    console.log('counter update');
    // console.log(this.state);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('counter should update');
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
}

export default Counter;
