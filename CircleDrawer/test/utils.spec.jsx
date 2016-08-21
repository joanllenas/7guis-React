import expect from 'expect';
import {findFirstCircleUnderPoint, generateUniqueId, findCircleById} from '../src/utils';

describe('utils', () => {

  describe('findFirstCircleUnderPoint', () => {
    it("finds the circle only when point is within boundaries", () => {
      const circles = [
        {id:1, x:50, y:50, rad:25},
        {id:2, x:150, y:150, rad:25},
      ];
      const circle = findFirstCircleUnderPoint(circles, {x:50, y:50});
      expect(circle).toNotBe(null);
      expect(circle.id).toBe(1);
    });
    it("finds the first circle", () => {
      const circles = [
        {id:1, x:150, y:150, rad:25},
        {id:2, x:50, y:50, rad:25},
        {id:3, x:51, y:51, rad:25},
        {id:4, x:52, y:52, rad:25}
      ];
      const circle = findFirstCircleUnderPoint(circles, {x:50, y:50});
      expect(circle).toNotBe(null);
      expect(circle.id).toBe(2);
    });

    [{x:27, y:5}, {x:25, y:0}, {x:0, y:25}, {x:50, y:25}, {x:25, y:50}].forEach(point=>{
      it(`finds the circle {x:25, y:25, rad:25} when clicking on (${point.x},${point.y})`, () => {
        const circles = [
          {id:1, x:25, y:25, rad:25}
        ];
        const circle = findFirstCircleUnderPoint(circles, point);
        expect(circle).toNotBe(null);
      });
    });
  });

  describe('generateUniqueId', () => {
    it("generates a unique id", () => {
      let ids = [];
      let id;
      for(let i=0; i<10; i++) {
        id = generateUniqueId();
        expect(ids.indexOf(id)).toBe(-1);
        ids.push(id);
      }
    });
  });

  describe('findCircleById', () => {
    it("finds the circle given an id", () => {
      const circles = [];
      const rnd = Math.floor(Math.random()*9);
      for(let i=0; i<10; i++) {
        circles.push({id:generateUniqueId()});
      }
      const id = circles[rnd].id;
      expect( findCircleById(circles, id) ).toBe( circles[rnd] );
    });

    it("returns null if it cannot find the circle", () => {
      const circles = [];
      for(let i=0; i<10; i++) {
        circles.push({id:generateUniqueId()});
      }
      expect( findCircleById(circles, 'any-id') ).toBe( null );
    });
  });

});
