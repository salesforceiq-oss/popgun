import PopStateType from '../PopStateType';
import Options from '../Options';
import Trigger from '../Trigger';
import PopOver from '../PopOver';
let closest = require('closest');

export default class Pop {
  opts: Options;
  targetEl: Element;
  state: string;
  isPinned: boolean;
  popOver: PopOver;
  trigger: Trigger;
  parentPop: Pop;
  childPops: Pop[];

  constructor(el: Element, trigger: Trigger) {
    this.targetEl = el;
    this.trigger = trigger;
    this.opts = Options.fromElement(el);
    this.state = PopStateType.HIDDEN;
    this.isPinned = false;
    this.parentPop = null;
    this.childPops = [];

    let target = this._buildPopOver(this.opts.html || this.opts.text);
    this.popOver = (new PopOver(target, trigger));
  }

  private _buildPopOver(htmlOrText: string): Element {
    let content = this.opts.html || this.opts.text;
    let el = document.createElement('div');
    el.setAttribute('class', 'pop-content');
    el.innerHTML = content;
    return el;
  }

}
