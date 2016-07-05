/// <reference path='../../typings/index.d.ts' />

import popChainManager from './';
import popEngine from '../PopEngine';
import Pop from '../Pop';
import Trigger from '../Trigger';

describe('PopChainManager - ', () => {

  describe('maybePinOrUnpinPopAndParentPops() - ', () => {

    it('should add pinned-pop attribute to elements in chain', () => {

      let parentEl = document.createElement('div');
      parentEl.setAttribute('popgun', '');
      parentEl.setAttribute('popgun-group', 'parent');

      let childEl = document.createElement('div');
      childEl.setAttribute('popgun', '');
      childEl.setAttribute('popgun-group', 'child');

      let t = new Trigger('click');

      let parentPop = new Pop(parentEl, t);
      let childPop = new Pop(childEl, t);

      popEngine.addPopToPopStore('parent', parentPop);
      popEngine.addPopToPopStore('child', childPop);

      popChainManager.setParentChildRelationship(parentPop, childPop);
      popChainManager.maybePinOrUnpinPopAndParentPops(childPop.targetEl, true);

      expect(childEl.hasAttribute('pinned-pop')).toBe(true);
      expect(parentEl.hasAttribute('pinned-pop')).toBe(true);

    });

  });

  describe('setParentChildRelationship() - ', () => {

    it('should set parent-child relationship between pops', () => {

      let parentEl = document.createElement('div');
      parentEl.setAttribute('popgun', '');

      let childEl = document.createElement('div');
      childEl.setAttribute('popgun', '');

      let t = new Trigger('click');

      let parentPop = new Pop(parentEl, t);
      let childPop = new Pop(childEl, t);

      popChainManager.setParentChildRelationship(parentPop, childPop);

      expect(parentPop.childPops[0]).toBe(childPop);
      expect(childPop.parentPop).toBe(parentPop);

    });

  });

});
