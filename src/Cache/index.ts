export default class Cache<T> {
  _cache: {
    [key: string]: T
  } = {};

  add(key: string, opts: T): void {
    this._cache[key] = opts;
  }

  get(key: string): T {
    return this._cache[key];
  }

  clear(): void {
    this._cache = {};
  }
}