import React, { PropTypes } from 'react';

const propTypes = {
  initialCount: PropTypes.number
};

const defaultProps = {
  initialCount: 0
};

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: this.props.initialCount
    };
  }

  incrementCount() {
    this.setState({
      count: this.state.count+1
    });
  }

  render() {
    return (
    	<div>
    		<input type="text" value={this.state.count} readOnly />
    		<button onClick={(e)=>{this.incrementCount()} }>Count</button>
    	</div>
    );
  }
}

Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

export default Counter;
