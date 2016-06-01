import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import TriggerEventType from '../TriggerEventType';
import EnumUtil from '../EnumUtil';
import Pop from '../Pop';
import popEngine from '../PopEngine';
let closest = require('closest');

export class EventDelegate {
  public init(): void {

    let trigger:Trigger = new Trigger(TriggerType[TriggerType["CLICK"]]);
    document.removeEventListener(TriggerEventType.CLICK, this.onClick);
    document.addEventListener(TriggerEventType.CLICK, this.onClick, trigger.useCapture);

    trigger = new Trigger(TriggerType[TriggerType["HOVER"]]);
    document.removeEventListener(TriggerEventType.HOVER, this.onHover);
    document.addEventListener(TriggerEventType.HOVER, this.onHover, trigger.useCapture);

    trigger = new Trigger(TriggerType[TriggerType["FOCUS"]]);
    document.removeEventListener(TriggerEventType.FOCUS, this.onFocus);
    document.addEventListener(TriggerEventType.FOCUS, this.onFocus, trigger.useCapture);

    trigger = new Trigger(TriggerType[TriggerType["MANUAL"]]);
    document.removeEventListener(TriggerEventType.MANUAL, this.onManual);
    document.addEventListener(TriggerEventType.MANUAL, this.onManual, trigger.useCapture);

    trigger = new Trigger(TriggerType[TriggerType["MOUSEOUT"]]);
    document.removeEventListener(TriggerEventType.MOUSEOUT, this.onMouseOut);
    document.addEventListener(TriggerEventType.MOUSEOUT, this.onMouseOut, trigger.useCapture);

  }

  public onClick(e: MouseEvent): void {
    let t:string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger:Trigger = new Trigger(t);
    let target:Element = <Element>e.target;
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
        popEngine.clearTimeoutByGroupId(target.getAttribute('pop-id'));
      }
    }
  }

  public onFocus(e: Event): void {

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

  public listener(e: Event): void {
    let t:string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger:Trigger = new Trigger(t);
    let target:Element = <Element>e.target;
    if (popEngine.isPopForTrigger(target, trigger)) {
      let pop = new Pop(target, trigger);
      let isPinned = trigger.name === TriggerType.CLICK;
      popEngine.showPop(target, isPinned, pop);
    }
  }
}

export default new EventDelegate();