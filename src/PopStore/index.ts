import Cache from '../Cache';
import PopTarget from '../PopTarget';
import MixinUtil from '../MixinUtil';

export class PopStore implements Cache<PopTarget> {
  // Cache impl
  _cache: any = {};
  public add: (key: string, pop: PopTarget) => void;
  public get: (key: string) => PopTarget;
  public clear: () => void;
}

MixinUtil.applyMixins(PopStore, [Cache]);

export default new PopStore();