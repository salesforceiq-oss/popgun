import Trigger from '../trigger';

export interface Options {
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
}

export let defaultOptions: Options = {
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