import Trigger, { TriggerName } from '../trigger';
import EnumUtil from '../enum-util';


function init(): void {
  EnumUtil.getNames(TriggerName).map((n: string): Trigger => {
    return new Trigger(n);
  }).forEach((trigger: Trigger) => {
    document.addEventListener(<string> trigger.eventType, listener, trigger.useCapture);
  });
}

function listener(): void {
  console.log('hello world');
}

export {
init
};