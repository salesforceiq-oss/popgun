/// <reference path='../../typings/tsd.d.ts' />

import popStore from './';
import PopTarget from '../PopTarget';
import Trigger from '../Trigger';

describe('popStore -', () => {

  beforeEach(() => {
    popStore.clear();
  });

  it('should return undefined if no group was added by that name', () => {
    expect(popStore.get('test')).toBe(undefined);
  });

  it('should add and get group', () => {
    let el = document.createElement('div');
    el.setAttribute('popgun', '');
    let t = new Trigger('click');
    let pop = new PopTarget(el, t);

    popStore.add('test', pop);

    expect(popStore.get('test')).toBe(pop);
  });

  it('should overwrite group by name', () => {
    let el = document.createElement('div');
    el.setAttribute('popgun', '');
    let t = new Trigger('click');
    let pop = new PopTarget(el, t);

    popStore.add('test', pop);

    el = document.createElement('div');
    el.setAttribute('popgun', '');
    t = new Trigger('focus');
    let newPop = new PopTarget(el, t);

    popStore.add('test', newPop);

    expect(popStore.get('test')).toBe(newPop);
  });

});