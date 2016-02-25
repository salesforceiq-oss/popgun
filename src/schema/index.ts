import IOptions from '../IOptions';

export class Schema {
  private _cache: {
    [key: string]: IOptions
  } = {};

  add(key: string, opts: IOptions): void {
    this._cache[key] = opts;
  }

  get(key: string): IOptions {
    return this._cache[key];
  }

  clear(): void {
    this._cache = {};
  }
}

export default new Schema();