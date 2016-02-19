import Trigger from '../trigger';
import * as extend from 'extend';

export interface IOptions {
  trigger?: Trigger;
  content?: string;
  placement?: string;
  placementOffset?: number;
  optimizePlacement?: boolean;
  transitionPlacement?: boolean;
  alignment?: string;
  alignmentOffset?: number;
  viewportPadding?: number;
  timeToHoverOnPop?: number;
  showDelay?: number;
  fadeDuration?: number;
}

export let defaultOptions: IOptions = {
  trigger: new Trigger('hover'),
  content: '',
  placement: 'top',
  placementOffset: 8,
  optimizePlacement: true,
  transitionPlacement: true,
  alignment: '',
  alignmentOffset: 0,
  viewportPadding: 10,
  timeToHoverOnPop: 300,
  showDelay: 0,
  fadeDuration: 100
};

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
}