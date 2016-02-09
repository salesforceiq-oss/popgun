import Trigger, { TriggerName } from '../trigger';
import EnumUtil from '../enum-util';


function init(): void {
  EnumUtil.getNames(TriggerName).map((n: string): Trigger => {
    return new Trigger(n);
  }).forEach((trigger: Trigger) => {
    let eventType: string = <string> trigger.eventType;

    document.removeEventListener(eventType, listener);
    document.addEventListener(eventType, listener, trigger.useCapture);
  });
}

function listener(): void {
  console.log('hello world');
}

export {
init
};