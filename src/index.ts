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
    eventDelegate.init();
  }

}

// angular adapter
// have a service that exposes the popgun api
// have something on the srvc that sees a template url and can convert it on the attribute
// someway in the adapter to have $compile on a particular scope
// have an angular popgun directive that can listen for content_setup event
// and $compile on the target scope
// create isolate scope 

// think about
// how to get data
// how to compile the scope


// probably want to publish as another repo

export default new Popgun();