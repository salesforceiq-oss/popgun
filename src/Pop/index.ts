import PopStateType from '../PopStateType';
import Options from '../Options';
import Trigger from '../Trigger';
import PopTarget from '../PopTarget';

export default class Pop {
  opts: Options;
  targetEl: Element;
  state: string;
  isPinned: boolean;
  popEl: PopTarget;
  trigger: Trigger;

  constructor(el: Element, trigger: Trigger) {
    this.targetEl = el;
    this.trigger = trigger;
    this.opts = Options.fromElement(el);
    this.state = PopStateType.HIDDEN;
    this.isPinned = false;

    let target = this._buildTarget(this.opts.html || this.opts.text);
    this.popEl = (new PopTarget(target, trigger));
    this.targetEl.appendChild(this.popEl.element);
  }

  private _buildTarget(htmlOrText: string): Element {
    let content = this.opts.html || this.opts.text;
    let el = document.createElement('div');
    el.innerHTML = content;
    return el;
  }

}