import Pop from '../Pop';
import popStore from '../PopStore';
let closest = require('closest');

export class PopChainManager {

  public isNestedPop(pop: Pop): boolean {
    return closest(pop.targetEl, '[pop]', true);
  }

  public getFullPopChain(pop: Pop, hideFullChain: boolean): Pop[] {
    let popChain: Pop[] = [];

    if (hideFullChain) {
      pop = this._getRootPop(pop);
    } else {
      pop = this._getFirstUnpinnedParentPop(pop);
    }

    let stack: Pop[] = [];
    stack.push(pop);

    while (!!stack.length) {
      pop = stack.pop();
      if (!!pop.childPops.length) {
        pop.childPops.forEach(function(child: Pop, index: number): void {
          stack.push(child);
        });
      }
      popChain.push(pop);
    }

    return popChain;
  }

  public maybePinOrUnpinPopAndParentPops(target: Element, pin: boolean): void {
    let groupId = target.getAttribute('popgun-group');
    let pop = popStore.get(groupId);
    pop.isPinned = pin;
    !!pin ? target.setAttribute('pinned-pop', '') : target.removeAttribute('pinned-pop');
    if (pop.parentPop) {
      this.maybePinOrUnpinPopAndParentPops(pop.parentPop.targetEl, pin);
    }
  }

  public removeParentChildRelationship(pop: Pop): void {
    if (!!pop.parentPop) {
      let index = pop.parentPop.childPops.indexOf(pop);
      if (index !== -1) {
        pop.parentPop.childPops.splice(index, 1);
      }
      pop.parentPop = null;
    }
  }

  public setParentChildRelationship(parent: Pop, child: Pop): void {
    this._setParentPop(parent, child);
    this._addChildPop(parent, child);
  }

  private _setParentPop(parent: Pop, child: Pop): void {
    child.parentPop = parent;
  }

  private _addChildPop(parent: Pop, child: Pop): void {
    parent.childPops.push(child);
  }

  private _getRootPop(pop: Pop): Pop {
    if (!!pop) {
      while (!!pop.parentPop) {
        pop = pop.parentPop;
      }
      return pop;
    }
  }

  private _getFirstUnpinnedParentPop(pop: Pop): Pop {
    while (!!pop.parentPop && !pop.parentPop.isPinned) {
      pop = pop.parentPop;
    }
    return pop;
  }

}

export default new PopChainManager();
