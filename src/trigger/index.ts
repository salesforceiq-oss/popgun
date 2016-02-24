// parse function that takes a string and turns it into an Array of Enums
// getEventType(string), returns the 

require('focusin').polyfill();
import EnumUtil, { IEnumValuesByName } from '../enum-util';

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
    let triggerValuesByName: IEnumValuesByName = EnumUtil.getValuesByName(TriggerName);
    let trigger = stringName.toUpperCase();

    if (trigger in triggerValuesByName) {
      this.name = triggerValuesByName[trigger];
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

function parse(rawTrigger: string): TriggerName[] {
  let triggerStrings: string[] = rawTrigger.split(/[ ,]+/);
  let triggerValuesByName: IEnumValuesByName = EnumUtil.getValuesByName(TriggerName);
  let triggerNameList: TriggerName[] = [];

  triggerStrings.forEach((trigger: string) => {
    let triggerStringName = trigger.toUpperCase();

    if (triggerStringName in triggerValuesByName) {
      triggerNameList.push(triggerValuesByName[triggerStringName]);
    }
  });

  return triggerNameList;
}

// TriggerName to TriggerType


export {
TriggerName,
TriggerEventType,
Trigger,
parse
}