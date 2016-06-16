import Trigger from '../Trigger';

export default class PopOver {
  element: Element;
  trigger: Trigger;

  constructor(el: Element, trigger: Trigger) {
    this.element = el;
    this.trigger = trigger;
  }

}