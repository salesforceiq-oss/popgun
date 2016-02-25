/// <reference path='../../typings/tsd.d.ts' />

import * as popTarget from './';
import TriggerType from '../TriggerType';
import EnumUtil from '../EnumUtil';

xdescribe('pop-target - ', () => {

  describe('isPopTarget() - ', () => {

    it('should be a pop target when popgun attr has a value', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '12345');
      expect(popTarget.isPopTarget(el)).toBe(true);
    });

    it('should be a pop target when popgun attr does not have a value', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      expect(popTarget.isPopTarget(el)).toBe(true);
    });

    it('should NOT be a pop target with no popgun attr', () => {
      let el = document.createElement('div');
      expect(popTarget.isPopTarget(el)).toBe(false);
    });

  });

  describe('isForTrigger() - ', () => {

    it('should return false when there is no element', () => {
      expect(popTarget.isForTrigger(null, null)).toBe(false);
    });

    it('should return false when there is no trigger', () => {
      let el = document.createElement('div');
      expect(popTarget.isForTrigger(el, null)).toBe(false);
    });

    it('should return false when the element is not a pop target', () => {
      let el = document.createElement('div');
      expect(popTarget.isForTrigger(el, 'click')).toBe(false);
    });

    EnumUtil.getNames(TriggerType).forEach((n: string): void => {
      EnumUtil.getNames(TriggerType).forEach((n2: string): void => {
        if (n !== n2) {
          it('should return false when trigger does not match pop target trigger', () => {
            let el = document.createElement('div');
            el.setAttribute('popgun', '');
            el.setAttribute('popgun-trigger', n);
            expect(popTarget.isForTrigger(el, n2)).toBe(false);
          });
        }
      });
    });

    EnumUtil.getNames(TriggerType).forEach((n: string): void => {
      it('should return true when trigger matches pop target trigger', () => {
        let el = document.createElement('div');
        el.setAttribute('popgun', '');
        el.setAttribute('popgun-trigger', n);
        expect(popTarget.isForTrigger(el, n)).toBe(true);
      });
    });

  });

});