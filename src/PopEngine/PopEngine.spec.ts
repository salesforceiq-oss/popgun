/// <reference path='../../typings/tsd.d.ts' />

import popEngine from './';
import Trigger from '../Trigger';
import IGroup from '../IGroup';
import groupStore from '../GroupStore';
import popStore from '../PopStore';
import Pop from '../Pop';
import PopStateType from '../PopStateType';

describe('PopEngine - ', () => {

  describe('isPopTarget() - ', () => {

    it('should be a pop target when popgun attr has a value', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '12345');
      expect(popEngine.isPopTarget(el)).toBe(true);
    });

    it('should be a pop target when popgun attr does not have a value', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      expect(popEngine.isPopTarget(el)).toBe(true);
    });

    it('should NOT be a pop target with no popgun attr', () => {
      let el = document.createElement('div');
      expect(popEngine.isPopTarget(el)).toBe(false);
    });

  });

  describe('isPopForTrigger() - ', () => {

    it('should return false when there is no element', () => {
      expect(popEngine.isPopForTrigger(null, null)).toBe(false);
    });

    it('should return false when there is no trigger', () => {
      let el = document.createElement('div');
      expect(popEngine.isPopForTrigger(el, null)).toBe(false);
    });

    it('should return false when the element is not a pop target', () => {
      let el = document.createElement('div');
      expect(popEngine.isPopForTrigger(el, new Trigger('click'))).toBe(false);
    });

    it('should return false when trigger does not match pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click');
      expect(popEngine.isPopForTrigger(el, new Trigger('hover'))).toBe(false);
    });

    it('should return true when click matches pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click');
      expect(popEngine.isPopForTrigger(el, new Trigger('click'))).toBe(true);
    });

    it('should return true when hover matches pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'hover');
      expect(popEngine.isPopForTrigger(el, new Trigger('hover'))).toBe(true);
    });

    it('should return true when focus matches pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'focus');
      expect(popEngine.isPopForTrigger(el, new Trigger('focus'))).toBe(true);
    });

    it('should return true when manual matches pop target trigger', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'manual');
      expect(popEngine.isPopForTrigger(el, new Trigger('manual'))).toBe(true);
    });

    it('should return true when click matches pop target with multiple triggers', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click, hover, manual');
      expect(popEngine.isPopForTrigger(el, new Trigger('click'))).toBe(true);
    });

    it('should return false when trigger does not match pop target with multiple triggers', () => {
      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click, hover, manual');
      expect(popEngine.isPopForTrigger(el, new Trigger('focus'))).toBe(false);
    });

  });

  describe('addGroupToGroupStore() - ', () => {

    beforeEach(() => {
      groupStore.clear();
    });

    it('should add IGroup to groupStore', () => {
      let opts: IGroup = {
        schema: 'schemaId'
      };

      popEngine.addGroupToGroupStore('test', opts);
      expect(groupStore.get('test')).toBe(opts);
    });

  });

  describe('getGroupFromGroupId() - ', () => {

    beforeEach(() => {
      groupStore.clear();
    });

    it('should get IGroup from groupStore', () => {
      let opts: IGroup = {
        schema: 'schemaId'
      };

      popEngine.addGroupToGroupStore('test', opts);
      expect(popEngine.getGroupFromGroupId('test')).toBe(opts);
    });

  });

  describe('addPopToPopStore() - ', () => {

    beforeEach(() => {
      popStore.clear();
    });

    it('should add groupId as a key to popStore', () => {
      popEngine.addPopToPopStore('test', null);
      expect(popStore.get('test')).toBe(null);
    });

  });

  describe('getPopFromGroupId() - ', () => {

    beforeEach(() => {
      popStore.clear();
    });

    it('should get pop from groupId', () => {
      popEngine.addPopToPopStore('test', null);
      expect(popEngine.getPopFromGroupId('test')).toBe(null);
    });

  });

  describe('setState() - ', () => {

    let a = {
      eventHandler(e: Event): void {
        return;
      }
    };

    let el = document.createElement('div');
    el.setAttribute('popgun', '');

    let t = new Trigger('click');

    it('should call _fireEvent and set state to PopgunContentSetup', () => {

      spyOn(a, 'eventHandler');

      let p = new Pop(el, t);
      el.addEventListener('PopgunContentSetup', a.eventHandler, false);
      popEngine.setState(p, PopStateType.CONTENT_SETUP, p.opts, null, true);

      expect(p.state).toBe(PopStateType.CONTENT_SETUP);
      expect(a.eventHandler).toHaveBeenCalled();

    });

    it('should call _fireEvent and set state to PopgunPrePosition', () => {

      spyOn(a, 'eventHandler');

      let p = new Pop(el, t);
      el.addEventListener('PopgunPrePosition', a.eventHandler, false);
      popEngine.setState(p, PopStateType.PRE_POSITION, p.opts, null, true);

      expect(p.state).toBe(PopStateType.PRE_POSITION);
      expect(a.eventHandler).toHaveBeenCalled();

    });

    it('should call _fireEvent and set state to PopgunPreShow', () => {

      spyOn(a, 'eventHandler');

      let p = new Pop(el, t);
      el.addEventListener('PopgunPreShow', a.eventHandler, false);
      popEngine.setState(p, PopStateType.PRE_SHOW, p.opts, null, true);

      expect(p.state).toBe(PopStateType.PRE_SHOW);
      expect(a.eventHandler).toHaveBeenCalled();

    });

    it('should call _fireEvent and set state to PopgunShowing', () => {

      spyOn(a, 'eventHandler');

      let p = new Pop(el, t);
      el.addEventListener('PopgunShowing', a.eventHandler, false);
      popEngine.setState(p, PopStateType.SHOWING, p.opts, null, true);

      expect(p.state).toBe(PopStateType.SHOWING);
      expect(a.eventHandler).toHaveBeenCalled();

    });

    it('should call _fireEvent and set state to PopgunPreHide', () => {

      spyOn(a, 'eventHandler');

      let p = new Pop(el, t);
      el.addEventListener('PopgunPreHide', a.eventHandler, false);
      popEngine.setState(p, PopStateType.PRE_HIDE, p.opts, null, true);

      expect(p.state).toBe(PopStateType.PRE_HIDE);
      expect(a.eventHandler).toHaveBeenCalled();

    });

    it('should not call _fireEvent if new state is the same and renotify is true', () => {

      spyOn(a, 'eventHandler');

      let p = new Pop(el, t);
      el.addEventListener('PopgunHidden', a.eventHandler, false);
      popEngine.setState(p, PopStateType.HIDDEN, p.opts, null, true);

      expect(p.state).toBe(PopStateType.HIDDEN);
      expect(a.eventHandler).toHaveBeenCalled();

    });

    it('should not call _fireEvent if new state is the same and renotify is false', () => {

      spyOn(a, 'eventHandler');

      let p = new Pop(el, t);
      el.addEventListener('PopgunHidden', a.eventHandler, false);
      popEngine.setState(p, PopStateType.HIDDEN, p.opts, null, false);

      expect(p.state).toBe(PopStateType.HIDDEN);
      expect(a.eventHandler).not.toHaveBeenCalled();

    });

    it('should not call _fireEvent if not registered', () => {

      spyOn(a, 'eventHandler');

      let p = new Pop(el, t);
      el.addEventListener('PopgunPreHide', a.eventHandler, false);
      popEngine.setState(p, PopStateType.SHOWING, p.opts, null, true);

      expect(a.eventHandler).not.toHaveBeenCalled();

    });

  });

  // describe('_maybeClearTimeout()', () => {

  //   it('should clear timeout', (done) => {

  //     spyOn(popEngine, '_maybeClear');

  //     popEngine._timeouts.hoverdelay = setTimeout(function(): void {
  //       expect(popEngine._maybeClear).toHaveBeenCalled();
  //       done();
  //     }, 3000);

  //     // can't call private method in tests..
  //     popEngine._maybeClearTimeout(popEngine._timeouts.hoverdelay);

  //   });

  // });

  // describe('_isPopAlreadyShowingForTarget()', () => {

  //   it('should return true if it does exist for target', () => {

  //     let el = document.createElement('div');
  //     el.setAttribute('popgun', '');
  //     el.setAttribute('popgun-group', 'test');

  //     let pop = new Pop(el, new Trigger('click'));
  //     pop.state = PopStateType.SHOWING;
  //     popEngine.addPopToPopStore('test', pop);

  //     expect(popEngine._isPopAlreadyShowingForTarget(el)).toBe(true);
  //   });

  //   it('should return false if it is not showing', () => {

  //     let el = document.createElement('div');
  //     el.setAttribute('popgun', '');
  //     el.setAttribute('popgun-group', 'test');

  //     let pop = new Pop(el, new Trigger('click'));
  //     popEngine.addPopToPopStore('test', pop);

  //     expect(popEngine._isPopAlreadyShowingForTarget(el)).toBe(false);
  //   });

  //   it('should return false if it does not exist for target', () => {

  //     let el = document.createElement('div');
  //     el.setAttribute('popgun', '');
  //     el.setAttribute('popgun-group', 'test');

  //     expect(popEngine._isPopAlreadyShowingForTarget(el)).toBe(false);
  //   });

  //   it('should return false if it does not match target', () => {

  //     let el = document.createElement('div');
  //     el.setAttribute('popgun', '');
  //     el.setAttribute('popgun-group', 'test');

  //     let pop = new Pop(el, new Trigger('click'));
  //     popEngine.addPopToPopStore('test', pop);

  //     let anotherEl = document.createElement('span');
  //     anotherEl.setAttribute('popgun', '');

  //     expect(popEngine._isPopAlreadyShowingForTarget(anotherEl)).toBe(false);
  //   });

  // });

  // describe('_getParentPop()', () => {

  //   it('should find parent pop', () => {

  //     let targetEl = document.createElement('div');
  //     targetEl.setAttribute('popgun', '');

  //     let outerEl = document.createElement('div');
  //     outerEl.setAttribute('pop', '');
  //     outerEl.setAttribute('pop-id', 'test');

  //     let outerPop = new Pop(targetEl, new Trigger('click'));
  //     outerPop.popEl.element = outerEl;
  //     popEngine.addPopToPopStore('test', outerPop);

  //     let innerEl = document.createElement('div');
  //     innerEl.setAttribute('pop', '');
  //     innerEl.setAttribute('pop-id', 'test2');

  //     let innerPop = new Pop(targetEl, new Trigger('click'));
  //     innerPop.popEl.element = innerEl;
  //     popEngine.addPopToPopStore('test2', innerPop);

  //     outerEl.appendChild(innerEl);

  //     expect(popEngine._getParentPop(innerPop)).toBe(outerPop);

  //   });

  //   it('should return null if no parent pop', () => {

  //     let targetEl = document.createElement('div');
  //     targetEl.setAttribute('popgun', '');

  //     let popEl = document.createElement('div');
  //     popEl.setAttribute('pop', '');
  //     popEl.setAttribute('pop-id', 'test2');

  //     let innerPop = new Pop(targetEl, new Trigger('click'));
  //     innerPop.popEl.element = popEl;
  //     popEngine.addPopToPopStore('test2', innerPop);

  //     document.body.appendChild(popEl);

  //     expect(popEngine._getParentPop(innerPop)).toBe(null);

  //   });

  // });

  // describe('showTip() - ', () => {

  //   it('should call fireEvent', () => {
  //   });

  // });

});