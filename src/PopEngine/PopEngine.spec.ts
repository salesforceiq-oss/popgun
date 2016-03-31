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

  describe('addGroupToPopStore() - ', () => {

    beforeEach(() => {
      popStore.clear();
    });

    it('should add groupId as a key to popStore', () => {
      popEngine.addGroupToPopStore('test');
      expect(popStore.get('test')).toBe(null);
    });

  });

  describe('getPopTargetFromGroupId() - ', () => {

    beforeEach(() => {
      popStore.clear();
    });

    it('should get pop from groupId', () => {
      popEngine.addGroupToPopStore('test');
      expect(popEngine.getPopTargetFromGroupId('test')).toBe(null);
    });

  });

  describe('setState() - ', () => {

    let el = document.createElement('div');
    el.setAttribute('popgun', '');

    let t = new Trigger('click');

    it('should call fireEvent and set pop.state', () => {

      spyOn(popEngine, 'fireEvent');

      let p = new Pop(el, t);
      popEngine.setState(p, PopStateType.SHOWING, p.opts, null, true);

      expect(p.state).toBe(PopStateType.SHOWING);
      expect(popEngine.fireEvent).toHaveBeenCalled();
    });

    it('should not call fireEvent if new state is the same and renotify is false', () => {

      spyOn(popEngine, 'fireEvent');

      let p = new Pop(el, t);
      popEngine.setState(p, PopStateType.HIDDEN, p.opts, null, false);

      expect(p.state).toBe(PopStateType.HIDDEN);
      expect(popEngine.fireEvent).not.toHaveBeenCalled();
    });

  });

  describe('fireEvent() - ', () => {

    let a = {
      eventHandler(e: Event): void {
        console.log(e);
        return;
      }
    };

    let el = document.createElement('div');
    el.setAttribute('popgun', '');

    let t = new Trigger('click');

    it('should fire event for PopGunHidden', (done) => {

      spyOn(a, 'eventHandler');
      let p = new Pop(el, t);
      p.popTarget.element.addEventListener('PopGunHidden', a.eventHandler, false);
      popEngine.fireEvent(PopStateType.HIDDEN, p);

      setTimeout(function(): void {
        expect(a.eventHandler).toHaveBeenCalled();
        done();
      }, 0);

    });

    it('should fire event for PopGunContentSetup', (done) => {

      spyOn(a, 'eventHandler');
      let p = new Pop(el, t);
      p.popTarget.element.addEventListener('PopGunContentSetup', a.eventHandler, false);
      popEngine.fireEvent(PopStateType.CONTENT_SETUP, p);

      setTimeout(function(): void {
        expect(a.eventHandler).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should fire event for PopGunPrePosition', (done) => {

      spyOn(a, 'eventHandler');
      let p = new Pop(el, t);
      p.popTarget.element.addEventListener('PopGunPrePosition', a.eventHandler, false);
      popEngine.fireEvent(PopStateType.PRE_POSITION, p);

      setTimeout(function(): void {
        expect(a.eventHandler).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should fire event for PopGunPreShow', (done) => {

      spyOn(a, 'eventHandler');
      let p = new Pop(el, t);

      p.popTarget.element.addEventListener('PopGunPreShow', a.eventHandler, false);
      popEngine.fireEvent(PopStateType.PRE_SHOW, p);

      setTimeout(function(): void {
        expect(a.eventHandler).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should fire event for PopGunShowing', (done) => {

      spyOn(a, 'eventHandler');
      let p = new Pop(el, t);

      p.popTarget.element.addEventListener('PopGunShowing', a.eventHandler, false);
      popEngine.fireEvent(PopStateType.SHOWING, p);

      setTimeout(function(): void {
        expect(a.eventHandler).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should fire event for PopGunPreHide', (done) => {

      spyOn(a, 'eventHandler');
      let p = new Pop(el, t);

      p.popTarget.element.addEventListener('PopGunPreHide', a.eventHandler, false);
      popEngine.fireEvent(PopStateType.PRE_HIDE, p);

      setTimeout(function(): void {
        expect(a.eventHandler).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should not fire event if not registered', (done) => {

      spyOn(a, 'eventHandler');
      let p = new Pop(el, t);

      p.popTarget.element.addEventListener('PopGunPreHide', a.eventHandler, false);
      popEngine.fireEvent(PopStateType.SHOWING, p);

      setTimeout(function(): void {
        expect(a.eventHandler).not.toHaveBeenCalled();
        done();
      }, 0);
    });

  });

  // describe('showTip() - ', () => {

  //   it('should call fireEvent', () => {
  //   });

  // });

});