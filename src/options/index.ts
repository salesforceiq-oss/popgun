import IOptions from './IOptions';
import defaultOptions from './default-options';
import Trigger from '../trigger';
import * as extend from 'extend';

let camelize = require('camelize');

export class Options implements IOptions {
  trigger: Trigger;
  content: string;
  placement: string;
  placementOffset: number;
  optimizePlacement: boolean;
  transitionPlacement: boolean;
  alignment: string;
  alignmentOffset: number;
  viewportPadding: number;
  timeToHoverOnPop: number;
  showDelay: number;
  fadeDuration: number;

  constructor(opts?: IOptions) {
    this.extendDefault(opts);
  }

  extendDefault(opts: IOptions): Options {
    return extend(this, defaultOptions, opts);
  }

  extend(opts: IOptions): Options {
    return extend(this, opts);
  }

  fromElement(el: Element): Options {
    if (!el) {
      return this;
    }

    for (let i = 0; i < el.attributes.length; i++) {
      let attr = el.attributes[i];
      let opts: IOptions = {};
      let key: string = camelize(attr.name);

      if (attr.name.indexOf('data-popgun-') === 0) {
        (<any>opts)[key] = attr.value;
      }
    }
  }
}