import popStore from '../PopStore';
import groupStore from '../GroupStore';
import Trigger from '../Trigger';
import Options from '../Options';
import IGroup from '../IGroup';
import PopStateType from '../PopStateType';
import Pop from '../Pop';
let camelize = require('camelize');
let closest = require('closest');
let positioner = require('positioner');
let escapeStack = require('escape-stack')();

export class PopEngine {

  _timeouts: {
    hoverdelay: any
    popHover: any
    timeToHoverOnPop: { [key: string]: number }
  } = {
    hoverdelay: null,
    popHover: null,
    timeToHoverOnPop: {}
  };

  _handlers: {
    [groupId: string]: any
  } = {};

  public isPopTarget(el: Element): boolean {
    return !!(el && el.hasAttribute('popgun'));
  }

  public isPopForTrigger(el: Element, trigger: Trigger): boolean {
    return this.isPopTarget(el) && Options.fromElement(el).containsEventTrigger(<string>trigger.eventType);
  }

  public isPop(el: Element): boolean {
    return !!(el && (el.hasAttribute('pop') || closest(el, 'div[pop=""]')));
  }

  // Add group to groupStore when registering a group
  public addGroupOptionsToGroupStore(groupId: string, group: IGroup): void {
    groupStore.add(groupId, group);
  }

  // Get group 
  public getGroupOptionsFromGroupId(groupId: string): IGroup {
    return groupStore.get(groupId);
  }

  // Add pop to popStore when caching a pop
  public addPopToPopStore(groupId: string, pop: any): void {
    popStore.add(groupId, pop);
  }

  public getPopFromGroupId(groupId: string): Pop {
    return popStore.get(groupId);
  }

  public setState(pop: Pop, state: string, targetOpts: Options, result: any, renotify: boolean): void {
    if (state !== pop.state || renotify) {
      pop.state = state;

      this._fireEvent(state, pop);
    }
  }

  public showPop(targetElement: Element, isPinned: boolean, pop: Pop): void {
    let delay = isPinned ? 0 : pop.opts.showDelay;
    let isAlreadyShowing = this._isPopAlreadyShowingForGroup(targetElement);
    let groupId = targetElement.getAttribute('popgun-group');

    // clear any timeouts and do a timeout and show pop
    this._maybeClearTimeout(this._timeouts.timeToHoverOnPop, groupId);
    this._maybeClearTimeout(this._timeouts.hoverdelay, null);
    this._timeouts.hoverdelay = setTimeout(function(): void {
      let animationEndStates = {};
      let container = <Element>null;
      let nose = <Element>null;

      if (isAlreadyShowing) {
        // if pop is already showing for group, reuse
        container = <Element>document.querySelector('div[pop-id="' + groupId + '"]');
        nose = <Element>container.getElementsByClassName('nose-triangle')[0];
        container.removeChild(container.getElementsByClassName('pop-content')[0]);
        this._maybeClearHandler(this._handlers[groupId]);
      } else {
        container = document.createElement('div');
        nose = document.createElement('div');
        container.setAttribute('class', 'pop');
        container.setAttribute('pop-id', targetElement.getAttribute('popgun-group'));
        container.setAttribute('pop', '');
        nose.setAttribute('class', 'nose-triangle');
        container.appendChild(nose);
        document.body.appendChild(container);
      }

      this.addPopToPopStore(targetElement.getAttribute('popgun-group'), pop);

      if (isPinned) {
        this._maybePinOrUnpinPopAndParentPops(targetElement, true);
      }

      this._maybeClearTimeout(this._timeouts.popHover, null);
      this._listenForScroll(true, targetElement);

      // CONTENT SETUP
      this.setState(pop, PopStateType.CONTENT_SETUP, pop.opts, null, false);
      container.appendChild(pop.popEl.element);

      // PRE POSITION
      this.setState(pop, PopStateType.PRE_POSITION, pop.opts, null, false);

      this._maybeClearTimeout(this._timeouts.position, null);
      this._timeouts.position = setTimeout(function(): void {

        this._setPosition(pop, container, nose);

        // PRE SHOW
        this.setState(pop, PopStateType.PRE_SHOW, pop.opts, null, false);

        this._maybeClearTimeout(this._timeouts.hoverdelay, null);
        this._handlers[groupId] = escapeStack.add(function(): boolean {
          this.hidePop(pop.targetEl);
          return true;
        }.bind(this));

        // SHOWING
        this.setState(pop, PopStateType.SHOWING, pop.opts, null, false);

      }.bind(this));
    }.bind(this), delay);
  }

  public hidePop(targetElement: Element): void {
    let groupId = targetElement.getAttribute('popgun-group');
    let pop = this.getPopFromGroupId(groupId);
    let popEl = <Element>document.querySelector('div[pop-id="' + groupId + '"]');
    this._timeouts.timeToHoverOnPop[groupId] = setTimeout(function(): void {
      targetElement.removeAttribute('pinned-pop');
      this._maybeClearHandler(this._handlers[groupId]);
      document.body.removeChild(popEl);
      this.addPopToPopStore(groupId, null);
    }.bind(this), pop.opts.timeToHoverOnPop);
  }

  public popTopPop(): void {
    escapeStack.pop();
  }

  private _fireEvent(state: string, pop: Pop): void {
    let event = document.createEvent('CustomEvent');
    event.initCustomEvent(camelize('Popgun_' + state), true, true, {'pop': pop});

    pop.targetEl.dispatchEvent(event);
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
        if (key === 'timeToHoverOnPop') {
          clearTimeout((<any>obj)[key][groupId]);
        } else {
          clearTimeout((<any>obj)[key]);
        }
      } else {
        timeoutOrHandler();
      }
      if (key === 'timeToHoverOnPop') {
        (<any>obj)[key][groupId] = undefined;
      } else {
        (<any>obj)[key] = undefined;
      }
    }
  }

  private _maybeClearTimeout(timeout: any, groupId: string): void {
    return this._maybeClear(timeout, true, groupId);
  }

  private _maybeClearHandler(watch: any): void {
    return this._maybeClear(watch, false, null);
  }

  private _isPopAlreadyShowingForGroup(targetElement: Element): boolean {
    let groupId = targetElement.getAttribute('popgun-group');
    if (this.getPopFromGroupId(groupId)) {
      return (this.getPopFromGroupId(groupId).state === PopStateType.SHOWING);
    }
    return false;
  }

  // private _isPopAlreadyOpen(targetElement: Element): boolean {
  //   let groupId = targetElement.getAttribute('popgun-group');
  //   if (this.getPopFromGroupId(groupId)) {
  //     return ((this.getPopFromGroupId(groupId).state === PopStateType.SHOWING) &&
  //       (this.getPopFromGroupId(groupId).targetEl === targetElement));
  //   }
  //   return false;
  // }

  private _getParentPop(pop: Pop): Pop {
    let parentEl = closest(pop.targetEl, 'div[pop=""]');
    if (parentEl) {
      return this.getPopFromGroupId(parentEl.getAttribute('pop-id'));
    }
    return null;
  }

  private _maybePinOrUnpinPopAndParentPops(target: Element, pin: boolean): void {
    let groupId = target.getAttribute('popgun-group');
    let pop = this.getPopFromGroupId(groupId);
    pop.isPinned = pin;
    target.setAttribute('pinned-pop', '');
    let parentPop = this._getParentPop(pop);
    if (parentPop) {
      this._maybePinOrUnpinPopAndParentPops(parentPop.targetEl, pin);
    }
  }

  private _listenForScroll(listen: boolean, targetElem: Element): void {
    if (!listen) {
      console.log(targetElem);
    }
    document.addEventListener('scroll', () => {
      console.log('scroll');
    }, true);
  }

  private _setPosition(pop: Pop, container: Element, nose: Element): void {
    let positionOpts = {
      cushion: 8,
      containerCushion: 10,
      alignmentOffset: pop.opts.alignmentOffset,
      arrowElement: nose
    };
    positioner(container, pop.targetEl, positionOpts)
              .at(pop.opts.placement, pop.opts.optimizePlacement, pop.opts.alignment);
  }

}

export default new PopEngine();