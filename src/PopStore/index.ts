import Cache from '../Cache';
import PopTarget from '../PopTarget';
import MixinUtil from '../MixinUtil';

export class PopStore implements Cache<PopTarget> {
  // Cache impl
  _cache: any = {};
  add: (key: string, pop: PopTarget) => void;
  get: (key: string) => PopTarget;
  clear: () => void;
}

MixinUtil.applyMixins(PopStore, [Cache]);

export default new PopStore();