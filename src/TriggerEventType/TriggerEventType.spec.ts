/// <reference path='../../typings/tsd.d.ts' />

import TriggerEventType from './';

describe('TriggerEventType - ', () => {

  it('should set click event type to `click`', () => {
    expect(TriggerEventType.CLICK).toBe('click');
  });

  it('should set hover event type to `mouseenter`', () => {
    expect(TriggerEventType.HOVER).toBe('mouseenter');
  });

  it('should set focus event type to `focusin`', () => {
    expect(TriggerEventType.FOCUS).toBe('focusin');
  });

  it('should set manual event type to `popgun-manual`', () => {
    expect(TriggerEventType.MANUAL).toBe('popgun-manual');
  });

});