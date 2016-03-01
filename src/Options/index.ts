import IOptions from '../IOptions';
import defaultOptions from '../DefaultOptions';
import * as extend from 'extend';
import Trigger from '../Trigger';
import OptionsParser from '../OptionsParser';

export default class Options implements IOptions {
  trigger: Trigger[];
  html: string;
  text: string;
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

  constructor(opts?: { [key: string]: any }) {
    this.extendDefault(OptionsParser.fromLiteral(opts));
  }

  extendDefault(opts: IOptions): Options {
    return extend(this, defaultOptions, opts);
  }

  extend(opts: IOptions): Options {
    return extend(this, opts);
  }

}