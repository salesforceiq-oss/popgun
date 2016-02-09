import { default as Trigger } from '../trigger';

function isPop(el: Element): boolean {
  return !!(el && el.hasAttribute('popgun'));
}

function isPopForTrigger(el: Element, trigger: Trigger): boolean {
  return !!(el && el.hasAttribute('popgun'));
}

export {
isPop
};