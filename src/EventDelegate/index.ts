import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import TriggerEventType from '../TriggerEventType';
import EnumUtil from '../EnumUtil';
import Pop from '../Pop';
import popEngine from '../PopEngine';
import popChainManager from '../PopChainManager';
import timeoutManager from '../TimeoutManager';
let closest = require('closest');

export class EventDelegate {

  public init(): void {
    this._setEventListener(new Trigger(TriggerType[TriggerType['CLICK']]), this.onClick);
    this._setEventListener(new Trigger(TriggerType[TriggerType['BLUR']]), this.onBlur);
    this._setEventListener(new Trigger(TriggerType[TriggerType['FOCUS']]), this.onFocus);
    this._setEventListener(new Trigger(TriggerType[TriggerType['HOVER']]), this.onHover);
    this._setEventListener(new Trigger(TriggerType[TriggerType['MANUAL']]), this.onManual);
    this._setEventListener(new Trigger(TriggerType[TriggerType['MOUSEOUT']]), this.onMouseOut);
    popEngine.listenForScroll();
  }

  public onClick(e: MouseEvent): void {
    let t: string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger: Trigger = new Trigger(t);
    let target: Element = <Element>closest(e.target, '[popgun]', true) || <Element>closest(e.target, '[pop]', true);
    let isPinned = trigger.name === TriggerType.CLICK;

    if (popEngine.isPopForTrigger(target, trigger)) {
      if (popEngine.isPopAlreadyOpenForTarget(target)) {
        if (target.hasAttribute('pinned-pop')) {
          target.setAttribute('unpinned-pop', '');
          popEngine.hidePop(target, false);
        } else {
          popChainManager.maybePinOrUnpinPopAndParentPops(target, isPinned);
        }
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
        let groupId = target.getAttribute('popgun-group');
        timeoutManager.maybeClearTimeout(timeoutManager.getTimeouts().timeToHoverOnPop, groupId);
      } else {
        if (!target.hasAttribute('unpinned-pop')) {
          this._showPop(target, trigger);
        }
      }
    } else if (popEngine.isPop(target)) {
      target = <Element>closest(e.target, '[pop]', true);
      let groupId = target.getAttribute('pop-id');
      let pop = popEngine.getPopFromGroupId(groupId);
      timeoutManager.maybeClearTimeout(timeoutManager.getTimeouts().timeToHoverOnPop, groupId);
      this._clearParentPops(pop);
    }
  }

  public onBlur(e: Event): void {
    let t: string = TriggerEventType.triggerEventTypeToTriggerType('focusin');
    let trigger: Trigger = new Trigger(t);
    let target: Element = <Element>closest(e.target, '[popgun]', true);

    if (popEngine.isPopForTrigger(target, trigger)) {
      popEngine.hidePop(target, false);
    }
  }

  public onFocus(e: Event): void {
    let t: string = TriggerEventType.triggerEventTypeToTriggerType(e.type);
    let trigger: Trigger = new Trigger(t);
    let target: Element = <Element>closest(e.target, '[popgun]', true) || <Element>closest(e.target, '[pop]', true);

    if (popEngine.isPopForTrigger(target, trigger)) {
      this._showPop(target, trigger);
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
      let groupId = target.getAttribute('pop-id');
      let relatedTarget: Element = <Element>closest(e.relatedTarget, '[pop-id="' + groupId + '"]', true);
      if (!!relatedTarget) {
        // same pop
        timeoutManager.maybeClearTimeout(timeoutManager.getTimeouts().timeToHoverOnPop, groupId);
        return;
      } else {
        relatedTarget = <Element>closest(e.relatedTarget, '[pop]', true);
        if (!!relatedTarget) {
          // hovering into another pop
          // ensure its not the same closest pop
          // see if they are in the same chain..
          let targetPop = popEngine.getPopFromGroupId(groupId);
          let relatedPop = popEngine.getPopFromGroupId(relatedTarget.getAttribute('pop-id'));
          if (!(targetPop.parentPop === relatedPop || relatedPop.parentPop === targetPop) && !targetPop.targetEl.hasAttribute('pinned-pop')) {
            // if they arent related to each other
            popEngine.hidePop(targetPop.targetEl, false);
            return;
          }
        } else {
          let pop = popEngine.getPopFromGroupId(groupId);
          if (popEngine.isPopForTrigger(pop.targetEl, (new Trigger('hover'))) && !pop.targetEl.hasAttribute('pinned-pop')) {
            // hide pop is the target is not pinned
            pop.targetEl.removeAttribute('unpinned-pop');
            popEngine.hidePop(pop.targetEl, false);
            return;
          }
        }
      }
    }

    target = <Element>closest(e.target, '[popgun]', true);
    if (!!target) {
      let groupId = target.getAttribute('popgun-group');
      // error guard
      if (!e.relatedTarget || !groupId) { return; }
      let relatedTarget: Element = <Element>closest(e.relatedTarget, '[popgun-group="' + groupId + '"]', true);

      if (!!relatedTarget) {
        // same popgun target
        timeoutManager.maybeClearTimeout(timeoutManager.getTimeouts().timeToHoverOnPop, groupId);
        return;
      } else if (!target.hasAttribute('pinned-pop')) {
        // hovering into nothing
        // hide if pop isn't pinned
        target.removeAttribute('unpinned-pop');
        let focusTrigger = new Trigger('focus');
        if (!popEngine.isPopForTrigger(target, focusTrigger)) {
          popEngine.hidePop(target, false);
        }
        return;
      }
    }
  }

  private _clearParentPops(pop: Pop): void {
    if (pop) {
      while (!!pop.parentPop) {
        let groupId = pop.parentPop.targetEl.getAttribute('pop-id');
        timeoutManager.maybeClearTimeout(timeoutManager.getTimeouts().timeToHoverOnPop, groupId);
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
