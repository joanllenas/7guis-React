import expect from 'expect';
import {celsiusToFahrenheit, fahrenheitToCelsius} from '../src/converters';

describe('Celsius to Fahrenheit', () => {

  it('converts with positive Celsius values', () => {
    expect(celsiusToFahrenheit(10)).toEqual(50);
  });

  it('converts with negative Celsius values', () => {
    expect(celsiusToFahrenheit(-10)).toEqual(14);
  });

  it('works with zero Celsius', () => {
    expect(celsiusToFahrenheit(0)).toEqual(32);
  });

});

describe('Fahrenheit to Celsius', () => {

it('converts with positive Fahrenheit values', () => {
    expect(fahrenheitToCelsius(50)).toEqual(10);
  });

  it('converts with negative Fahrenheit values', () => {
    expect(fahrenheitToCelsius(-4)).toEqual(-20);
  });

  it('works with zero Fahrenheit', () => {
    // 0 F equals to -17.77^
    expect(fahrenheitToCelsius(0))
      .toBeGreaterThan(-17.78)
      .toBeLessThan(-17.77);
  });

});
