import popStore from '../PopStore';
import groupStore from '../GroupStore';
import Trigger from '../Trigger';
import Options from '../Options';
import IGroup from '../IGroup';
import PopTarget from '../PopTarget';

export class PopEngine {

  isPopTarget(el: Element): boolean {
    return !!(el && el.hasAttribute('popgun'));
  }

  isPopForTrigger(el: Element, trigger: Trigger): boolean {
    return this.isPopTarget(el) && Options.fromElement(el).containsEventTrigger(<string>trigger.eventType);
  }

  // Add group to groupStore when registering a group
  addGroupToGroupStore(groupId: string, group: IGroup): void {
    groupStore.add(groupId, group);
  }

  getGroupFromGroupId(groupId: string): IGroup {
    return groupStore.get(groupId);
  }

  // Add group to popStore when caching a group
  addGroupToPopStore(groupId: string): void {
    popStore.add(groupId, null);
  }

  getPopTargetFromGroupId(groupId: string): PopTarget {
    return popStore.get(groupId);
  }

}

export default new PopEngine();