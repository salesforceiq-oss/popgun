require('focusin').polyfill();

export default class TriggerEventType {
  static CLICK: string = 'click';
  static BLUR: string = 'focusout';
  static FOCUS: string = 'focusin';
  static HOVER: string = 'mouseover';
  static MANUAL: string = 'popgun-manual';
  static MOUSEOUT: string = 'mouseout';

  static triggerEventTypeToTriggerType(eventType: string): string {
    switch (eventType) {
      case 'click':
        return 'click';
      case 'focusout':
        return 'blur';
      case 'focusin':
        return 'focus';
      case 'mouseover':
        return 'hover';
      case 'mouseout':
        return 'mouseout';
      case 'popgun-manual':
        return 'manual';
      
    }
  }
}
