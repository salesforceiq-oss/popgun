require('focusin').polyfill();

export default class TriggerEventType {
  static CLICK: string = 'click';
  static HOVER: string = 'mouseenter';
  static FOCUS: string = 'focusin';
  static MANUAL: string = 'popgun-manual';
}