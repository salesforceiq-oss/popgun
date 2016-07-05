import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import TriggerEventType from '../TriggerEventType';
import EnumUtil from '../EnumUtil';
import Pop from '../Pop';
import popEngine from '../PopEngine';
import popChainManager from '../PopChainManager';
let closest = require('closest');

export class EventDelegate {

  public init(): void {
    this._setEventListener(new Trigger(TriggerType[TriggerType['CLICK']]), this.onClick);
    this._setEventListener(new Trigger(TriggerType[TriggerType['HOVER']]), this.onHover);
    this._setEventListener(new Trigger(TriggerType[TriggerType['FOCUS']]), this.onFocus);
    this._setEventListener(new Trigger(TriggerType[TriggerType['MANUAL']]), this.onManual);
    this._setEventListener(new Trigger(TriggerType[TriggerType['MOUSEOUT']]), this.onMouseOut);
  }

  public onClick(e: MouseEvent): void {
    let t: string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger: Trigger = new Trigger(t);
    let target: Element = <Element>closest(e.target, '[popgun]', true) || <Element>closest(e.target, '[pop]', true);
    let isPinned = trigger.name === TriggerType.CLICK;

    if (popEngine.isPopForTrigger(target, trigger)) {
      if (popEngine.isPopAlreadyOpen(target)) {
        popChainManager.maybePinOrUnpinPopAndParentPops(target, isPinned);
      } else {
        let pop = new Pop(target, trigger);
        // if pop is nested within another pop, set parent-child relationship
        if (!!popChainManager.isNestedPop(pop)) {
          let parent = popEngine.getPopFromGroupId((<Element>closest(pop.targetEl, '[pop]', true)).getAttribute('pop-id'));
          popChainManager.setParentChildRelationship(parent, pop);
        }
        popEngine.showPop(target, isPinned, pop);
      }
    } else if (!popEngine.isPopTarget(target) && !popEngine.isPop(target)) {
      popEngine.popTopPop();
    }
  }

  public onHover(e: MouseEvent): void {
    let t: string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger: Trigger = new Trigger(t);
    let target: Element = <Element>closest(e.target, '[popgun]', true) || <Element>closest(e.target, '[pop]', true);

    if (popEngine.isPopForTrigger(target, trigger)) {
      if (popEngine.isPopAlreadyOpen(target)) {
        popEngine.clearTimeout(target);
      } else {
        let pop = new Pop(target, trigger);
        if (!!popChainManager.isNestedPop(pop)) {
          let parent = popEngine.getPopFromGroupId((<Element>closest(pop.targetEl, '[pop]', true)).getAttribute('pop-id'));
          popChainManager.setParentChildRelationship(parent, pop);
        }
        let isPinned = trigger.name === TriggerType.CLICK;
        popEngine.showPop(target, isPinned, pop);
      }
    } else if (popEngine.isPop(target)) {
      popEngine.clearTimeout(target);
    }
  }

  public onFocus(e: Event): void {
    let t: string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger: Trigger = new Trigger(t);
    let target: Element = <Element>closest(e.target, '[popgun]', true) || <Element>closest(e.target, '[pop]', true);

    if (popEngine.isPopForTrigger(target, trigger)) {
      let pop = new Pop(target, trigger);
      if (!!popChainManager.isNestedPop(pop)) {
        let parent = popEngine.getPopFromGroupId((<Element>closest(pop.targetEl, '[pop]', true)).getAttribute('pop-id'));
        popChainManager.setParentChildRelationship(parent, pop);
      }
      let isPinned = false; // not pinned because the the trigger was not a click
      popEngine.showPop(target, isPinned, pop);
    } else if (popEngine.isPop(target)) {
      popEngine.clearTimeout(target);
    }
  }

  public onManual(e: Event): void {
    let t: string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger: Trigger = new Trigger(t);
    let target: Element = <Element>closest(e.target, '[popgun]', true);

    if (popEngine.isPopForTrigger(target, trigger)) {
      let pop = new Pop(target, trigger);
      if (!!popChainManager.isNestedPop(pop)) {
        let parent = popEngine.getPopFromGroupId((<Element>closest(pop.targetEl, '[pop]', true)).getAttribute('pop-id'));
        popChainManager.setParentChildRelationship(parent, pop);
      }
      let isPinned = trigger.name === TriggerType.CLICK;
      popEngine.showPop(target, isPinned, pop);
    }
  }

  public onMouseOut(e: MouseEvent): void {
    let target: Element = <Element>closest(e.target, '[popgun]', true);
    let relatedTarget: Element = <Element>e.relatedTarget;
    if ((popEngine.isPopForTrigger(target, (new Trigger('hover')))) &&
      !(target).hasAttribute('pinned-pop')) {
      popEngine.hidePop(target, false);
    }

    target = closest(e.target, '[pop]', true);
    if (target && target.hasAttribute('pop') &&
        !popEngine.getPopFromGroupId(target.getAttribute('pop-id')).isPinned) {
      if (!(popEngine.isPopTarget(relatedTarget)) && !(popEngine.isPop(relatedTarget))) {
        popEngine.hidePop(target, false);
      }
    }
  }

  private _setEventListener(trigger: Trigger, listener: (e: Event) => void): void {
    document.removeEventListener(<string>trigger.eventType, listener);
    document.addEventListener(<string>trigger.eventType, listener, trigger.useCapture);
  }
}

export default new EventDelegate();
