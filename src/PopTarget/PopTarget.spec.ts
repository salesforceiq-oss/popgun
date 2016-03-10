/// <reference path='../../typings/tsd.d.ts' />

import PopTarget from './';
import Trigger from '../Trigger';

describe('PopTarget - ', () => {

  describe('constructor', () => {

    it('should create PopTarget with Trigger with EventType click', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('click');
      let p = new PopTarget(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

    it('should create PopTarget with Trigger with EventType hover', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('hover');
      let p = new PopTarget(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

    it('should create PopTarget with Trigger with EventType focus', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('focus');
      let p = new PopTarget(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

    it('should create PopTarget with Trigger with EventType manual', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('manual');
      let p = new PopTarget(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

  });

  describe('isPopTarget() - ', () => {

    it('should be a pop target when popgun attr has a value', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '12345');
      expect(PopTarget.isPopTarget(el)).toBe(true);
    });

    it('should be a pop target when popgun attr does not have a value', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      expect(PopTarget.isPopTarget(el)).toBe(true);
    });

    it('should NOT be a pop target with no popgun attr', () => {
      let el = document.createElement('div');
      expect(PopTarget.isPopTarget(el)).toBe(false);
    });

  });

  describe('isPopForTrigger() - ', () => {

    it('should return false when there is no element', () => {
      expect(PopTarget.isPopForTrigger(null, null)).toBe(false);
    });

    it('should return false when there is no trigger', () => {
      let el = document.createElement('div');
      expect(PopTarget.isPopForTrigger(el, null)).toBe(false);
    });

    it('should return false when the element is not a pop target', () => {
      let el = document.createElement('div');
      expect(PopTarget.isPopForTrigger(el, new Trigger('click'))).toBe(false);
    });

    it('should return false when trigger does not match pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click');
      expect(PopTarget.isPopForTrigger(el, new Trigger('hover'))).toBe(false);
    });

    it('should return true when click matches pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click');
      expect(PopTarget.isPopForTrigger(el, new Trigger('click'))).toBe(true);
    });

    it('should return true when hover matches pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'hover');
      expect(PopTarget.isPopForTrigger(el, new Trigger('hover'))).toBe(true);
    });

    it('should return true when focus matches pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'focus');
      expect(PopTarget.isPopForTrigger(el, new Trigger('focus'))).toBe(true);
    });

    it('should return true when manual matches pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'manual');
      expect(PopTarget.isPopForTrigger(el, new Trigger('manual'))).toBe(true);
    });

    it('should return true when click matches pop target with multiple triggers', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click, hover, manual');
      expect(PopTarget.isPopForTrigger(el, new Trigger('click'))).toBe(true);
    });

    it('should return false when trigger does not match pop target with multiple triggers', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click, hover, manual');
      expect(PopTarget.isPopForTrigger(el, new Trigger('focus'))).toBe(false);
    });

  });

});