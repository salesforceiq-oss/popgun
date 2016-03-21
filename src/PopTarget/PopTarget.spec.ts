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

});