import Cache from '../Cache';
import IOptions from '../IOptions';
import MixinUtil from '../MixinUtil';

export class SchemaStore implements Cache<IOptions> {
  // Cache impl
  _cache: any = {};
  add: (key: string, opts: IOptions) => void;
  get: (key: string) => IOptions;
  clear: () => void;
}

MixinUtil.applyMixins(SchemaStore, [Cache]);

export default new SchemaStore();