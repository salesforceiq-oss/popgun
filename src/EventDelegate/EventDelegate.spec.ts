/// <reference path='../../typings/tsd.d.ts' />

import eventDelegate from './';
import popEngine from '../PopEngine';
import Trigger from '../Trigger';

describe('EventDelegate - ', () => {

  describe('init -', () => {
    it('should addEventListener for click on document', () => {
      spyOn(document, 'addEventListener');
      eventDelegate.init();
      expect(document.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function), false);
    });

    it('should addEventListener for mouseover on document', () => {
      spyOn(document, 'addEventListener');
      eventDelegate.init();
      expect(document.addEventListener).toHaveBeenCalledWith('mouseover', jasmine.any(Function), false);
    });

    it('should addEventListener for focusin on document', () => {
      spyOn(document, 'addEventListener');
      eventDelegate.init();
      expect(document.addEventListener).toHaveBeenCalledWith('focusin', jasmine.any(Function), true);
    });

    it('should addEventListener for popgun-manual on document', () => {
      spyOn(document, 'addEventListener');
      eventDelegate.init();
      expect(document.addEventListener).toHaveBeenCalledWith('popgun-manual', jasmine.any(Function), false);
    });

    it('should remove existing event listeners on call', () => {
      spyOn(document, 'removeEventListener');
      eventDelegate.init();
      expect(document.removeEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
      expect(document.removeEventListener).toHaveBeenCalledWith('mouseover', jasmine.any(Function));
      expect(document.removeEventListener).toHaveBeenCalledWith('focusin', jasmine.any(Function));
      expect(document.removeEventListener).toHaveBeenCalledWith('popgun-manual', jasmine.any(Function));
    });
  });

  describe('listener - ', () => {

    it('should instantiate Pop with click when listener passes in click event', () => {
      spyOn(popEngine, 'isPopForTrigger');

      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'click');

      let e = {
        type: 'click',
        target: el
      };

      eventDelegate.onClick(<any>e);

      expect(popEngine.isPopForTrigger).toHaveBeenCalledWith(e.target, (new Trigger('click')));
    });

    it('should instantiate Pop with hover when listener passes in mouseover event', () => {
      spyOn(popEngine, 'isPopForTrigger');

      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'hover');

      let e = {
        type: 'mouseover',
        target: el
      };

      eventDelegate.onHover(<any>e);

      expect(popEngine.isPopForTrigger).toHaveBeenCalledWith(e.target, (new Trigger('hover')));
    });

    it('should instantiate Pop with focus when listener passes in focusin event', () => {
      spyOn(popEngine, 'isPopForTrigger');

      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'focus');

      let e = {
        type: 'focusin',
        target: el
      };

      eventDelegate.onFocus(<any>e);

      expect(popEngine.isPopForTrigger).toHaveBeenCalledWith(e.target, (new Trigger('focus')));
    });

    it('should instantiate Pop with manual when listener passes in mouseover popgun-manual', () => {
      spyOn(popEngine, 'isPopForTrigger');

      let el = document.createElement('div');
      el.setAttribute('popgun', '');
      el.setAttribute('popgun-trigger', 'manual');

      let e = {
        type: 'popgun-manual',
        target: el
      };

      eventDelegate.onManual(<any>e);

      expect(popEngine.isPopForTrigger).toHaveBeenCalledWith(e.target, (new Trigger('manual')));
    });

  });

});