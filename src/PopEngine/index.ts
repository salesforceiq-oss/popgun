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

    pop.popTarget.element.dispatchEvent(event);
  }

  private _maybeClear(timeoutOrHandler: any, isTimeout: boolean): void {
    if (timeoutOrHandler) {
      let obj = isTimeout ? this._timeouts : this._handlers;
      let key = null;
      for (let k in obj) {
        if (obj.hasOwnProperty(k) && (obj[k] === timeoutOrHandler)) {
          key = k;
        }
      }
      if (isTimeout) {
        clearTimeout(obj[key]);
      } else {
        timeoutOrHandler();
      }
      obj[key] = undefined;
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
    if (this.getPopFromGroupId(groupId) && this.getPopFromGroupId(groupId).parentElement === targetElement) {
      return true;
    }
    return false;
  }

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
      let transitionTipEl = (lastState === PopStateType.SHOWING) && !pop.opts.disableTransition;
      let animationEndStates = {};
      let isAlreadyShowing = this._isPopAlreadyShowingForTarget(targetElement);

      console.log('showing tip');
    }, delay);
  }

}

export default new PopEngine();