import popEngine from '../PopEngine';

export class MutationHandler {
  observer: MutationObserver;

  public registerObserver(): void {
    let target: Node = document.body;
    let config: MutationObserverInit = {
      attributes: true,
      attributeFilter: ['popgun'],
      childList: true,
      characterData: true,
      subtree: true
    };

    this.observer = new MutationObserver(function(mutations: MutationRecord[]): void {
      mutations.forEach(function(mutation: MutationRecord): void {
        this._maybeAddOrRemovePopTarget(mutation);
      }.bind(this));
    }.bind(this));

    this.observer.observe(target, config);
  }

  public disconnectObserver(): void {
    this.observer.disconnect();
  }

  private _maybeAddOrRemovePopTarget(mutation: MutationRecord): void {
    if (mutation.type === 'childList' && !!mutation.addedNodes.length) {
      Array.prototype.slice.call(mutation.addedNodes).forEach(function(addedNode: Node): void {
        if (!!(addedNode instanceof Element) && popEngine.isPopTarget(<Element>addedNode)) {
          this._addGroupIdToCache(<Element>addedNode);
        }
      }.bind(this));
    } else if (mutation.type === 'attributes' && mutation.attributeName === 'popgun') {
      popEngine.synchronousHidePop(<Element>mutation.target, true);
      this._addGroupIdToCache(<Element>mutation.target);
    } else if (mutation.type === 'childList' && mutation.removedNodes.length) {
      this._maybeRemoveOpenPopovers(mutation.removedNodes);
    }
  }

  private _maybeRemoveOpenPopovers(removedNodes: any): void {
    Array.prototype.slice.call(removedNodes).forEach(function(removedNode: Node): void {
      if (!!(removedNode instanceof Element)) {
        let targetList = removedNode.querySelectorAll('[popgun]');
        Array.prototype.slice.call(targetList).forEach(function(target: Element): void {
          popEngine.synchronousHidePop(target, true);
        });
      }
    }.bind(this));
  }

  private _addGroupIdToCache(el: Element): void {
    let groupId = '';
    if (el.hasAttribute('popgun-group')) {
      groupId = el.getAttribute('popgun-group');
    } else {
      groupId = Math.random().toString(36).slice(2);
      el.setAttribute('popgun-group', groupId);
    }
    popEngine.addPopToPopStore(groupId, null);
  }

}

export default new MutationHandler();
