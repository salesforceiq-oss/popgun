import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import TriggerEventType from '../TriggerEventType';
import EnumUtil from '../EnumUtil';
import Pop from '../Pop';
import popEngine from '../PopEngine';
let closest = require('closest');

export class EventDelegate {

  private _setEventListener(trigger: Trigger, listener: (e: Event) => void): void {
    document.removeEventListener(<string>trigger.eventType, listener);
    document.addEventListener(<string>trigger.eventType, listener, trigger.useCapture);
  } 
  public init(): void {

    this._setEventListener(new Trigger(TriggerType[TriggerType["CLICK"]]), this.onClick);
    this._setEventListener(new Trigger(TriggerType[TriggerType["HOVER"]]), this.onHover);
    this._setEventListener(new Trigger(TriggerType[TriggerType["FOCUS"]]), this.onFocus);
    this._setEventListener(new Trigger(TriggerType[TriggerType["MANUAL"]]), this.onManual);
    this._setEventListener(new Trigger(TriggerType[TriggerType["MOUSEOUT"]]), this.onMouseOut);
  }

  public onClick(e: MouseEvent): void {
    let t:string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger:Trigger = new Trigger(t);
    let target:Element = <Element>e.target;
    let isPinned = trigger.name === TriggerType.CLICK;
    if (popEngine.isPopForTrigger(target, trigger)) {
      if (popEngine.isPopAlreadyOpen(target)) {
        popEngine.maybePinOrUnpinPopAndParentPops(target, isPinned);
      } else {
        let pop = new Pop(target, trigger);
        popEngine.showPop(target, isPinned, pop);
      }
    }
    if (popEngine.isPopForTrigger(target, trigger) && !popEngine.isPopAlreadyOpen(target)) {
      let pop = new Pop(target, trigger);
      let isPinned = trigger.name === TriggerType.CLICK;
      popEngine.showPop(target, isPinned, pop);
    } else if (!popEngine.isPopTarget(target)) {
      popEngine.popTopPop();
    }
  }

  public onHover(e: MouseEvent): void {
    let t:string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger:Trigger = new Trigger(t);
    let target:Element = <Element>e.target;
    if (popEngine.isPopForTrigger(target, trigger)) {
      if (popEngine.isPopAlreadyOpen(target)) {
        popEngine.clearTimeout(target);
      } else {
        let pop = new Pop(target, trigger);
        let isPinned = trigger.name === TriggerType.CLICK;
        popEngine.showPop(target, isPinned, pop);
      }
    } else {
      if (popEngine.isPop(target)) {
        let popId = target.getAttribute('pop-id');
        popEngine.clearTimeout(target);
      }
    }
  }

  public onFocus(e: Event): void {
    let t:string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger:Trigger = new Trigger(t);
    let target:Element = <Element>e.target;

    if (popEngine.isPopForTrigger(target, trigger)) {
      let pop = new Pop(target, trigger);
      let isPinned = false; // not pinned because the the trigger was not a click
      popEngine.showPop(target, isPinned, pop);
    }
  }

  public onManual(e: Event): void {
    let t:string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger:Trigger = new Trigger(t);
    let target:Element = <Element>e.target;

    if (popEngine.isPopForTrigger(target, trigger)) {
      let pop = new Pop(target, trigger);
      let isPinned = trigger.name === TriggerType.CLICK;
      popEngine.showPop(target, isPinned, pop);
    }
  }

  public onMouseOut(e: MouseEvent): void {
    let target:Element = <Element>e.target;
    let relatedTarget:Element = <Element>e.relatedTarget;
    if ((popEngine.isPopForTrigger(target, (new Trigger('hover')))) &&
      !(target).hasAttribute('pinned-pop')) {
      popEngine.hidePop(target);
    }

    if (target.hasAttribute('pop') && !popEngine.getPopFromGroupId(target.getAttribute('pop-id')).isPinned) {
      if (!(popEngine.isPopTarget(relatedTarget)) && !(popEngine.isPop(relatedTarget))) {
        popEngine.hidePop(target);
      }
    }
  }
}

export default new EventDelegate();