/// <reference path='../../typings/tsd.d.ts' />

import { Options, defaultOptions } from './';
import Trigger, { TriggerName } from '../trigger';
import EnumUtil from '../enum-util';
import * as extend from 'extend';

let deepEqual = require('deep-equal');

describe('Options - ', () => {

  describe('default - ', () => {

    it('should default trigger to a hover trigger', () => {
      expect((new Options()).trigger).toEqual(new Trigger('hover'));
    });

    it('should default content to an empty string', () => {
      expect((new Options()).content).toBe('');
    });

    it('should default placement to top', () => {
      expect((new Options()).placement).toBe('top');
    });

    it('should default placementOffset to 8', () => {
      expect((new Options()).placementOffset).toBe(8);
    });

    it('should default optimizePlacement to true', () => {
      expect((new Options()).optimizePlacement).toBe(true);
    });

    it('should default transitionPlacement to true', () => {
      expect((new Options()).transitionPlacement).toBe(true);
    });

    it('should default alignment to empty string', () => {
      expect((new Options()).alignment).toBe('');
    });

    it('should default alignmentOffset to 0', () => {
      expect((new Options()).alignmentOffset).toBe(0);
    });

    it('should default viewportPadding to 10', () => {
      expect((new Options()).viewportPadding).toBe(10);
    });

    it('should default timeToHoverOnPop to 300', () => {
      expect((new Options()).timeToHoverOnPop).toBe(300);
    });

    it('should default showDelay to 0', () => {
      expect((new Options()).showDelay).toBe(0);
    });

    it('should default fadeDuration to 100', () => {
      expect((new Options()).fadeDuration).toBe(100);
    });

  });

  describe('extend - ', () => {

    it('should extend defaults with custom options object passed to constructor', () => {
      let expected = extend({}, defaultOptions); // copy
      expected.trigger = new Trigger('click');
      expected.content = 'hello world';
      expected.placement = 'bottom';


      expect(deepEqual((new Options({
        trigger: expected.trigger,
        content: expected.content,
        placement: expected.placement
      })), expected)).toBe(true);
    });

    it('should extend defaults with custom options object with extend fn', () => {
      let expected = extend({}, defaultOptions); // copy
      expected.trigger = new Trigger('click');
      expected.content = 'hello world';
      expected.placement = 'bottom';


      expect(deepEqual((new Options().extend({
        trigger: expected.trigger,
        content: expected.content,
        placement: expected.placement
      })), expected)).toBe(true);
    });

  });

  xdescribe('fromElement - ', () => {

    function getOptionsFromElement(attr: string, attrValue: string): Options {
      let el = document.createElement('div');
      el.setAttribute(attr, attrValue);
      return (new Options()).fromElement(el);
    }

    EnumUtil.getNames(TriggerName).forEach((n: string): void => {
      it('should set ' + n + ' trigger from element attribute', () => {
        let opts = getOptionsFromElement('popgun-trigger', n);
        expect(opts.trigger).toEqual(new Trigger('hover'));
      });
    });

    it('should set content from element attribute', () => {
      let value = 'hello world';
      let opts = getOptionsFromElement('popgun-content', value);
      expect(opts.content).toEqual(value);
    });

    it('should set placement from element attribute', () => {
      let value = 'left top';
      let opts = getOptionsFromElement('popgun-placement', value);
      expect(opts.placement).toEqual(value);
    });

    it('should set placementOffset from element attribute', () => {
      let value = '123';
      let opts = getOptionsFromElement('popgun-placement-offset', value);
      expect(opts.placementOffset).toEqual(value);
    });

    it('should set optimizePlacement from element attribute', () => {
      let value = 'false';
      let opts = getOptionsFromElement('popgun-optimize-placement', value);
      expect(opts.optimizePlacement).toEqual(value);
    });

    it('should set transitionPlacement from element attribute', () => {
      let value = 'false';
      let opts = getOptionsFromElement('popgun-transition-placement', value);
      expect(opts.transitionPlacement).toEqual(value);
    });

    it('should set alignment from element attribute', () => {
      let value = 'top left';
      let opts = getOptionsFromElement('popgun-alignment', value);
      expect(opts.alignment).toEqual(value);
    });

    it('should set alignmentOffset from element attribute', () => {
      let value = '123';
      let opts = getOptionsFromElement('popgun-alignment-offset', value);
      expect(opts.alignmentOffset).toEqual(value);
    });

    it('should set viewportPadding from element attribute', () => {
      let value = '123';
      let opts = getOptionsFromElement('popgun-viewport-padding', value);
      expect(opts.viewportPadding).toEqual(value);
    });

    it('should set timeToHoverOnPop from element attribute', () => {
      let value = '123';
      let opts = getOptionsFromElement('popgun-time-to-hover-on-pop', value);
      expect(opts.timeToHoverOnPop).toEqual(value);
    });

    it('should set showDelay from element attribute', () => {
      let value = '123';
      let opts = getOptionsFromElement('popgun-show-delay', value);
      expect(opts.showDelay).toEqual(value);
    });

    it('should set fadeDuration from element attribute', () => {
      let value = '123';
      let opts = getOptionsFromElement('popgun-fade-duration', value);
      expect(opts.fadeDuration).toEqual(value);
    });

  });

});