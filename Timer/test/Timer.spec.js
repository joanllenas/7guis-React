import React from 'react';
import expect from 'expect';
import {createRenderer, renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';

import Timer from '../src/Timer';


describe('Timer', () => {

  describe('Label', ()=>{
    it('displays the elapsed time as a numerical value', ()=>{
      const component = renderIntoDocument(
        <Timer
          initialDuration={ 10000 }
          initialElapsed={ 2400 }
          autoStart={ false } />
      );
      component.elapsedChanged();
      const label = scryRenderedDOMComponentsWithTag(component, 'span')[0];
      expect(label.textContent).toBe('2.5s');
    });
  });

  it('stops when elapsed time >= duration', ()=>{
    const component = renderIntoDocument(
      <Timer
        initialDuration={ 2500 }
        initialElapsed={ 2400 }
        autoStart={ false } />
    );
    const stopTimerSpy = expect.spyOn(component, 'stopTimer');
    component.elapsedChanged();
    expect(stopTimerSpy).toHaveBeenCalled();
    stopTimerSpy.restore();
  });

  describe('While Slider is changing', ()=>{
    it('adjusts the duration value when changed', ()=>{
      const component = renderIntoDocument(
        <Timer
          initialDuration={ 2500 }
          initialElapsed={ 0 }
          autoStart={ false } />
      );
      const slider = scryRenderedDOMComponentsWithTag(component, 'input')[0];
      component.elapsedChanged();
      expect(slider.value).toBe('2500');
      slider.value = '10000';
      Simulate.change(slider);
      expect(component.state.duration).toBe(10000);
    });

    it('stops the Timer when the duration <= elapsed time', ()=>{
      const component = renderIntoDocument(
        <Timer
          initialDuration={ 10000 }
          initialElapsed={ 2400 }
          autoStart={ false } />
      );
      const stopTimerSpy = expect.spyOn(component, 'stopTimer');
      const slider = scryRenderedDOMComponentsWithTag(component, 'input')[0];
      slider.value = '2400';
      Simulate.change(slider);
      expect(stopTimerSpy).toHaveBeenCalled();
      stopTimerSpy.restore();
    });

    it('starts again the Timer when duration > elapsed time', ()=>{
      const component = renderIntoDocument(
        <Timer
          initialDuration={ 5000 }
          initialElapsed={ 4900 }
          autoStart={ false } />
      );
      const slider = scryRenderedDOMComponentsWithTag(component, 'input')[0];
      const stopTimerSpy = expect.spyOn(component, 'stopTimer').andCallThrough();
      const startTimerSpy = expect.spyOn(component, 'startTimer');

      component.elapsedChanged();
      expect(stopTimerSpy).toHaveBeenCalled();
      stopTimerSpy.restore();

      slider.value = '10000';
      Simulate.change(slider);
      expect(startTimerSpy).toHaveBeenCalled();
      startTimerSpy.restore();
    });
  });

  describe('Progress', ()=>{
    it('adjusts its filled amount while the Slider value is changing', ()=>{
      const component = renderIntoDocument(
        <Timer
          initialDuration={ 10000 }
          initialElapsed={ 4900 }
          autoStart={ false } />
      );
      const slider = scryRenderedDOMComponentsWithTag(component, 'input')[0];
      const progress = scryRenderedDOMComponentsWithTag(component, 'progress')[0];
      component.elapsedChanged();
      expect(progress.value).toBe(5000);

      slider.value = '4000';
      Simulate.change(slider);
      component.elapsedChanged();
      expect(progress.value).toBe(4000);
    });
  });

  describe('Reset button', ()=>{
    it('resets elapsed time to zero when clicked', ()=>{
      const component = renderIntoDocument(
        <Timer
          initialDuration={ 10000 }
          initialElapsed={ 5350 }
          autoStart={ false } />
      );
      const resetButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
      Simulate.click(resetButton);
      expect(component.state.elapsed).toBe(0);
    });
  });
});
