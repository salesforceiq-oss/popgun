import Pop from '../Pop';
import popStore from '../PopStore';
let closest = require('closest');

export class PopChainManager {

  public isNestedPop(pop: Pop): boolean {
    return closest(pop.targetEl, '[pop]', true);
  }

  public getFullPopChain(pop: Pop, hideFullChain: boolean): Pop[] {
    let popChain: Pop[] = [];

    if (!!pop.childPops.length) {
      pop.childPops.forEach(function(child: Pop): void {
        let idx = child.parentPop.childPops.indexOf(child);
        if (idx !== -1) {
          child.parentPop.childPops.splice(idx, 1);
        }
        child.parentPop = null;
        popChain = popChain.concat(this.getFullPopChain(child, hideFullChain));
      }, this);
    }

    popChain.push(pop);

    if (!!pop.parentPop) {
      let idx = pop.parentPop.childPops.indexOf(pop);
      if (idx !== -1) {
        pop.parentPop.childPops.splice(idx, 1);
      }
      if (!pop.parentPop.isPinned || hideFullChain) {
        popChain = popChain.concat(this.getFullPopChain(pop.parentPop, hideFullChain));
      }
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

}

export default new PopChainManager();
