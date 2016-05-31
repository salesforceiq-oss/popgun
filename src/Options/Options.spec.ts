/// <reference path='../../typings/tsd.d.ts' />

import Options from './';
import defaultOptions from '../DefaultOptions';
import Trigger from '../Trigger';
import groupStore from '../GroupStore';
import * as extend from 'extend';

let deepEqual = require('deep-equal');

describe('Options - ', () => {

  describe('default - ', () => {

    it('should default trigger to a hover trigger', () => {
      expect((new Options()).trigger).toEqual([new Trigger('hover')]);
    });

    it('should default html to an empty string', () => {
      expect((new Options()).html).toBe('');
    });

    it('should default text to an empty string', () => {
      expect((new Options()).text).toBe('');
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

    it('should default cushion to 8', () => {
      expect((new Options()).cushion).toBe(8);
    });

    it('should default containerCushion to 10', () => {
      expect((new Options()).containerCushion).toBe(10);
    });

  });

  describe('extend - ', () => {

    it('should extend defaults with custom options object passed to constructor', () => {
      let expected = extend({}, defaultOptions, {
        trigger: [new Trigger('click')],
        text: 'hello world',
        placement: 'bottom'
      }); // copy

      expect(deepEqual((new Options({
        trigger: 'click',
        text: expected.text,
        placement: expected.placement
      })), expected)).toBe(true);
    });

    it('should extend defaults with custom options object with extend fn', () => {
      let expected = extend({}, defaultOptions); // copy
      expected.trigger = 'click';
      expected.text = 'hello world';
      expected.placement = 'bottom';


      expect(deepEqual((new Options().extend({
        trigger: expected.trigger,
        text: expected.text,
        placement: expected.placement
      })), expected)).toBe(true);
    });

  });

  describe('containsEventTrigger - ', () => {

    it('should return true if triggers contain event trigger', () => {
      let opts = new Options({
        trigger: 'hover, click'
      });

      expect(opts.containsEventTrigger('click')).toBe(true);
    });

    it('should return false if triggers does not contain event trigger', () => {
      let opts = new Options({
        trigger: 'hover'
      });

      expect(opts.containsEventTrigger('click')).toBe(false);
    });

    it('should return false if triggers does not contain event trigger', () => {
      let opts = new Options({
        trigger: 'manual'
      });

      expect(opts.containsEventTrigger('popgun-manual')).toBe(true);
    });

    it('should return false if triggers does not contain event trigger', () => {
      let opts = new Options({
        trigger: 'hover'
      });

      expect(opts.containsEventTrigger('mouseover')).toBe(true);
    });

  });

  describe('fromElement - ', () => {

    it('should test the contract', () => {

      let groupVal: Object = {
        trigger: 'hover, click',
        placement: 'top right',
        showDelay: '123',
        transitionPlacement: false
      };

      let schemaVal: Object = {
        transitionPlacement: true
      };

      let jsonVal: Object = {
        trigger: 'hover',
        placement: 'top bottom',
        showDelay: '123'
      };

      groupStore.add('group-test', { options: groupVal });
      groupStore.add('schema-test', schemaVal);

      let el = document.createElement('div');
      el.setAttribute('popgun-group', 'group-test');
      el.setAttribute('popgun-schema', 'schema-test');
      el.setAttribute('popgun-json', JSON.stringify(jsonVal));
      el.setAttribute('popgun-placement', 'top left');

      let result = Options.fromElement(el);
      let expected = new Options({
        trigger: 'hover',
        placement: 'top left',
        showDelay: '123',
        transitionPlacement: false
      });

      expect(deepEqual(result, expected)).toBe(true);

    });

  });

});