import React from 'react';
import expect from 'expect';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';

import FlightBooker from '../src/FlightBooker';


describe('FlightBooker', () => {

  it('displays the assigned initial date initially', () => {
      const component = renderIntoDocument(
        <FlightBooker
          initialFromDate='01.01.2016'
          initialToDate='01.01.2016' />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs[0].value).toBe('01.01.2016');
      expect(inputs[1].value).toBe('01.01.2016');
  });

  it('disables the Return Date textfield when "one-way-flight" is selected', () => {
      const component = renderIntoDocument(
        <FlightBooker
          initialFromDate='01.01.2016'
          initialToDate='01.01.2016' />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs[1].disabled).toBe(true);
  });

  it('disables the Book button when the combobox has the value "return-flight" and the return date is strictly before the start date', ()=>{
    const component = renderIntoDocument(
      <FlightBooker
          initialFromDate='02.01.2016'
          initialToDate='01.01.2016' />
    );
    const combo = scryRenderedDOMComponentsWithTag(component, 'select')[0];
    combo.value = 'return-flight';
    Simulate.change(combo);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].disabled).toBe(true);
  });

  describe('fromDate input is not disabled and has an ill-formatted date', ()=>{
    let component;
    beforeEach(()=>{
      component = renderIntoDocument(
        <FlightBooker
            initialFromDate='abc'
            initialToDate='01.01.2016' />
      );
    });
    it('disables the Book button', ()=>{
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
      expect(buttons[0].disabled).toBe(true);
    });
    it('paints fromDate input red', ()=>{
      const fromDateInput = scryRenderedDOMComponentsWithTag(component, 'input')[0];
      expect(fromDateInput.style.backgroundColor).toBe('red');
    });
  });

  describe('toDate input is not disabled and has an ill-formatted date', ()=>{
    let component;
    beforeEach(()=>{
      component = renderIntoDocument(
        <FlightBooker
            initialFromDate='01.01.2016'
            initialToDate='abc' />
      );
      const combo = scryRenderedDOMComponentsWithTag(component, 'select')[0];
      combo.value = 'return-flight';
      Simulate.change(combo);
    });
    it('disables the Book button', ()=>{
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
      expect(buttons[0].disabled).toBe(true);
    });
    it('paints toDate input red', ()=>{
      const toDateInput = scryRenderedDOMComponentsWithTag(component, 'input')[1];
      expect(toDateInput.style.backgroundColor).toBe('red');
    });
  });

  it('displays a message informing the user of his selection when clicking the Book button', ()=>{
    const component = renderIntoDocument(
      <FlightBooker
          initialFromDate='01.01.2016'
          initialToDate='01.01.2016' />
    );
    const bookButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    Simulate.click(bookButton);
    const messageSpan = scryRenderedDOMComponentsWithTag(component, 'span')[0];
    expect(messageSpan.textContent).toBe('You have booked a one-way-flight flight on 01.01.2016.');
  });

});
