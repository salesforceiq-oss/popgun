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

function getEventTypes(rawTrigger: string): TriggerEventType[] {
  let triggerNameList: TriggerName[] = parse(rawTrigger);
  let triggerEventTypeList: TriggerEventType[] = [];

  triggerNameList.forEach((trigger: TriggerName) => {
      triggerEventTypeList.push(getEventType(trigger));
  });

  return triggerEventTypeList;
}

function getEventType(trigger: TriggerName): TriggerEventType {
  switch (trigger) {
    case TriggerName.CLICK:
      return TriggerEventType.CLICK;
    case TriggerName.HOVER:
      return TriggerEventType.HOVER;
    case TriggerName.FOCUS:
      return TriggerEventType.FOCUS;
    case TriggerName.MANUAL:
      return TriggerEventType.MANUAL;
  }
}

function isUseCapture(trigger: TriggerName): boolean {
  switch (trigger) {
    case TriggerName.FOCUS:
      return true;
    default:
      return false;
  }
}

export {
  TriggerName,
  TriggerEventType,
  parse,
  getEventTypes,
  getEventType,
  isUseCapture
}