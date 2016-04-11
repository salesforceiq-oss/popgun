import popStore from '../PopStore';
import groupStore from '../GroupStore';
import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import Options from '../Options';
import IGroup from '../IGroup';
import PopStateType from '../PopStateType';
import PopTarget from '../PopTarget';
import Pop from '../Pop';
let camelize = require('camelize');
let closest = require('closest');

export class PopEngine {

  _timeouts: {
    hoverdelay: any
    popHover: any
  } = {
    hoverdelay: null,
    popHover: null
  };

  _handlers: {
    [key: string]: string
  } = {};

  public isPopTarget(el: Element): boolean {
    return !!(el && el.hasAttribute('popgun'));
  }

  public isPopForTrigger(el: Element, trigger: Trigger): boolean {
    return this.isPopTarget(el) && Options.fromElement(el).containsEventTrigger(<string>trigger.eventType);
  }

  // Add group to groupStore when registering a group
  public addGroupToGroupStore(groupId: string, group: IGroup): void {
    groupStore.add(groupId, group);
  }

  public getGroupFromGroupId(groupId: string): IGroup {
    return groupStore.get(groupId);
  }

  // Add pop to popStore when caching a pop
  public addPopToPopStore(groupId: string, pop: any): void {
    popStore.add(groupId, pop);
  }

  public getPopFromGroupId(groupId: string): Pop {
    return popStore.get(groupId);
  }

  public setState(pop: Pop, state: string, targetOpts: Options, result: any, renotify: boolean): void {
    if (state !== pop.state || renotify) {
      pop.state = state;

      this._fireEvent(state, pop);
    }
  }

  private _fireEvent(state: string, pop: Pop): void {
    let event = document.createEvent('CustomEvent');
    event.initCustomEvent(camelize('Popgun_' + state), true, true, {'pop': pop});

    pop.popEl.element.dispatchEvent(event);
  }

  private _maybeClear(timeoutOrHandler: any, isTimeout: boolean): void {
    if (timeoutOrHandler) {
      let obj = isTimeout ? this._timeouts : this._handlers;
      let key: string = null;
      for (let k in obj) {
        if (obj.hasOwnProperty(k) && ((<any>obj)[k] === timeoutOrHandler)) {
          key = k;
        }
      }
      if (isTimeout) {
        clearTimeout((<any>obj)[key]);
      } else {
        timeoutOrHandler();
      }
      (<any>obj)[key] = undefined;
    }
  }

  private _maybeClearTimeout(timeout: any): void {
    return this._maybeClear(timeout, true);
  }

  private _maybeClearHandler(watch: any): void {
    return this._maybeClear(watch, false);
  }

  private _isPopAlreadyShowingForTarget(targetElement: Element): boolean {
    let groupId = targetElement.getAttribute('popgun-group');
    if (this.getPopFromGroupId(groupId)) {
      return ((this.getPopFromGroupId(groupId).state === PopStateType.SHOWING) &&
        (this.getPopFromGroupId(groupId).targetEl === targetElement));
    }
    return false;
  }

  private _getParentPop(pop: Pop): Pop {
    let parentEl = closest(pop.popEl.element, 'div[pop=""]');
    if (parentEl) {
      return this.getPopFromGroupId(parentEl.getAttribute('pop-id'));
    }
    return null;
  }

  private _maybePinOrUnpinPopAndParentPops(pop: Pop, pin: boolean): void {
    pop.isPinned = pin;
    let parentPop = this._getParentPop(pop);
    if (parentPop) {
      this._maybePinOrUnpinPopAndParentPops(parentPop, pin);
    }
  }

  // listenForHideAllTips(listen) {
  //   if (!listen) {
  //     $document.off('riq-hide-all-tips.' + tipId);
  //   } else {
  //     $document.on('riq-hide-all-tips.' + tipId, function() {
  //       if (RiqTipSrvc.isInShowProcess(riqTipInstance.state)) {
  //         hideTip(undefined, true);
  //         UtilSrvc.safeApply($scope);
  //       }
  //     });
  //   }
  // }

  public showPop(targetElement: Element, isPinned: boolean, pop: Pop): void {
    // add pop to cache
    // this.addPopToPopStore(targetElement.getAttribute('popgun-group'), pop);
    let delay = isPinned ? 0 : pop.opts.showDelay;

    // if (pop.opts.disabled) {
    //   return;
    // }

    // clear any timeouts and do a timeout and show tip
    this._maybeClearTimeout(this._timeouts.hoverdelay);
    this._timeouts.hoverdelay = setTimeout(function(): void {
      let lastState = pop.state;
      // let transitionTipEl = (lastState === PopStateType.SHOWING) && !pop.opts.disableTransition;
      let animationEndStates = {};
      let isAlreadyShowing = this._isPopAlreadyShowingForTarget(targetElement);

      if (isPinned) {
        this._maybePinOrUnpinPopAndParentPops(pop, true);
      }

      // maybe unpin tip before the state changes for a new target
      this._maybePinOrUnpinPopAndParentPops(pop, false);

      // needs to happen before the isAlreadyShowing check to allow the short circuit to keep the tip open
      this._maybeClearTimeout(this._timeouts.tipHover);

      // listenForHideAllTips(true);
      // listenForScroll(true, targetElement);

      console.log('showing tip');
    }, delay);
  }

}

export default new PopEngine();