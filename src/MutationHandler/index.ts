import popEngine from '../PopEngine';

export class MutationHandler {
  observer: MutationObserver;

  registerObserver(): void {
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
        this.maybeAddOrRemovePopTarget(mutation);
      }.bind(this));
    }.bind(this));

    this.observer.observe(target, config);
  }

  disconnectObserver(): void {
    this.observer.disconnect();
  }

  maybeAddOrRemovePopTarget(mutation: MutationRecord): void {
    if (mutation.type === 'childList' && !!mutation.addedNodes.length) {
      Array.prototype.slice.call(mutation.addedNodes).forEach(function(addedNode: Node): void {
        if (!!(addedNode instanceof Element) && popEngine.isPopTarget(<Element>addedNode)) {
          this.addGroupIdToCache(<Element>addedNode);
        }
      }.bind(this));
    } else if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
      Array.prototype.slice.call(mutation.removedNodes).forEach(function(removedNode: Node): void {
        if (!!(removedNode instanceof Element) && popEngine.isPopTarget(<Element>removedNode)) {
          this.addGroupIdToCache(<Element>removedNode);
        }
      }.bind(this));
    } else if (mutation.type === 'attributes' && mutation.attributeName === 'popgun') {
      this.addGroupIdToCache(<Element>mutation.target);
    }
  }

  addGroupIdToCache(el: Element): void {
    let groupId = '';
    if (el.hasAttribute('popgun-group')) {
      groupId = el.getAttribute('popgun-group');
    } else {
      groupId = Math.random().toString(36).slice(2);
      el.setAttribute('popgun-group', groupId);
    }
    popEngine.addGroupToPopStore(groupId);
  }

}

export default new MutationHandler();