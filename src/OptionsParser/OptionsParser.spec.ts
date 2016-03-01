/// <reference path='../../typings/tsd.d.ts' />

import OptionsParser from './';
import Trigger from '../Trigger';
import IOptions from '../IOptions';
import TriggerType from '../TriggerType';
import EnumUtil from '../EnumUtil';
import schemaStore from '../SchemaStore';
import groupStore from '../GroupStore';

let deepEqual = require('deep-equal');

describe('OptionsParser -', () => {

  describe('fromElement - ', () => {

    it('end to end test to check priority', () => {

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

      expect(deepEqual(OptionsParser.fromElement(el), {
        placement: 'top left',
        showDelay: 123,
        trigger: [new Trigger('hover')],
        transitionPlacement: false
      })).toBe(true);
    });

  });

  describe('fromLiteral -', () => {

    it('should return empty object when provided empty literal', () => {
      expect(OptionsParser.fromLiteral({})).toEqual({});
    });

    it('should return empty object when provided nothing', () => {
      expect(OptionsParser.fromLiteral(null)).toEqual({});
    });

    describe('.trigger - ', () => {

      it('should call parseTrigger with value of trigger key', () => {
        let val = 'hover click';
        spyOn(OptionsParser, 'parseTriggers');
        OptionsParser.fromLiteral({ trigger: val });
        expect(OptionsParser.parseTriggers).toHaveBeenCalledWith(val);
      });

      it('should set returned trigger as result from parseTriggers', () => {
        let val: any[] = [];
        spyOn(OptionsParser, 'parseTriggers').and.returnValue(val);
        expect(OptionsParser.fromLiteral({ trigger: 'hover click' }).trigger).toBe(val);
      });

    });

    describe('parse type of option - ', () => {

      it('should parse as string', () => {
        let val = 'test';

        expect(OptionsParser.fromLiteral({
          content: val,
          placement: val,
          alignment: val
        })).toEqual({
          content: val,
          placement: val,
          alignment: val
        });

      });

      it('should parse as number', () => {
        expect(OptionsParser.fromLiteral({
          alignmentOffset: '123',
          viewportPadding: '123.456',
          timeToHoverOnPop: '0',
          showDelay: 0,
          fadeDuration: '-123'
        })).toEqual({
          alignmentOffset: 123,
          viewportPadding: 123.456,
          timeToHoverOnPop: 0,
          showDelay: 0,
          fadeDuration: -123
        });
      });

      it('should parse as boolean', () => {

        expect(OptionsParser.fromLiteral({
          optimizePlacement: 'true',
          transitionPlacement: 'false'
        })).toEqual({
          optimizePlacement: true,
          transitionPlacement: false
        });

        expect(OptionsParser.fromLiteral({
          optimizePlacement: true,
          transitionPlacement: false
        })).toEqual({
          optimizePlacement: true,
          transitionPlacement: false
        });

        expect(OptionsParser.fromLiteral({
          optimizePlacement: 1,
          transitionPlacement: 0
        })).toEqual({
          optimizePlacement: true,
          transitionPlacement: false
        });

        expect(OptionsParser.fromLiteral({
          optimizePlacement: '1',
          transitionPlacement: '0'
        })).toEqual({
          optimizePlacement: false,
          transitionPlacement: false
        });

      });

    });

  });

  describe('fromSingleAttributes -', () => {

    function fromSingleAttribute(attr: string, attrValue: string): IOptions {
      let el = document.createElement('div');
      el.setAttribute(attr, attrValue);
      return OptionsParser.fromSingleAttributes(el);
    }

    EnumUtil.getNames(TriggerType).forEach((n: string): void => {
      it('should set ' + n + ' trigger from element attribute', () => {
        let opts = fromSingleAttribute('popgun-trigger', n);
        expect(opts.trigger).toEqual([new Trigger(n)]);
      });
    });

    it('should set content from element attribute', () => {
      let value = 'hello world';
      let opts = fromSingleAttribute('popgun-content', value);
      expect(opts.content).toEqual(value);
    });

    it('should set placement from element attribute', () => {
      let value = 'left top';
      let opts = fromSingleAttribute('popgun-placement', value);
      expect(opts.placement).toEqual(value);
    });

    it('should set placementOffset from element attribute', () => {
      let opts = fromSingleAttribute('popgun-placement-offset', '123');
      expect(opts.placementOffset).toEqual(123);
    });

    it('should set optimizePlacement from element attribute', () => {
      let opts = fromSingleAttribute('popgun-optimize-placement', 'true');
      expect(opts.optimizePlacement).toEqual(true);
    });

    it('should set transitionPlacement from element attribute', () => {
      let opts = fromSingleAttribute('popgun-transition-placement', 'false');
      expect(opts.transitionPlacement).toEqual(false);
    });

    it('should set alignment from element attribute', () => {
      let value = 'top left';
      let opts = fromSingleAttribute('popgun-alignment', value);
      expect(opts.alignment).toEqual(value);
    });

    it('should set alignmentOffset from element attribute', () => {
      let opts = fromSingleAttribute('popgun-alignment-offset', '123.456');
      expect(opts.alignmentOffset).toEqual(123.456);
    });

    it('should set viewportPadding from element attribute', () => {
      let opts = fromSingleAttribute('popgun-viewport-padding', '0');
      expect(opts.viewportPadding).toEqual(0);
    });

    it('should set timeToHoverOnPop from element attribute', () => {
      let opts = fromSingleAttribute('popgun-time-to-hover-on-pop', '300');
      expect(opts.timeToHoverOnPop).toEqual(300);
    });

    it('should set showDelay from element attribute', () => {
      let opts = fromSingleAttribute('popgun-show-delay', '-123');
      expect(opts.showDelay).toEqual(-123);
    });

    it('should set fadeDuration from element attribute', () => {
      let opts = fromSingleAttribute('popgun-fade-duration', '123');
      expect(opts.fadeDuration).toEqual(123);
    });

    it('should exclude popgun-schema', () => {
      let opts = fromSingleAttribute('popgun-schema', '123');
      expect(opts).toEqual({});
    });

    it('should exclude popgun-json', () => {
      let opts = fromSingleAttribute('popgun-json', '{placement: "top"}');
      expect(opts).toEqual({});
    });

    it('should exclude popgun-group', () => {
      let opts = fromSingleAttribute('popgun-group', '123');
      expect(opts).toEqual({});
    });

  });

  describe('fromJSONAttribute -', () => {

    function fromJSONAttribute(attr: string, attrValue: string): IOptions {
      let el = document.createElement('div');
      el.setAttribute(attr, attrValue);
      return OptionsParser.fromJSONAttribute(el);
    }

    it('should parse popgun-json attribute', () => {
      let val: Object = {
        trigger: 'hover, click',
        placement: 'top left',
        showDelay: '123',
        fadeDuration: 321,
        optimizePlacement: 'true',
        transitionPlacement: false
      };

      let opts = fromJSONAttribute('popgun-json', JSON.stringify(val));

      expect(deepEqual(opts, {
        trigger: [new Trigger('hover'), new Trigger('click')],
        placement: 'top left',
        showDelay: 123,
        fadeDuration: 321,
        optimizePlacement: true,
        transitionPlacement: false
      })).toBe(true);
    });

    it('should return empty object if empty value', () => {
      let opts = fromJSONAttribute('popgun-json', '');
      expect(opts).toEqual({});
    });

    it('should return empty object if invalid json', () => {
      let opts = fromJSONAttribute('popgun-json', 'hello');
      expect(opts).toEqual({});
    });

  });

  describe('fromSchemaAttribute -', () => {

    function fromSchemaAttribute(attr: string, attrValue: string): IOptions {
      let el = document.createElement('div');
      el.setAttribute(attr, attrValue);
      return OptionsParser.fromSchemaAttribute(el);
    }

    it('should parse popgun-schema attribute', () => {
      let val: Object = {
        trigger: 'hover, click',
        placement: 'top left',
        showDelay: '123',
        fadeDuration: 321,
        optimizePlacement: 'true',
        transitionPlacement: false
      };

      spyOn(schemaStore, 'get').and.returnValue(val);

      let opts = fromSchemaAttribute('popgun-schema', 'test');

      expect(deepEqual(opts, {
        trigger: [new Trigger('hover'), new Trigger('click')],
        placement: 'top left',
        showDelay: 123,
        fadeDuration: 321,
        optimizePlacement: true,
        transitionPlacement: false
      })).toBe(true);
    });

    it('should return empty object if schema does not exist', () => {
      spyOn(schemaStore, 'get').and.returnValue(undefined);
      let opts = fromSchemaAttribute('popgun-schema', 'test');
      expect(opts).toEqual({});
    });

  });

  describe('fromGroupAttribute -', () => {

    function fromGroupAttribute(attr: string, attrValue: string): IOptions {
      let el = document.createElement('div');
      el.setAttribute(attr, attrValue);
      return OptionsParser.fromGroupAttribute(el);
    }

    it('should parse popgun-group attribute', () => {
      let val: Object = {
        trigger: 'hover, click',
        placement: 'top left',
        showDelay: '123',
        fadeDuration: 321,
        optimizePlacement: 'true',
        transitionPlacement: false
      };

      spyOn(groupStore, 'get').and.returnValue({ options: val });

      let opts = fromGroupAttribute('popgun-group', 'test');

      expect(deepEqual(opts, {
        trigger: [new Trigger('hover'), new Trigger('click')],
        placement: 'top left',
        showDelay: 123,
        fadeDuration: 321,
        optimizePlacement: true,
        transitionPlacement: false
      })).toBe(true);
    });

    it('should return empty object if group does not exist', () => {
      spyOn(groupStore, 'get').and.returnValue(undefined);
      let opts = fromGroupAttribute('popgun-group', 'test');
      expect(opts).toEqual({});
    });

  });

  describe('fromGroupId - ', () => {

    it('should get priority group opts over schema', () => {
      let s: Object = {
        trigger: 'hover',
        placement: 'top left',
      };

      let opts: Object = {
        trigger: 'hover, click',
        placement: 'top left',
        showDelay: '123',
      };

      schemaStore.add('schemaTest', s);
      groupStore.add('groupTest', { options: opts });

      let result = OptionsParser.fromGroupId('groupTest');

      expect(deepEqual(result, {
        trigger: [new Trigger('hover'), new Trigger('click')],
        placement: 'top left',
        showDelay: 123
      })).toBe(true);
    });

  });

  describe('parseTriggers - ', () => {

    it('should properly parse space separated input', () => {
      expect(OptionsParser.parseTriggers('hover click'))
        .toEqual([new Trigger('hover'), new Trigger('click')]);
    });

    it('should properly parse comma separated input', () => {
      expect(OptionsParser.parseTriggers('click, manual, hover'))
        .toEqual([new Trigger('click'), new Trigger('manual'), new Trigger('hover')]);
    });

    it('should properly parse space and comma separated input', () => {
      expect(OptionsParser.parseTriggers('click manual hover, focus'))
        .toEqual([new Trigger('click'), new Trigger('manual'), new Trigger('hover'), new Trigger('focus')]);
    });

    it('should return an empty array for empty trigger', () => {
      expect(OptionsParser.parseTriggers(null)).toEqual([]);
    });

  });


});