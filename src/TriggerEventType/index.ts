require('focusin').polyfill();

export default class TriggerEventType {
  static CLICK: string = 'click';
  static HOVER: string = 'mouseenter';
  static FOCUS: string = 'focusin';
  static MANUAL: string = 'popgun-manual';

  static triggerEventTypeToTriggerType(eventType: string): string {
    switch (eventType) {
      case 'click':
        return 'click';
      case 'mouseenter':
        return 'hover';
      case 'focusin':
        return 'focus';
      case 'popgun-manual':
        return 'manual';
    }
  }
}