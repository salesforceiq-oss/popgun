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

// Public API
export class Popgun {

  constructor() {
    mutationHandler.registerObserver();
  }

  public hello(): void {
    console.log('hi');
  }

}

export default new Popgun();