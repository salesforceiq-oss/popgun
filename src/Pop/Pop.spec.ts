/// <reference path='../../typings/tsd.d.ts' />

import Pop from './';
import Trigger from '../Trigger';

describe('Pop - ', () => {

  describe('constructor', () => {

    it('should create Pop with Trigger with EventType click', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('click');
      let p = new Pop(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

    it('should create Pop with Trigger with EventType hover', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('hover');
      let p = new Pop(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

    it('should create Pop with Trigger with EventType focus', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('focus');
      let p = new Pop(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

    it('should create Pop with Trigger with EventType manual', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('manual');
      let p = new Pop(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

  });

});