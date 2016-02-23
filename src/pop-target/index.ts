function isPopTarget(el: Element): boolean {
  return !!(el && el.hasAttribute('popgun'));
}

function isForTrigger(el: Element, rawTrigger: string): boolean {
  return isPopTarget(el);
}

export {
isPopTarget,
isForTrigger
};