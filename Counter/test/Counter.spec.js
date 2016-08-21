import React from 'react';
import expect from 'expect';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';

import Counter from '../src/Counter';


describe('Counter', () => {

  it('has an initial value of zero', () => {
    const component = renderIntoDocument(<Counter />);
    const input = scryRenderedDOMComponentsWithTag(component, 'input')[0];
    expect(input.value).toEqual('0');
  });

  it('increases its value by one when pressing the Count button', () => {
    const component = renderIntoDocument(<Counter />);
    const button = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    Simulate.click(button);
    const input = scryRenderedDOMComponentsWithTag(component, 'input')[0];
    expect(input.value).toEqual('1');
  });

});
