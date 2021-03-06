/// <reference path='../../typings/index.d.ts' />

import Trigger from './';
import TriggerEventType from '../TriggerEventType';
import TriggerType from '../TriggerType';

describe('Trigger - ', () => {

  describe('TriggerType - ', () => {

    it('should set name to TriggerType.CLICK', () => {
      expect((new Trigger('click')).name).toBe(TriggerType.CLICK);
    });

    it('should set name to TriggerType.HOVER', () => {
        expect((new Trigger('hover')).name).toBe(TriggerType.HOVER);
    });

    it('should set name to TriggerType.FOCUS', () => {
        expect((new Trigger('focus')).name).toBe(TriggerType.FOCUS);
    });

    it('should set name to TriggerType.MANUAL', () => {
        expect((new Trigger('manual')).name).toBe(TriggerType.MANUAL);
    });

    it('should set name to TriggerType.BLUR', () => {
        expect((new Trigger('blur')).name).toBe(TriggerType.BLUR);
    });

  });

  describe('TriggerEventType - ', () => {

      it('should set click event type to `click`', () => {
          expect((new Trigger('click')).eventType).toBe(TriggerEventType.CLICK);
      });

      it('should set hover event type to `mouseover`', () => {
          expect((new Trigger('hover')).eventType).toBe(TriggerEventType.HOVER);
      });

      it('should set focus event type to `focusin`', () => {
          expect((new Trigger('focus')).eventType).toBe(TriggerEventType.FOCUS);
      });

      it('should set focus event type to `popgun-manual`', () => {
          expect((new Trigger('manual')).eventType).toBe(TriggerEventType.MANUAL);
      });

      it('should set focus event type to `focusout`', () => {
          expect((new Trigger('blur')).eventType).toBe(TriggerEventType.BLUR);
      });

  });

  describe('useCapture - ', () => {

      it('should be false for `click`', () => {
          expect((new Trigger('click')).useCapture).toBe(false);
      });

      it('should be false for `hover`', () => {
          expect((new Trigger('hover')).useCapture).toBe(false);
      });

      it('should be false for `focusin`', () => {
          expect((new Trigger('focus')).useCapture).toBe(true);
      });

      it('should be false for `manual`', () => {
          expect((new Trigger('manual')).useCapture).toBe(false);
      });

      it('should be false for `focusout`', () => {
          expect((new Trigger('blur')).useCapture).toBe(false);
      });

  });

});
