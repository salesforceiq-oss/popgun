/// <reference path='../../typings/tsd.d.ts' />

import PopStateType from './';

describe('PopStateType - ', () => {

  describe('PopStateTypes - ', () => {

    it('should set HIDDEN event type to `HIDDEN`', () => {
      expect(PopStateType.HIDDEN).toBe('HIDDEN');
    });

    it('should set CONTENT_SETUP event type to `CONTENT_SETUP`', () => {
      expect(PopStateType.CONTENT_SETUP).toBe('CONTENT_SETUP');
    });

    it('should set PRE_POSITION event type to `PRE_POSITION`', () => {
      expect(PopStateType.PRE_POSITION).toBe('PRE_POSITION');
    });

    it('should set PRE_SHOW event type to `PRE_SHOW`', () => {
      expect(PopStateType.PRE_SHOW).toBe('PRE_SHOW');
    });

    it('should set SHOWING event type to `SHOWING`', () => {
      expect(PopStateType.SHOWING).toBe('SHOWING');
    });

    it('should set PRE_HIDE event type to `PRE_HIDE`', () => {
      expect(PopStateType.PRE_HIDE).toBe('PRE_HIDE');
    });

  });

});