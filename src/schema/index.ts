import { IOptions } from '../options';

interface ISchemaCache {
    [key: string]: IOptions
};

let _cache: ISchemaCache = {};

function add(key: string, opts: IOptions) {
    _cache[key] = opts;
}

function get(key: string): IOptions {
    return _cache[key];
}

function clear() {
    _cache = {};
}

export {
    get,
    add,
    clear
}