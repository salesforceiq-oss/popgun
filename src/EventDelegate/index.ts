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
      popEngine.clearTimeout(target);
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
    let target: Element = <Element>closest(e.target, '[popgun]', true);
    let relatedTarget: Element = <Element>e.relatedTarget;
    // this checks if the element we are leaving is a hover and is not pinned, then hide
    // this also assume that the target is a trigger element
    if ((popEngine.isPopForTrigger(target, (new Trigger('hover')))) &&
      !(target).hasAttribute('pinned-pop')) {
      popEngine.hidePop(target, false);
    }

    target = closest(e.target, '[pop]', true);
    // this now assume sthat the target is a pop element
    // check if the pop has NOT been pinned and is actually a pop
    if (target && target.hasAttribute('pop') &&
        !popEngine.getPopFromGroupId(target.getAttribute('pop-id')).isPinned) {

      let targetGroup = /* target.getAttribute('popgun-group') || */ target.getAttribute('pop-id');
      let relatedTargetGroup = relatedTarget.getAttribute('popgun-group');

      let targetPop = popEngine.getPopFromGroupId(targetGroup);
      let relatedPop = popEngine.getPopFromGroupId(relatedTargetGroup);

      // if (!(targetPop.parentPop === relatedPop || relatedPop.parentPop === targetPop)) {
      //   popEngine.hidePop(target, false);
      // }

      relatedTarget = closest(relatedTarget, '[pop]');
      if (relatedTarget && relatedTarget.getAttribute('pop-id') === targetGroup) {
        return;
      }

      if (!(popEngine.isPopTarget(relatedTarget) || popEngine.isPop(relatedTarget)) ||
          targetGroup !== relatedTargetGroup) {
        popEngine.hidePop(target, false);
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
