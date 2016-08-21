import React, { PropTypes } from 'react';

const propTypes = {
  initialElapsed: PropTypes.number,
  initialDuration: PropTypes.number,
  autoStart: PropTypes.bool
};

const defaultProps = {
  initialElapsed: 0,
  initialDuration: 10000,
  autoStart: true
};

const TIME_INCREMENT = 100;

class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      elapsed: this.props.initialElapsed,
      duration: this.props.initialDuration
    };
    this.timer = null;
    if(this.props.autoStart) {
      this.startTimer();
    }
  }

  startTimer() {
    this.timer = setInterval(
      this.elapsedChanged.bind(this),
      TIME_INCREMENT
    );
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  elapsedChanged() {
    const newElapsed = this.state.elapsed + TIME_INCREMENT;
    this.setState({
      elapsed: Math.min(
          newElapsed,
          this.state.duration
        )
    });
    this.checkTimerConstraints(this.state.duration, newElapsed);
  }

  durationChanged(e) {
    const newDuration = parseInt(e.target.value,10);
    this.setState({
      duration: newDuration
    });
    this.checkTimerConstraints(newDuration, this.state.elapsed);
  }

  checkTimerConstraints(duration, elapsed) {
    if(duration <= elapsed) {
      this.stopTimer();
    } else if(this.timer === null && duration > elapsed) {
      this.startTimer();
    }
  }

  resetTimer() {
    this.setState({
      elapsed: 0
    });
    if(this.timer === null) {
      this.startTimer();
    }
  }

  elapsedToSeconds() {
    return this.state.elapsed / 1000;
  }

  render() {
    return (
      <div>
        <div>
          Elapsed time: <progress
          max={ this.state.duration }
          value={ this.state.elapsed } />
        </div>
        <div>
          <span>{ this.elapsedToSeconds.call(this) }s</span>
        </div>
        <div>
          Duration: <input type="range"
            step ="100"
            min="1000"
            max="10000"
            value={ this.state.duration }
            onChange={ (e)=>{this.durationChanged(e)} } />
        </div>
        <button onClick={ ()=>{this.resetTimer()} }>Reset</button>
      </div>
    );
  }
}

Timer.propTypes = propTypes;
Timer.defaultProps = defaultProps;

export default Timer;
