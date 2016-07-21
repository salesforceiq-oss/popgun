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
      if (popEngine.isPopAlreadyOpenForTarget(target)) {
        popChainManager.maybePinOrUnpinPopAndParentPops(target, isPinned);
      } else {
        this._showPop(target, trigger);
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
      if (popEngine.isPopAlreadyOpenForTarget(target)) {
        popEngine.clearTimeout(target);
      } else {
        this._showPop(target, trigger);
      }
    } else if (popEngine.isPop(target)) {
      target = <Element>closest(e.target, '[pop]', true);
      let pop = popEngine.getPopFromGroupId(target.getAttribute('pop-id'));
      popEngine.clearTimeout(pop.targetEl);
      this._clearParentPops(pop);
    }
  }

  public onFocus(e: Event): void {
    let t: string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger: Trigger = new Trigger(t);
    let target: Element = <Element>closest(e.target, '[popgun]', true) || <Element>closest(e.target, '[pop]', true);

    if (popEngine.isPopForTrigger(target, trigger)) {
      this._showPop(target, trigger);
    } else if (popEngine.isPop(target)) {
      popEngine.clearTimeout(target);
    }
  }

  public onManual(e: Event): void {
    let t: string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger: Trigger = new Trigger(t);
    let target: Element = <Element>closest(e.target, '[popgun]', true);

    if (popEngine.isPopForTrigger(target, trigger)) {
      this._showPop(target, trigger);
    }
  }

  public onMouseOut(e: MouseEvent): void {
    let target: Element = <Element>closest(e.target, '[pop]', true);
    if (!!target) {
      let relatedTarget: Element = <Element>closest(e.relatedTarget, '[pop]', true);
      if (!!relatedTarget && target !== relatedTarget) {
        // hovering into another pop
        // ensure its not the same closest pop
        // see if they are in the same chain..
        let targetPop = popEngine.getPopFromGroupId(target.getAttribute('pop-id'));
        let relatedPop = popEngine.getPopFromGroupId(relatedTarget.getAttribute('pop-id'));
        if (!(targetPop.parentPop === relatedPop || relatedPop.parentPop === targetPop) && !targetPop.targetEl.hasAttribute('pinned-pop')) {
          // if they arent related to each other
          popEngine.hidePop(targetPop.targetEl, false);
          return;
        }
      } else if (!relatedTarget) {
        // hovering into nothing
        let pop = popEngine.getPopFromGroupId(target.getAttribute('pop-id'));
        if (popEngine.isPopForTrigger(pop.targetEl, (new Trigger('hover'))) && !pop.targetEl.hasAttribute('pinned-pop')) {
          // hide pop is the target is not pinned
          popEngine.hidePop(pop.targetEl, false);
          return;
        }
      } else {
        let pop = popEngine.getPopFromGroupId(target.getAttribute('pop-id'));
        popEngine.clearTimeout(pop.targetEl);
        return;
      }
    }

    target = <Element>closest(e.target, '[popgun]', true);
    if (!!target) {
      let relatedTarget: Element = <Element>closest(e.relatedTarget, '[popgun]', true);
      if (!!relatedTarget && target !== relatedTarget && !target.hasAttribute('pinned-pop')) {
        // hovering into a popgun element
        // ensure its not the same closest el
        popEngine.hidePop(target, false);
        return;
      } else if (!relatedTarget && popEngine.isPopForTrigger(target, (new Trigger('hover'))) && !target.hasAttribute('pinned-pop')) {
        // hovering into nothing
        // hide if pop isn't pinned
        popEngine.hidePop(target, false);
        return;
      } else {
        popEngine.clearTimeout(target);
        return;
      }
    }
  }

  private _clearParentPops(pop: Pop): void {
    if (pop) {
      while (!!pop.parentPop) {
        popEngine.clearTimeout(pop.parentPop.targetEl);
        pop = pop.parentPop;
      }
    }
  }

  private _showPop(target: Element, trigger: Trigger): void {
    let pop = new Pop(target, trigger);
    let isPinned = trigger.name === TriggerType.CLICK;
    popEngine.showPop(target, isPinned, pop);
  }

  private _setEventListener(trigger: Trigger, listener: (e: Event) => void): void {
    document.removeEventListener(<string>trigger.eventType, listener.bind(this));
    document.addEventListener(<string>trigger.eventType, listener.bind(this), trigger.useCapture);
  }
}

export default new EventDelegate();
