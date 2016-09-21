export class TimeoutManager {

  _timeouts: {
    hoverdelay: any
    popHover: any
    scrollTimer: { [key: string]: number }
    timeToHoverOnPop: { [key: string]: number }
    position: any
  } = {
    hoverdelay: null,
    popHover: null,
    scrollTimer: {},
    timeToHoverOnPop: {},
    position: null
  };

  _handlers: {
    [groupId: string]: any
  } = {};

  public getTimeouts(): any {
    return this._timeouts;
  }

  public getHandlers(): any {
    return this._handlers;
  }

  public maybeClearTimeout(timeout: any, groupId: string): void {
    return this._maybeClear(timeout, true, groupId);
  }

  public maybeClearHandler(watch: any): void {
    return this._maybeClear(watch, false, null);
  }

  private _maybeClear(timeoutOrHandler: any, isTimeout: boolean, groupId: string): void {
    if (timeoutOrHandler) {
      let obj = isTimeout ? this._timeouts : this._handlers;
      let key: string = null;
      for (let k in obj) {
        if (obj.hasOwnProperty(k) && ((<any>obj)[k] === timeoutOrHandler)) {
          key = k;
        }
      }
      if (isTimeout) {
        if (key === 'timeToHoverOnPop' || key === 'scrollTimer') {
          clearTimeout((<any>obj)[key][groupId]);
        } else {
          clearTimeout((<any>obj)[key]);
        }
      } else {
        timeoutOrHandler();
      }
      if (key === 'timeToHoverOnPop' || key === 'scrollTimer') {
        (<any>obj)[key][groupId] = undefined;
      } else {
        (<any>obj)[key] = undefined;
      }
    }
  }

}

export default new TimeoutManager();
