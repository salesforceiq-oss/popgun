/// <reference path='../../typings/tsd.d.ts' />

import schema from './';
import IOptions from '../IOptions';

describe('schema -', () => {

    beforeEach(() => {
        schema.clear();
    });

    it('should return undefined if no schema was added by that name', () => {
        expect(schema.get('test')).toBe(undefined);
    });

    it('should add and get schema', () => {
        let opts: IOptions = {
            placement: 'bottom'
        };

        schema.add('test', opts);

        expect(schema.get('test')).toBe(opts);
    });

    it('should overwrite schema by name', () => {
        schema.add('test', {
            placement: 'top'
        });

        let newOpts: IOptions = {
            placement: 'bottom'
        };

        schema.add('test', newOpts);

        expect(schema.get('test')).toBe(newOpts);
    });

});