enum TriggerName {
  CLICK,
  HOVER,
  FOCUS,
  MANUAL
}

class TriggerEventType {
  static CLICK: string = 'click';
  static HOVER: string = 'mouseenter';
  static FOCUS: string = 'focusin';
  static MANUAL: string = 'popgun-manual';
}

class Trigger {
  name: TriggerName;
  eventType: TriggerEventType;
  useCapture: boolean;

  constructor(stringName: string) {
    this._setName(stringName);
    this._setEventType();
    this._setUseCapture();
  }

  private _setName(stringName: string): void {
    switch (stringName.toUpperCase()) {
      case 'CLICK':
        this.name = TriggerName.CLICK;
        break;
      case 'HOVER':
        this.name = TriggerName.HOVER;
        break;
      case 'FOCUS':
        this.name = TriggerName.FOCUS;
        break;
      case 'MANUAL':
        this.name = TriggerName.MANUAL;
        break;
    }
  }

  private _setEventType(): void {
    switch (this.name) {
      case TriggerName.CLICK:
        this.eventType = TriggerEventType.CLICK;
        break;
      case TriggerName.HOVER:
        this.eventType = TriggerEventType.HOVER;
        break;
      case TriggerName.FOCUS:
        this.eventType = TriggerEventType.FOCUS;
        break;
      case TriggerName.MANUAL:
        this.eventType = TriggerEventType.MANUAL;
        break;
    }
  }

  private _setUseCapture(): void {
    switch (this.name) {
      case TriggerName.FOCUS:
        this.useCapture = true;
        break;
      default:
        this.useCapture = false;
    }
  }
}

export default Trigger;
export {
  TriggerName,
  TriggerEventType
}