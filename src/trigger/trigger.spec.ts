/// <reference path='../../typings/tsd.d.ts' />

import { default as Trigger, TriggerEventType } from './';

describe('trigger - ', () => {

  describe('TriggerEventType - ', () => {

    it('should set click event type to `click`', () => {
      expect(TriggerEventType.CLICK).toBe('click');
    });

    it('should set hover event type to `mouseenter`', () => {
      expect(TriggerEventType.HOVER).toBe('mouseenter');
    });

    it('should set focus event type to `focusin`', () => {
      expect(TriggerEventType.FOCUS).toBe('focusin');
    });

  });

  describe('eventType - ', () => {

    it('should set click eventType for click trigger name', () => {
      expect((new Trigger('click')).eventType).toBe(TriggerEventType.CLICK);
    });

    it('should set hover eventType for hover trigger name', () => {
      expect((new Trigger('hover')).eventType).toBe(TriggerEventType.HOVER);
    });

    it('should set focus eventType for focus trigger name', () => {
      expect((new Trigger('focus')).eventType).toBe(TriggerEventType.FOCUS);
    });

    it('should set manual eventType for manual trigger name', () => {
      expect((new Trigger('manual')).eventType).toBe(TriggerEventType.MANUAL);
    });

  });

  describe('useCapture - ', () => {

    it('should set useCapture to `false` for click trigger', () => {
      expect((new Trigger('click')).useCapture).toBe(false);
    });

    it('should set useCapture to `false` for hover trigger', () => {
      expect((new Trigger('hover')).useCapture).toBe(false);
    });

    it('should set useCapture to `true` for focus trigger', () => {
      expect((new Trigger('focus')).useCapture).toBe(true);
    });

    it('should set useCapture to `false` for manual trigger', () => {
      expect((new Trigger('manual')).useCapture).toBe(false);
    });

  });

});