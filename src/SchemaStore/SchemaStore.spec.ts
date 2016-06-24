/// <reference path='../../typings/index.d.ts' />

import schemaStore from './';
import IOptions from '../IOptions';

describe('schemaStore -', () => {

    beforeEach(() => {
        schemaStore.clear();
    });

    it('should return undefined if no schema was added by that name', () => {
        expect(schemaStore.get('test')).toBe(undefined);
    });

    it('should add and get schema', () => {
        let opts: IOptions = {
            placement: 'bottom'
        };

        schemaStore.add('test', opts);

        expect(schemaStore.get('test')).toBe(opts);
    });

    it('should overwrite schema by name', () => {
        schemaStore.add('test', {
            placement: 'top'
        });

        let newOpts: IOptions = {
            placement: 'bottom'
        };

        schemaStore.add('test', newOpts);

        expect(schemaStore.get('test')).toBe(newOpts);
    });

});
