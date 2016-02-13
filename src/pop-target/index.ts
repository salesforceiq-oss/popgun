import { default as Trigger } from '../trigger';

function isPopTarget(el: Element): boolean {
  return !!(el && el.hasAttribute('popgun'));
}

function isForTrigger(el: Element, trigger: Trigger): boolean {
  return isPopTarget(el);
}

export {
isPopTarget,
isForTrigger
};