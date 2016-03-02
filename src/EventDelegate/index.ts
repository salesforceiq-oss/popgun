import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import EnumUtil from '../EnumUtil';
import PopTarget from '../PopTarget';

export class EventDelegate {
  init(): void {
    EnumUtil.getNames(TriggerType).forEach((rawTriggerType: string) => {
      let trigger: Trigger = new Trigger(rawTriggerType);
      let eventType: string = <string>trigger.eventType;

      document.removeEventListener(eventType, this.listener);
      document.addEventListener(eventType, this.listener, trigger.useCapture);
    });
  }

  listener(e: Event): void {
    if (PopTarget.isPopForTrigger(<Element>e.target, e.type)) {
      // new PopTarget(e.target, e.type, Options);
    }
  }
}

export default new EventDelegate();