import Cache from '../Cache';
import Pop from '../Pop';
import MixinUtil from '../MixinUtil';

export class PopStore implements Cache<Pop> {
  // Cache impl
  _cache: any = {};
  public add: (key: string, pop: Pop) => void;
  public get: (key: string) => Pop;
  public clear: () => void;
}

MixinUtil.applyMixins(PopStore, [Cache]);

export default new PopStore();