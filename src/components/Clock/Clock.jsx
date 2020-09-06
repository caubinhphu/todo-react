import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    console.log('CLock did mount');
    this.timerID = setInterval(() => {
      this.setState({ time: new Date() });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    console.log('clock render');
    return <div>{this.state.time.toLocaleString()}</div>;
  }
}

export default Clock;
