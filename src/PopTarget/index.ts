import Options from '../Options';
import Trigger from '../Trigger';

export default class PopTarget {
  opts: Options;
  el: Element;
  trigger: Trigger;

  static isPopTarget(el: Element): boolean {
    return !!(el && el.hasAttribute('popgun'));
  }

  static isPopForTrigger(el: Element, trigger: Trigger): boolean {
    return PopTarget.isPopTarget(el) && Options.fromElement(el).containsEventTrigger(<string>trigger.eventType);
  }

  constructor(el: Element, trigger: Trigger) {
    this.el = el;
    this.trigger = trigger;
  }

}