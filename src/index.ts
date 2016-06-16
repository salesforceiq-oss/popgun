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

export class Popgun {

  // registers mutation observer and sets up eventListeners
  public constructor() {
    mutationHandler.registerObserver();
    eventDelegate.init();
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
  public getPopState(pop: Pop): string {
    return pop.state;
  }

  // Show the popover for a particular target element
  public showPop(target: Element, isPinned: boolean, trigger: string): void {
    let t: Trigger = new Trigger(trigger);
    let pop = new Pop(target, t);
    popEngine.showPop(target, isPinned, pop);
  }

  // Hide the popover for a particular target element
  public hidePop(target: Element): void {
    popEngine.hidePop(target);
  }

}

export default new Popgun();