import Options from '../Options';

export default class PopTarget {

  static isPopTarget(el: Element): boolean {
    return !!(el && el.hasAttribute('popgun'));
  }

  static isPopForTrigger(el: Element, eventType: string): boolean {
    return PopTarget.isPopTarget(el) && Options.fromElement(el).containsEventTrigger(eventType);
  }

}