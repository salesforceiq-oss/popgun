import * as trigger from '../trigger';
import { TriggerName } from '../trigger';
import EnumUtil from '../enum-util';


function init(): void {
  EnumUtil.getNames(TriggerName).forEach((triggerName: TriggerName) => {
    let eventType: string = <string>trigger.getEventType(triggerName);
    let useCapture: boolean = trigger.isUseCapture(triggerName);

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