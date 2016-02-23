/// <reference path='../../typings/tsd.d.ts' />

import * as trigger from './';
import { TriggerName, TriggerEventType } from './';

fdescribe('trigger - ', () => {

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

    it('should set focus event type to `popgun-manual`', () => {
        expect(TriggerEventType.MANUAL).toBe('popgun-manual');
    });

  });

  describe('parse - ', () => {

    it('should properly parse space separated input', () => {
        expect(trigger.parse('hover click')).toEqual([TriggerName.HOVER, TriggerName.CLICK]);
    });

    it('should properly parse comma separated input', () => {
        expect(trigger.parse('click, manual, hover')).toEqual([TriggerName.CLICK, TriggerName.MANUAL, TriggerName.HOVER]);
    });

    it('should properly parse space and comma separated input', () => {
      expect(trigger.parse('click manual hover, focus'))
        .toEqual([TriggerName.CLICK, TriggerName.MANUAL, TriggerName.HOVER, TriggerName.FOCUS]);
    });

    it('should return an empty array for empty trigger', () => {
        expect(trigger.parse('')).toEqual([]);
    });

  });

  describe('getEventTypes - ', () => {

    it('should properly parse space separated input', () => {
        expect(trigger.getEventTypes('hover click')).toEqual([TriggerEventType.HOVER, TriggerEventType.CLICK]);
    });

    it('should properly parse comma separated input', () => {
        expect(trigger.getEventTypes('click, manual, hover')).toEqual([TriggerEventType.CLICK, TriggerEventType.MANUAL, TriggerEventType.HOVER]);
    });

    it('should properly parse space and comma separated input', () => {
      expect(trigger.getEventTypes('click manual hover, focus'))
        .toEqual([TriggerEventType.CLICK, TriggerEventType.MANUAL, TriggerEventType.HOVER, TriggerEventType.FOCUS]);
    });

    it('should return an empty array for empty trigger', () => {
        expect(trigger.getEventTypes('')).toEqual([]);
    });

  });

  describe('getEventType - ', () => {

      it('should be click event type for `click`', () => {
          expect(trigger.getEventType(TriggerName.CLICK)).toEqual(TriggerEventType.CLICK);
      });

      it('should be hover event type for `hover`', () => {
          expect(trigger.getEventType(TriggerName.HOVER)).toEqual(TriggerEventType.HOVER);
      });

      it('should be focus event type for `focus`', () => {
          expect(trigger.getEventType(TriggerName.FOCUS)).toEqual(TriggerEventType.FOCUS);
      });

      it('should be manual event type for `manual`', () => {
          expect(trigger.getEventType(TriggerName.MANUAL)).toEqual(TriggerEventType.MANUAL);
      });

  });

  describe('get - ', () => {

      it('should be false for `click`', () => {
          expect(trigger.isUseCapture(TriggerName.CLICK)).toBe(false);
      });

      it('should be false for `hover`', () => {
          expect(trigger.isUseCapture(TriggerName.HOVER)).toBe(false);
      });

      it('should be false for `focusin`', () => {
          expect(trigger.isUseCapture(TriggerName.FOCUS)).toBe(true);
      });

      it('should be false for `manual`', () => {
          expect(trigger.isUseCapture(TriggerName.MANUAL)).toBe(false);
      });

  });

  describe('isUseCapture - ', () => {

      it('should be false for `click`', () => {
          expect(trigger.isUseCapture(TriggerName.CLICK)).toBe(false);
      });

      it('should be false for `hover`', () => {
          expect(trigger.isUseCapture(TriggerName.HOVER)).toBe(false);
      });

      it('should be false for `focusin`', () => {
          expect(trigger.isUseCapture(TriggerName.FOCUS)).toBe(true);
      });

      it('should be false for `manual`', () => {
          expect(trigger.isUseCapture(TriggerName.MANUAL)).toBe(false);
      });

  });

});