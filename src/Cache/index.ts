export default class Cache<T> {
  _cache: {
    [key: string]: T
  } = {};

  public add(key: string, opts: T): void {
    this._cache[key] = opts;
  }

  public get(key: string): T {
    return this._cache[key];
  }

  public clear(): void {
    this._cache = {};
  }
}