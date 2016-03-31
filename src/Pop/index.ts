import PopStateType from '../PopStateType';
import Options from '../Options';
import Trigger from '../Trigger';
import PopTarget from '../PopTarget';

export default class Pop {
  opts: Options;
  parentElement: Element;
  state: string;
  popTarget: PopTarget;
  trigger: Trigger;

  constructor(el: Element, trigger: Trigger) {
    this.parentElement = el;
    this.trigger = trigger;
    this.opts = Options.fromElement(el);
    this.state = PopStateType.HIDDEN;

    let target = this._buildTarget(this.opts.html || this.opts.text);
    this.popTarget = (new PopTarget(target, trigger));
    this.parentElement.appendChild(this.popTarget.element);
  }

  private _buildTarget(htmlOrText: string): Element {
    let content = this.opts.html || this.opts.text;
    let el = document.createElement('div');
    el.innerHTML = content;
    return el;
  }

}