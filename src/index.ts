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
import PopTarget from './PopTarget';
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
  // schema is a base schema of options, options are specific options that take precedence over schema options
  public addGroupOptionsToGroupStore(groupId: string, opts: any): void {
    let groupOpts: IGroup = {
      schema: opts.schemaId,
      options: opts.options
    };
    popEngine.addGroupOptionsToGroupStore(groupId, groupOpts);
  }

  // Store a schema of options
  public addSchemaToSchemaStore(schemaId: string, opts: IOptions): void {
    schemaStore.add(schemaId, opts);
  }

  public getPopFromGroupId(groupId: string): Pop {
    return popEngine.getPopFromGroupId(groupId);
  }

}

export default new Popgun();