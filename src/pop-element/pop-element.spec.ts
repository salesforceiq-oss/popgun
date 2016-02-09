/// <reference path='../../typings/tsd.d.ts' />

import * as popElement from './';

describe('pop-element - ', () => {

  describe('isPop() - ', () => {

    it('should be a pop when popgun attr has a value', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '12345');
      expect(popElement.isPop(el)).toBe(true);
    });

    it('should be a pop when popgun attr does not have a value', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      expect(popElement.isPop(el)).toBe(true);
    });

    it('should NOT be a pop with no popgun attr', () => {
      let el = document.createElement('div');
      expect(popElement.isPop(el)).toBe(false);
    });

  });

  describe('isPopForTrigger() - ', () => {

    // it('should', () => {
    // });

  });

});