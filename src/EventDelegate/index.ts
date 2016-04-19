import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import TriggerEventType from '../TriggerEventType';
import EnumUtil from '../EnumUtil';
import Pop from '../Pop';
import popEngine from '../PopEngine';

export class EventDelegate {
  public init(): void {
    EnumUtil.getNames(TriggerType).forEach((rawTriggerType: string) => {
      let trigger: Trigger = new Trigger(rawTriggerType);
      let eventType: string = <string>trigger.eventType;

      document.removeEventListener(eventType, this.listener);
      document.addEventListener(eventType, this.listener, trigger.useCapture);
    });
  }

  public listener(e: Event): void {
    let t = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger = new Trigger(t);

    // if hover is a trigger and event type is mouseout, hidePop()
    // unless i figure out how to add mouseout to the el..
    if (e.type === 'mouseout' && popEngine.isPopForTrigger(<Element>e.target, (new Trigger('hover')))) {
      popEngine.hidePop(<Element>e.target);
    } else if (popEngine.isPopForTrigger(<Element>e.target, trigger)) {
      let pop = new Pop(<Element>e.target, trigger);
      let isPinned = trigger.name === TriggerType.CLICK;
      popEngine.showPop(<Element>e.target, isPinned, pop);
    }
  }
}

export default new EventDelegate();