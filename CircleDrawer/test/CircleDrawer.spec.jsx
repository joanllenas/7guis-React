import React from 'react';
import expect from 'expect';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import CircleDrawer, {DEFAULT_CIRCLE_RADIUS} from '../src/CircleDrawer';

function createSVGMouseEvent(point) {
  return {
    nativeEvent: {
      offsetX: point.x,
      offsetY: point.y
    }
  };
}

function mockGenerateId() {
  var cont = 0;
  CircleDrawer.__Rewire__('generateUniqueId', function(){
    return "id-" + (cont++);
  });
}

describe('CircleDrawer', () => {

  it("it is empty initially", ()=>{
    const component = renderIntoDocument(<CircleDrawer />);
    expect(component.state.circles).toEqual([]);
    expect(component.state.undos).toEqual([]);
    expect(component.state.redos).toEqual([]);
    expect(component.state.selectedCircleId).toBe(null);
    expect(component.state.changingDiameter).toBe(false);
  });

  describe('when clicking on an empty zone', ()=> {
    it("adds a new circle", () => {
      const component = renderIntoDocument(<CircleDrawer />);
      component.handleClick(createSVGMouseEvent({x:100,y:100}));
      expect(component.state.circles.length).toBe(1);
      component.handleClick(createSVGMouseEvent({x:200,y:200}));
      expect(component.state.circles.length).toBe(2);
    });
    it("adds to the undos history a new fixed radius circle whose center is the left-clicked point", ()=>{
      mockGenerateId();
      const component = renderIntoDocument(<CircleDrawer />);
      component.handleClick(createSVGMouseEvent({x:33,y:29}));
      component.handleClick(createSVGMouseEvent({x:150,y:150}));
      expect(component.state.undos.length).toBe(2);
      expect(component.state.undos).toEqual([
        [],
        [{id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS}]
      ]);
    });
  });

  describe('when clicking on a circle', ()=> {
    it('selects the circle', ()=>{
        mockGenerateId();
        const component = renderIntoDocument(<CircleDrawer />);
        component.handleClick(createSVGMouseEvent({x:100,y:100}));
        expect(component.state.selectedCircleId).toBe(null);
        component.handleClick(createSVGMouseEvent({x:100,y:100}));
        expect(component.state.selectedCircleId).toBe('id-0');
    });
  });

  describe('when clicking on a circle three times in a row', ()=> {
    it('toggles the change diameter dialog', ()=>{
      const component = renderIntoDocument(<CircleDrawer />);
      component.handleClick(createSVGMouseEvent({x:100,y:100}));
      expect(component.state.changingDiameter).toBe(false);
      component.handleClick(createSVGMouseEvent({x:100,y:100}));
      expect(component.state.changingDiameter).toBe(false);
      component.handleClick(createSVGMouseEvent({x:100,y:100}));
      expect(component.state.changingDiameter).toBe(true);
    });
    it('changes circle diameter', () => {
      const component = renderIntoDocument(<CircleDrawer />);
      component.handleClick(createSVGMouseEvent({x:100,y:100}));
      component.handleClick(createSVGMouseEvent({x:100,y:110}));
      component.handleClick(createSVGMouseEvent({x:100,y:110}));
      component.changeDiameter(345);
      const selectedCircle = component.state.circles[0];
      expect(selectedCircle.rad).toBe(345);
    });
  });

  it('undos actions', ()=>{
    mockGenerateId();
    const component = renderIntoDocument(<CircleDrawer />);

    component.handleClick(createSVGMouseEvent({x:33,y:29}));
    expect(component.state.undos).toEqual([
      []
    ]);

    component.handleClick(createSVGMouseEvent({x:150,y:150}));
    expect(component.state.undos).toEqual([
      [],
      [{id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS}]
    ]);

    component.handleClick(createSVGMouseEvent({x:150,y:150}));
    component.handleClick(createSVGMouseEvent({x:150,y:150}));
    component.changeDiameter(53);
    expect(component.state.undos).toEqual([
        [],
        [{id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS}],
        [
          {id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS},
          {id:'id-1', x:150, y:150, rad: DEFAULT_CIRCLE_RADIUS}
        ]
    ]);
    component.toggleDisplayChangeDiameterDialog();// close the diameter dialog

    component.handleClick(createSVGMouseEvent({x:300,y:300}));
    expect(component.state.undos).toEqual([
        [],
        [{id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS}],
        [
          {id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS},
          {id:'id-1', x:150, y:150, rad: DEFAULT_CIRCLE_RADIUS}
        ],
        [
          {id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS},
          {id:'id-1', x:150, y:150, rad: 53}
        ]
    ]);

    expect(component.state.undos.length).toBe(4);

    component.undo();
    expect(component.state.circles).toEqual([
      {id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS},
      {id:'id-1', x:150, y:150, rad: 53}
    ]);

    component.undo();
    expect(component.state.circles).toEqual([
      {id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS},
      {id:'id-1', x:150, y:150, rad: DEFAULT_CIRCLE_RADIUS}
    ]);

    component.undo();
    expect(component.state.circles).toEqual([
      {id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS}
    ]);
  });

  it('redos actions', ()=>{
    mockGenerateId();
    const component = renderIntoDocument(<CircleDrawer />);
    component.handleClick(createSVGMouseEvent({x:33,y:29}));
    component.handleClick(createSVGMouseEvent({x:150,y:150}));
    component.handleClick(createSVGMouseEvent({x:150,y:150}));
    component.changeDiameter(50);
    component.handleClick(createSVGMouseEvent({x:300,y:300}));
    expect(component.state.undos.length).toBe(4);

    component.undo();
    component.undo();
    component.undo();
    component.undo();

    expect(component.state.redos.length).toBe(4);

    expect(component.state.circles).toEqual([]);

    component.redo();
    expect(component.state.circles).toEqual([{id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS}]);

    component.redo();
    expect(component.state.circles).toEqual([
      {id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS},
      {id:'id-1', x:150, y:150, rad: DEFAULT_CIRCLE_RADIUS}
    ]);

    component.redo();
    expect(component.state.circles).toEqual([
      {id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS},
      {id:'id-1', x:150, y:150, rad: 50}
    ]);

    component.redo();
    expect(component.state.circles).toEqual([
      {id:'id-0', x:33, y:29, rad: DEFAULT_CIRCLE_RADIUS},
      {id:'id-1', x:150, y:150, rad: 50},
      {id:'id-2', x:300, y:300, rad: DEFAULT_CIRCLE_RADIUS},
    ]);

    expect(component.state.redos.length).toBe(0);
  });

});
