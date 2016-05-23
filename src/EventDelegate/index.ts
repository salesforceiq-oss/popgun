import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import TriggerEventType from '../TriggerEventType';
import EnumUtil from '../EnumUtil';
import Pop from '../Pop';
import popEngine from '../PopEngine';
let closest = require('closest');

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

    // disgusting, must clean up
    if (popEngine.isPopForTrigger(<Element>e.target, trigger)) {
      // trigger on target
      console.log(e.type + ' on target');
      let pop = new Pop(<Element>e.target, trigger);
      let isPinned = trigger.name === TriggerType.CLICK;
      popEngine.showPop(<Element>e.target, isPinned, pop);
    } else if (popEngine.isPop(<Element>e.target) &&
                e.type === TriggerEventType.HOVER) {
      // mouseover on pop
      console.log('mouseover on pop');
      let popEl = closest((<Element>e.target), 'div[pop=""]') || (<Element>e.target);
      let pop = popEngine.getPopFromGroupId(popEl.getAttribute('pop-id'));
      let isPinned = trigger.name === TriggerType.CLICK;
      popEngine.showPop(pop.targetEl, isPinned, pop);
    } else if (e.type === TriggerEventType.MOUSEOUT &&
                popEngine.isPopForTrigger(<Element>e.target, (new Trigger('hover'))) &&
                !(<Element>e.target).hasAttribute('pinned-pop')) {
      // mouseout on target
      console.log('mouseout on target');
      popEngine.hidePop(<Element>e.target);
    } else if ((<Element>e.target).hasAttribute('pop') &&
                e.type === TriggerEventType.MOUSEOUT) {
      // mouseout on pop
      console.log('mouseout on pop');
      let pop = popEngine.getPopFromGroupId((<Element>e.target).getAttribute('pop-id'));
      if (!pop.targetEl.hasAttribute('pinned-pop')) {
        popEngine.hidePop(pop.targetEl);
      }
    } else if (t === TriggerEventType.CLICK &&
                !popEngine.isPopTarget(<Element>e.target)) {
      popEngine.popTopPop();
    }

  }
}

export default new EventDelegate();