import Cache from '../Cache';
import IOptions from '../IOptions';
import MixinUtil from '../MixinUtil';

export class SchemaStore implements Cache<IOptions> {
  // Cache impl
  _cache: any = {};
  public add: (key: string, opts: IOptions) => void;
  public get: (key: string) => IOptions;
  public clear: () => void;
}

MixinUtil.applyMixins(SchemaStore, [Cache]);

export default new SchemaStore();