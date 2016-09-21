import Cache from './Cache';
import defaultOptions from './DefaultOptions';
import EnumUtil from './EnumUtil';
import eventDelegate from './EventDelegate';
import groupStore from './GroupStore';
import IGroup from './IGroup';
import IOptions from './IOptions';
import MixinUtil from './MixinUtil';
import mutationHandler from './MutationHandler';
import Options from './Options';
import OptionsParser from './OptionsParser';
import Pop from './Pop';
import popEngine from './PopEngine';
import PopStateType from './PopStateType';
import popStore from './PopStore';
import PopOver from './PopOver';
import schemaStore from './SchemaStore';
import Trigger from './Trigger';
import TriggerEventType from './TriggerEventType';
let closest = require('closest');

export class Popgun {

  // registers mutation observer and sets up event listeners
  public init(): void {
    if (!document.body.hasAttribute('popgun-exists')) {
      mutationHandler.registerObserver();
      eventDelegate.init();
      document.body.setAttribute('popgun-exists', '');
    } else {
      throw new Error('Popgun has already been instantiated. Do not instantiate again.');
    }
  }

  // Store a group w/ options to reuse 
  // schema is a base set of options, options attr will precedence over schema
  public registerGroup(groupId: string, groupOpts: IGroup): void {
    popEngine.addGroupOptionsToGroupStore(groupId, groupOpts);
  }

  // Store a schema of options
  public registerSchema(schemaId: string, opts: IOptions): void {
    schemaStore.add(schemaId, opts);
  }

  public getPopFromGroupId(groupId: string): Pop {
    return popEngine.getPopFromGroupId(groupId);
  }

  // hidden, content_setup, pre_position, pre_show, showing, pre_hide
  public getPopState(groupId: string): string {
    let pop = popEngine.getPopFromGroupId(groupId);
    if (!!pop) {
      return pop.state;
    } else {
      throw new Error('No open pop for this groupId.');
    }
  }

  // returns whether a pop for a specific target is alrady open
  public isPopAlreadyOpenForTarget(target: Element): boolean {
    return popEngine.isPopAlreadyOpenForTarget(target);
  }

  // returns whether a pop is already open for any group
  public isPopAlreadyOpenForGroup(groupId: string): boolean {
    return popEngine.isPopAlreadyOpenForGroup(groupId);
  }

  // reposition a pop based on the groupId
  public reposition(groupId: string): void {
    let pop = popEngine.getPopFromGroupId(groupId);
    if (!!pop) {
      let container = closest(pop.popOver.element, 'div[pop=""]');
      popEngine.setPosition(pop, container);
    } else {
      throw new Error('No open pop for this groupId.');
    }
  }

  // Show the popover for a particular target element
  public showPop(target: Element, isPinned: boolean, trigger: string): void {
    let t: Trigger = new Trigger(trigger);
    let pop = new Pop(target, t);
    popEngine.showPop(target, isPinned, pop);
  }

  // Hide the popover for a particular target element
  public hidePop(target: Element, hideFullChain: boolean): void {
    popEngine.synchronousHidePop(target, hideFullChain);
  }

}

export default new Popgun();
