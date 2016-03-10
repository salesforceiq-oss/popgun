import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import TriggerEventType from '../TriggerEventType';
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
    let t = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger = new Trigger(t);

    if (PopTarget.isPopForTrigger(<Element>e.target, trigger)) {
      let popTarget = new PopTarget(<Element>e.target, trigger);
      // add to cache map of pops to groups
    }
  }
}

export default new EventDelegate();