/// <reference path='../../typings/tsd.d.ts' />

import PopOver from './';
import Trigger from '../Trigger';

describe('PopOver - ', () => {

  describe('constructor() - ', () => {

    it('should create PopOver with Trigger with EventType click', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('click');
      let p = new PopOver(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

    it('should create PopOver with Trigger with EventType hover', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('hover');
      let p = new PopOver(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

    it('should create PopOver with Trigger with EventType focus', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('focus');
      let p = new PopOver(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

    it('should create PopOver with Trigger with EventType manual', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      let t = new Trigger('manual');
      let p = new PopOver(el, t);
      expect(p.trigger.name).toBe(t.name);
    });

  });

});