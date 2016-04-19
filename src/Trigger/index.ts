import EnumUtil, { IEnumValuesByName } from '../EnumUtil';
import TriggerEventType from '../TriggerEventType';
import TriggerType from '../TriggerType';

export default class Trigger {
  name: TriggerType;
  eventType: TriggerEventType;
  useCapture: boolean;

  constructor(stringName: string) {
    this._setName(stringName);
    this._setEventType();
    this._setUseCapture();
  }

  private _setName(stringName: string): void {
    let triggerValuesByName: IEnumValuesByName = EnumUtil.getValuesByName(TriggerType);
    let trigger = stringName.toUpperCase();

    if (trigger in triggerValuesByName) {
      this.name = triggerValuesByName[trigger];
    }
  }

  private _setEventType(): void {
    switch (this.name) {
      case TriggerType.CLICK:
        this.eventType = TriggerEventType.CLICK;
        break;
      case TriggerType.HOVER:
        this.eventType = TriggerEventType.HOVER;
        break;
      case TriggerType.FOCUS:
        this.eventType = TriggerEventType.FOCUS;
        break;
      case TriggerType.MANUAL:
        this.eventType = TriggerEventType.MANUAL;
        break;
      case TriggerType.MOUSEOUT:
        this.eventType = TriggerEventType.MOUSEOUT;
        break;
    }
  }

  private _setUseCapture(): void {
    switch (this.name) {
      case TriggerType.FOCUS:
        this.useCapture = true;
        break;
      default:
        this.useCapture = false;
    }
  }
}