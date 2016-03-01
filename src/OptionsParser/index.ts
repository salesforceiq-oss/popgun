import IOptions from '../IOptions';
import Trigger from '../Trigger';
import schemaStore from '../SchemaStore';
import groupStore from '../GroupStore';
import IGroup from '../IGroup';
import * as extend from 'extend';

let camelize = require('camelize');

export default class OptionsParser {

  static fromLiteral(opts: { [key: string]: any }): IOptions {
    let result: IOptions = {};

    if (opts) {
      Object.keys(opts).forEach((key: string) => {
        let value: any = opts[key];

        switch (key) {
          case 'trigger':
            value = this.parseTriggers(value);
            break;
          case 'placementOffset':
          case 'alignmentOffset':
          case 'viewportPadding':
          case 'timeToHoverOnPop':
          case 'showDelay':
          case 'fadeDuration':
            value = parseFloat(value);
            break;
          case 'optimizePlacement':
          case 'transitionPlacement':
            value = typeof value === 'string' ? value === 'true' : !!value;
            break;
        }

        (<any>result)[key] = value;
      });
    }

    return result;
  }

  static fromElement(el: Element): IOptions {
    return extend(
      OptionsParser.fromGroupAttribute(el),
      OptionsParser.fromSchemaAttribute(el),
      OptionsParser.fromJSONAttribute(el),
      OptionsParser.fromSingleAttributes(el)
    );
  }

  static fromSingleAttributes(el: Element): IOptions {
    let result: IOptions = {};

    if (el) {
      for (let i = 0; i < el.attributes.length; i++) {
        let attr = el.attributes[i];

        if (attr.name.indexOf('popgun-') === 0) {
          let key: string = camelize(attr.name.substring(7));

          if (key !== 'group' && key !== 'schema' && key !== 'json') {
            (<any>result)[key] = attr.value;
          }
        }
      }
    }

    return OptionsParser.fromLiteral(result);
  }

  static fromJSONAttribute(el: Element): IOptions {
    let json: string = el.getAttribute('popgun-json');

    if (json) {
      try {
        let parsed: Object = JSON.parse(json);

        if (parsed && parsed.constructor === Object) {
          return OptionsParser.fromLiteral(parsed);
        }
      } catch (e) {
        // fall through
      }
    }

    return {};
  }

  static fromSchemaAttribute(el: Element): IOptions {
    let schemaId: string = el.getAttribute('popgun-schema');

    return OptionsParser.fromLiteral(schemaStore.get(schemaId));
  }

  static fromGroupAttribute(el: Element): IOptions {
    let groupId: string = el.getAttribute('popgun-group');
    return OptionsParser.fromGroupId(groupId);
  }

  static fromGroupId(id: string): IOptions {
    let group: IGroup = groupStore.get(id);

    if (group) {
      return OptionsParser.fromLiteral(
        extend({}, schemaStore.get(group.schema), group.options)
      );
    } else {
      return {};
    }
  }

  static parseTriggers(rawTrigger: string): Trigger[] {
    if (rawTrigger && typeof rawTrigger === 'string') {
      return rawTrigger.split(/[ ,]+/).map((name: string) => new Trigger(name));
    } else {
      return [];
    }
  }

}