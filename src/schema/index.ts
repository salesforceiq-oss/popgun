import IOptions from '../options/IOptions';

interface ISchemaCache {
    [key: string]: IOptions;
};

let _cache: ISchemaCache = {};

function add(key: string, opts: IOptions): void {
    _cache[key] = opts;
}

function get(key: string): IOptions {
    return _cache[key];
}

function clear(): void {
    _cache = {};
}

export {
    get,
    add,
    clear
}