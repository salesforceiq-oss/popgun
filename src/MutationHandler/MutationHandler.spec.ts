/// <reference path='../../typings/tsd.d.ts' />

import mutationHandler from './';
import popEngine from '../PopEngine';

describe('MutationHandler - ', () => {

  describe('MutationObserver - ', () => {

    afterEach(() => {
      mutationHandler.disconnectObserver();
    });

    it('should call add to PopCache if addition to DOM', (done) => {

      spyOn(popEngine, 'addGroupToPopStore');
      mutationHandler.registerObserver();

      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('id', 'test');
      document.body.appendChild(el);

      setTimeout(function(): void {
        expect(popEngine.addGroupToPopStore).toHaveBeenCalled();
        document.body.removeChild(document.getElementById('test'));
        done();
      }, 0);

    });

    it('should call add to PopCache if popgun attr added to element', (done) => {

      let el = document.createElement('div');
      el.setAttribute('id', 'test');
      document.body.appendChild(el);

      spyOn(popEngine, 'addGroupToPopStore');
      mutationHandler.registerObserver();

      document.getElementById('test').setAttribute('popgun', 'glomp');

      setTimeout(function(): void {
        expect(popEngine.addGroupToPopStore).toHaveBeenCalled();
        document.body.removeChild(document.getElementById('test'));
        done();
      }, 0);

    });

    it('should not add to cache if element without popgun attr added to DOM', (done) => {

      spyOn(popEngine, 'addGroupToPopStore');
      mutationHandler.registerObserver();

      let el = document.createElement('div');
      el.setAttribute('id', 'test');
      document.body.appendChild(el);

      setTimeout(function(): void {
        expect(popEngine.addGroupToPopStore).not.toHaveBeenCalled();
        document.body.removeChild(document.getElementById('test'));
        done();
      }, 0);

    });

  });

});