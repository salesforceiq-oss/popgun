import * as trigger from '../trigger';
import TriggerType from '../trigger/trigger-type';
import EnumUtil from '../enum-util';


function init(): void {
  EnumUtil.getNames(TriggerType).forEach((triggerType: TriggerType) => {
    let eventType: string = <string>trigger.getEventType(triggerType);
    let useCapture: boolean = trigger.isUseCapture(triggerType);

    document.removeEventListener(eventType, listener);
    document.addEventListener(eventType, listener, useCapture);
  });
}

function listener(): void {
  console.log('hello world');
}

export {
init
};