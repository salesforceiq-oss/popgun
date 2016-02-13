/// <reference path='../../typings/tsd.d.ts' />

import { defaultOptions } from './';
import Trigger from '../trigger';

describe('default-options - ', () => {

  it('should default trigger to a hover trigger', () => {
    expect(defaultOptions.trigger).toEqual(new Trigger('hover'));
  });

  it('should default content to an empty string', () => {
    expect(defaultOptions.content).toBe('');
  });

  it('should default placement to top', () => {
    expect(defaultOptions.placement).toBe('top');
  });

  it('should default placementOffset to 8', () => {
    expect(defaultOptions.placementOffset).toBe(8);
  });

  it('should default optimizePlacement to true', () => {
    expect(defaultOptions.optimizePlacement).toBe(true);
  });

  it('should default transitionPlacement to true', () => {
    expect(defaultOptions.transitionPlacement).toBe(true);
  });

  it('should default alignment to empty string', () => {
    expect(defaultOptions.alignment).toBe('');
  });

  it('should default alignmentOffset to 0', () => {
    expect(defaultOptions.alignmentOffset).toBe(0);
  });

  it('should default viewportPadding to 10', () => {
    expect(defaultOptions.viewportPadding).toBe(10);
  });

  it('should default timeToHoverOnPop to 300', () => {
    expect(defaultOptions.timeToHoverOnPop).toBe(300);
  });

  it('should default showDelay to 0', () => {
    expect(defaultOptions.showDelay).toBe(0);
  });

  it('should default fadeDuration to 100', () => {
    expect(defaultOptions.fadeDuration).toBe(100);
  });

});