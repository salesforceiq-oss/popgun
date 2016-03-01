import Cache from '../Cache';
import IGroup from '../IGroup';
import MixinUtil from '../MixinUtil';

export class GroupStore implements Cache<IGroup> {
  // Cache impl
  _cache: any = {};
  add: (key: string, opts: IGroup) => void;
  get: (key: string) => IGroup;
  clear: () => void;
}

MixinUtil.applyMixins(GroupStore, [Cache]);

export default new GroupStore();