import Cache from '../Cache';
import IGroup from '../IGroup';
import MixinUtil from '../MixinUtil';

export class GroupStore implements Cache<IGroup> {
  // Cache impl
  _cache: any = {};
  public add: (key: string, opts: IGroup) => void;
  public get: (key: string) => IGroup;
  public clear: () => void;
}

MixinUtil.applyMixins(GroupStore, [Cache]);

export default new GroupStore();