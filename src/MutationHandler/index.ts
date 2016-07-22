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
      this._addGroupIdToCache(<Element>mutation.target);
    }
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
