import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import EnumUtil from '../EnumUtil';

export class EventDelegate {
  init(): void {
    EnumUtil.getNames(TriggerType).forEach((rawTriggerType: string) => {
      let trigger: Trigger = new Trigger(rawTriggerType);
      let eventType: string = <string>trigger.eventType;

      document.removeEventListener(eventType, this.listener);
      document.addEventListener(eventType, this.listener, trigger.useCapture);
    });
  }

  listener(): void {
    console.log('hello world');
  }
}

export default new EventDelegate();