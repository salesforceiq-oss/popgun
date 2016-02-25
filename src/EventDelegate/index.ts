import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import EnumUtil from '../EnumUtil';


function init(): void {
  EnumUtil.getNames(TriggerType).forEach((rawTriggerType: string) => {
    let trigger: Trigger = new Trigger(rawTriggerType);
    let eventType: string = <string>trigger.eventType;

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