require('focusin').polyfill();

export default class TriggerEventType {
  static CLICK: string = 'click';
  static HOVER: string = 'mouseover';
  static FOCUS: string = 'focusin';
  static MANUAL: string = 'popgun-manual';
  static MOUSEOUT: string = 'mouseout';

  static triggerEventTypeToTriggerType(eventType: string): string {
    switch (eventType) {
      case 'click':
        return 'click';
      case 'mouseover':
        return 'hover';
      case 'focusin':
        return 'focus';
      case 'popgun-manual':
        return 'manual';
      case 'mouseout':
        return 'mouseout';
    }
  }
}