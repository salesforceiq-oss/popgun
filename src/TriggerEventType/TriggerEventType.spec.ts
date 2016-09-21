/// <reference path='../../typings/index.d.ts' />

import TriggerEventType from './';

describe('TriggerEventType - ', () => {

  describe('TriggerEventTypes - ', () => {

    it('should set click event type to `click`', () => {
      expect(TriggerEventType.CLICK).toBe('click');
    });

    it('should set hover event type to `mouseover`', () => {
      expect(TriggerEventType.HOVER).toBe('mouseover');
    });

    it('should set focus event type to `focusin`', () => {
      expect(TriggerEventType.FOCUS).toBe('focusin');
    });

    it('should set manual event type to `popgun-manual`', () => {
      expect(TriggerEventType.MANUAL).toBe('popgun-manual');
    });

    it('should set blur event type to `focusout`', () => {
      expect(TriggerEventType.BLUR).toBe('focusout');
    });

  });

  describe('triggerEventTypeToTriggerType - ', () => {

    it('should return `click` for `click`', () => {
      expect(TriggerEventType.triggerEventTypeToTriggerType('click')).toBe('click');
    });

    it('should return `hover` for `mouseover`', () => {
      expect(TriggerEventType.triggerEventTypeToTriggerType('mouseover')).toBe('hover');
    });

    it('should return `focus` for `focusin`', () => {
      expect(TriggerEventType.triggerEventTypeToTriggerType('focusin')).toBe('focus');
    });

    it('should return `manual` for `popgun-manual`', () => {
      expect(TriggerEventType.triggerEventTypeToTriggerType('popgun-manual')).toBe('manual');
    });

    it('should return `blur` for `focusout`', () => {
      expect(TriggerEventType.triggerEventTypeToTriggerType('focusout')).toBe('blur');
    });

  });

});
