/// <reference path='../../typings/tsd.d.ts' />

import * as eventDelegate from './';

describe('event-delegate', () => {

  it('should addEventListener for click on document', () => {
    spyOn(document, 'addEventListener');
    eventDelegate.init();
    expect(document.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function), false);
  });

  it('should addEventListener for mouseenter on document', () => {
    spyOn(document, 'addEventListener');
    eventDelegate.init();
    expect(document.addEventListener).toHaveBeenCalledWith('mouseenter', jasmine.any(Function), false);
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

});