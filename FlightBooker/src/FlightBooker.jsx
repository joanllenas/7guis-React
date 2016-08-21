import React, { PropTypes } from 'react';
import {toShortDate, fromShortDate} from './dateUtils';

const propTypes = {
  initialFromDate: PropTypes.string,
  initialToDate: PropTypes.string
};

const defaultProps = {
  initialFromDate: '01.01.2016',
  initialToDate: '01.01.2016'
};

const ONE_WAY_FLIGHT = 'one-way-flight';
const RETURN_FLIGHT = 'return-flight';
const INVALID_DATE_COLOR = 'red';

class FlightBooker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fromDate: this.props.initialFromDate,
      toDate: this.props.initialToDate,
      flightType: ONE_WAY_FLIGHT
    };
  }

  bookFlight() {
    this.setState({
      bookedMessage: `You have booked a ${this.state.flightType} flight on ${this.state.fromDate}.`
    });
  }

  fromDateChanged(e) {
    this.setState({
      fromDate: e.target.value
    });
  }

  toDateChanged(e) {
    this.setState({
      toDate: e.target.value
    });
  }

  flightTypeChanged(e) {
    this.setState({
      flightType: e.target.value
    });
  }

  toDateIsDisabled(){
    return this.state.flightType === ONE_WAY_FLIGHT;
  }

  fromDateBgColor(){
    return fromShortDate(this.state.fromDate) ? '' : INVALID_DATE_COLOR;
  }

  toDateBgColor(){
    return !this.toDateIsDisabled() && !fromShortDate(this.state.toDate) ? INVALID_DATE_COLOR : '';
  }

  bookActionIsDisabled(){
    const fromDate = fromShortDate(this.state.fromDate);
    const toDate = fromShortDate(this.state.toDate);
    if(!fromDate || (this.state.flightType === RETURN_FLIGHT && !toDate)) {
      return true;
    }
    return this.state.flightType === RETURN_FLIGHT && toDate < fromDate;
  }

  render() {
    return (
    	<div style={ {width: '200px'} }>
        <select
          size="1"
          style={ {width: '100%'} }
          select={ this.state.flightType }
          onChange={ (e)=>{this.flightTypeChanged(e)} }>
          <option value={ ONE_WAY_FLIGHT }>One way flight</option>
          <option value={ RETURN_FLIGHT }>Return flight</option>
        </select>
    		<input
          type="text"
          style={ {width: '100%', backgroundColor:this.fromDateBgColor.call(this)} }
          value={ this.state.fromDate }
          onChange={ (e)=>{this.fromDateChanged(e)} }
          placeholder="dd.mm.yyyy" />
        <input
          type="text"
          style={ {width: '100%', backgroundColor:this.toDateBgColor.call(this)} }
          value={ this.state.toDate }
          onChange={ (e)=>{this.toDateChanged(e)} }
          disabled={ this.toDateIsDisabled.call(this) }
          placeholder="dd.mm.yyyy" />
    		<button
          onClick={ (e)=>{this.bookFlight()} }
          style={ {width: '100%'} }
          disabled={ this.bookActionIsDisabled.call(this) }>
          Book
        </button>
        <span>{this.state.bookedMessage}</span>
    	</div>
    );
  }
}

FlightBooker.propTypes = propTypes;
FlightBooker.defaultProps = defaultProps;

export default FlightBooker;
