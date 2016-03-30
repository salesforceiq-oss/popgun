/// <reference path='../../typings/tsd.d.ts' />

import PopStateType from './';

describe('PopStateType - ', () => {

  describe('PopStateTypes - ', () => {

    it('should set HIDDEN event type to `hidden`', () => {
      expect(PopStateType.HIDDEN).toBe('hidden');
    });

    it('should set CONTENT_SETUP event type to `content_setup`', () => {
      expect(PopStateType.CONTENT_SETUP).toBe('content_setup');
    });

    it('should set PRE_POSITION event type to `pre_position`', () => {
      expect(PopStateType.PRE_POSITION).toBe('pre_position');
    });

    it('should set PRE_SHOW event type to `pre_show`', () => {
      expect(PopStateType.PRE_SHOW).toBe('pre_show');
    });

    it('should set SHOWING event type to `showing`', () => {
      expect(PopStateType.SHOWING).toBe('showing');
    });

    it('should set PRE_HIDE event type to `pre_hide`', () => {
      expect(PopStateType.PRE_HIDE).toBe('pre_hide');
    });

  });

});