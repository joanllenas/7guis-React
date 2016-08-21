import React from 'react';
import {celsiusToFahrenheit, fahrenheitToCelsius} from './converters';

class TemperatureConverter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      celsius: '',
      fahrenheit: ''
    };
  }

  celsiusToFahrenheit(evt) {
    var c = evt.target.value;
    if( c === '' && this.state.celsius.length > 0 ){ // scenario: erasing the previously entered value
      this.setState({
        celsius: '',
        fahrenheit: ''
      });
    } else if( Number.isNaN(Number(c)) ) { // scenario: entering non-numeric char.
      this.setState({
        celsius: c,
        fahrenheit: ''
      });
    } else {
      var f = celsiusToFahrenheit(c);
      this.setState({
        celsius: c,
        fahrenheit: f
      });
    }
  }

  fahrenheitToCelsius(evt) {
    var f = evt.target.value;
    if( f === '' && this.state.fahrenheit.length > 0 ){ // scenario: erasing the previously entered value
      this.setState({
        celsius: '',
        fahrenheit: ''
      });
    } else if( Number.isNaN(Number(f)) ) {
      this.setState({
        celsius: '',
        fahrenheit: f
      });
    } else {
      var c = fahrenheitToCelsius(f);
      this.setState({
        celsius: c,
        fahrenheit: f
      });
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.celsius}
          onChange={(e)=>{this.celsiusToFahrenheit(e)}} />
          <span> Celsius = </span>
        <input
          type="text"
          value={this.state.fahrenheit}
          onChange={(e)=>{this.fahrenheitToCelsius(e)}} />
          <span> Fahrenheit</span>
      </div>
    );
  }
}

export default TemperatureConverter;
