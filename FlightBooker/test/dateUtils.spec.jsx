import expect from 'expect';
import {DATE_SEPARATOR, fromShortDate} from '../src/dateUtils';

describe("Date utils", ()=>{

  describe("fromShortDate", ()=>{

    it('should convert the short date string to a Date object', ()=>{
      expect(fromShortDate(['25','12','2015'].join(DATE_SEPARATOR))).toEqual(new Date(2015,11,25));
    });

    it('should return null when an invalid date string is provided', ()=>{
      expect(fromShortDate('abc')).toEqual(null);
    });

    it('should return null when an empty string is provided', ()=>{
      expect(fromShortDate('')).toEqual(null);
    });
  });

});
