import Options from '../Options';
import Trigger from '../Trigger';

export default class PopTarget {
  opts: Options;
  el: Element;
  trigger: Trigger;

  constructor(el: Element, trigger: Trigger) {
    this.el = el;
    this.trigger = trigger;
  }

}