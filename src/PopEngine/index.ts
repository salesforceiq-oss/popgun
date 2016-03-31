import popStore from '../PopStore';
import groupStore from '../GroupStore';
import Trigger from '../Trigger';
import Options from '../Options';
import IGroup from '../IGroup';
import PopTarget from '../PopTarget';
import Pop from '../Pop';
let camelize = require('camelize');

export class PopEngine {

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

  // Add group to popStore when caching a group
  public addGroupToPopStore(groupId: string): void {
    popStore.add(groupId, null);
  }

  public getPopTargetFromGroupId(groupId: string): PopTarget {
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
    event.initCustomEvent(camelize('PopGun_' + state), true, true, {'pop': pop});

    pop.popTarget.element.dispatchEvent(event);
  }

  // showTip(pop: Pop): void {
  //   // this.addGroupToPopStore();
  //   let delay = pop.opts.showDelay;

  //   // clear any timeouts
  //   // do a timeout and show tip
  //   setTimeout(function(): void {
  //     // let transitionTipEl = pop.state === PopStateType.SHOWING;
  //     // let animationEndStates = {};

  //     console.log('showing tip');
  //   }, delay);
  // }

}

export default new PopEngine();