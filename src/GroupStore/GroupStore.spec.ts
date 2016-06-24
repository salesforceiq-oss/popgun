/// <reference path='../../typings/index.d.ts' />

import groupStore from './';
import IGroup from '../IGroup';

describe('groupStore -', () => {

  beforeEach(() => {
    groupStore.clear();
  });

  it('should return undefined if no group was added by that name', () => {
    expect(groupStore.get('test')).toBe(undefined);
  });

  it('should add and get group', () => {
    let opts: IGroup = {
      schema: 'schemaId'
    };

    groupStore.add('test', opts);

    expect(groupStore.get('test')).toBe(opts);
  });

  it('should overwrite group by name', () => {
    groupStore.add('test', {
      schema: 'schemaId'
    });

    let newOpts: IGroup = {
      schema: 'schemaId'
    };

    groupStore.add('test', newOpts);

    expect(groupStore.get('test')).toBe(newOpts);
  });

});
