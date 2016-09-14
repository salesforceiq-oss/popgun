/// <reference path='../../typings/index.d.ts' />

import mutationHandler from './';
import popEngine from '../PopEngine';

describe('MutationHandler - ', () => {

  describe('MutationObserver - ', () => {

    afterEach(() => {
      mutationHandler.disconnectObserver();
    });

    it('should not add to cache if element without popgun attr added to DOM', (done) => {

      spyOn(popEngine, 'addPopToPopStore');
      mutationHandler.registerObserver();

      let el = document.createElement('div');
      el.setAttribute('id', 'test');
      document.body.appendChild(el);

      setTimeout(function(): void {
        expect(popEngine.addPopToPopStore).not.toHaveBeenCalled();
        document.body.removeChild(document.getElementById('test'));
        done();
      }, 0);

    });

  });

});
