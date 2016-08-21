import React from 'react';
import expect from 'expect';
import {createRenderer, renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';

import TemperatureConverter from '../src/TemperatureConverter';


describe('TemperatureConverter', () => {

  describe('Celsius textfield', () => {
    it('has an empty value initially', () => {
      const component = renderIntoDocument(<TemperatureConverter />);
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs[0].value).toBe('');
    });

    it('updates the Fahrenheit value automatically when its value changes', () => {
      const component = renderIntoDocument(<TemperatureConverter />);
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const celsiusInput = inputs[0];
      const fahrenheitInput = inputs[1];
      celsiusInput.value = '10';
      Simulate.change(celsiusInput);
      expect(fahrenheitInput.value).toBe('50');
    });

    it('does not update the Fahrenheit value when a non-numerical string is entered', ()=>{
      const component = renderIntoDocument(<TemperatureConverter />);
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const celsiusInput = inputs[0];
      const fahrenheitInput = inputs[1];
      celsiusInput.value = '5xyz';
      Simulate.change(celsiusInput);
      expect(celsiusInput.value).toBe('5xyz');
      expect(fahrenheitInput.value).toBe('');
    });

    it('lets you delete the last Celsius textfield character', ()=>{
      const component = renderIntoDocument(<TemperatureConverter />);
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const celsiusInput = inputs[0];
      const fahrenheitInput = inputs[1];
      celsiusInput.value = '3';
      Simulate.change(celsiusInput);

      celsiusInput.value = '';
      Simulate.change(celsiusInput);
      expect(celsiusInput.value).toBe('');
      expect(fahrenheitInput.value).toBe('');
    });
  });

  describe('Fahrenheit textfield', () => {
    it('has an empty value initially', () => {
      const component = renderIntoDocument(<TemperatureConverter />);
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs[1].value).toBe('');
    });

    it('updates the Celsius value automatically when its value changes', () => {
      const component = renderIntoDocument(<TemperatureConverter />);
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const celsiusInput = inputs[0];
      const fahrenheitInput = inputs[1];
      fahrenheitInput.value = '50';
      Simulate.change(fahrenheitInput);
      expect(celsiusInput.value).toBe('10');
    });

    it('does not update the Celsius value when a non-numerical string is entered', ()=>{
      const component = renderIntoDocument(<TemperatureConverter />);
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const celsiusInput = inputs[0];
      const fahrenheitInput = inputs[1];
      fahrenheitInput.value = '99sqr';
      Simulate.change(fahrenheitInput);
      expect(celsiusInput.value).toBe('');
      expect(fahrenheitInput.value).toBe('99sqr');
    });

    it('lets you delete the last Fahrenheit textfield character', ()=>{
      const component = renderIntoDocument(<TemperatureConverter />);
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const celsiusInput = inputs[0];
      const fahrenheitInput = inputs[1];
      fahrenheitInput.value = '333';
      Simulate.change(fahrenheitInput);

      fahrenheitInput.value = '';
      Simulate.change(fahrenheitInput);
      expect(fahrenheitInput.value).toBe('');
      expect(celsiusInput.value).toBe('');
    });
  });

});
