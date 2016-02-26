/// <reference path='../../typings/tsd.d.ts' />

import Options from './';
import defaultOptions from '../DefaultOptions';
import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import EnumUtil from '../EnumUtil';
import * as extend from 'extend';

let deepEqual = require('deep-equal');

describe('Options - ', () => {

  describe('default - ', () => {

    it('should default trigger to a hover trigger', () => {
      expect((new Options()).trigger).toEqual([new Trigger('hover')]);
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
      let expected = extend({}, defaultOptions, {
        trigger: [new Trigger('click')],
        content: 'hello world',
        placement: 'bottom'
      }); // copy

      expect(deepEqual((new Options({
        trigger: 'click',
        content: expected.content,
        placement: expected.placement
      })), expected)).toBe(true);
    });

    it('should extend defaults with custom options object with extend fn', () => {
      let expected = extend({}, defaultOptions); // copy
      expected.trigger = 'click';
      expected.content = 'hello world';
      expected.placement = 'bottom';


      expect(deepEqual((new Options().extend({
        trigger: expected.trigger,
        content: expected.content,
        placement: expected.placement
      })), expected)).toBe(true);
    });

  });

});