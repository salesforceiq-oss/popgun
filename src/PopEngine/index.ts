import popStore from '../PopStore';
import groupStore from '../GroupStore';
import Trigger from '../Trigger';
import Options from '../Options';
import IGroup from '../IGroup';
import PopStateType from '../PopStateType';
import Pop from '../Pop';
import popChainManager from '../PopChainManager';
import UserAgentUtil from '../UserAgentUtil';
let camelize = require('camelize');
let closest = require('closest');
let positioner = require('positioner');
let zIndexManager = require('z-index-manager').default;
const createEscapeStack = require('escape-stack').default;

export class PopEngine {

  _timeouts: {
    hoverdelay: any
    popHover: any
    scrollTimer: { [key: string]: number }
    timeToHoverOnPop: { [key: string]: number }
  } = {
    hoverdelay: null,
    popHover: null,
    scrollTimer: {},
    timeToHoverOnPop: {}
  };

  _handlers: {
    [groupId: string]: any
  } = {};

  _transitionendCallbacks: {
    [groupId: string]: any
  } = {};

  escapeStack: any = null;

  constructor() {
    this.escapeStack = createEscapeStack();
  }

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

  public popTopPop(): void {
    this.escapeStack.pop();
  }

  public isPopAlreadyOpenForGroup(groupId: string): boolean {
    if (this.getPopFromGroupId(groupId)) {
      return (this.getPopFromGroupId(groupId).state === PopStateType.SHOWING ||
              this.getPopFromGroupId(groupId).state === PopStateType.PRE_HIDE);
    }
    return false;
  }

  public isPopAlreadyOpenForTarget(targetElement: Element): boolean {
    let groupId = targetElement.getAttribute('popgun-group');
    if (this.getPopFromGroupId(groupId)) {
      return ((this.getPopFromGroupId(groupId).state === PopStateType.SHOWING ||
                this.getPopFromGroupId(groupId).state === PopStateType.PRE_HIDE) &&
        (this.getPopFromGroupId(groupId).targetEl === targetElement));
    }
    return false;
  }

  public setState(pop: Pop, state: string, targetOpts: Options, result: any, renotify: boolean): void {
    if (state !== pop.state || renotify) {
      pop.state = state;

      this._fireEvent(state, pop);
    }
  }

  public clearTimeout(targetElement: Element): void {
    let groupId = targetElement.getAttribute('popgun-group') || targetElement.getAttribute('pop-id');
    this._clearTimeoutByGroupId(groupId);
  }

  public createPopElement(targetElement: Element): Element {
    let container: Element = document.createElement('div');
    let nose: Element = document.createElement('div');
    container.classList.add('popover');
    container.classList.add('hidden');
    container.setAttribute('pop-id', targetElement.getAttribute('popgun-group'));
    container.setAttribute('pop', '');
    nose.setAttribute('class', 'nose-triangle');
    container.setAttribute('style', 'z-index: ' + zIndexManager.getHighest().toString() + ';');
    container.appendChild(nose);
    return container;
  }

  public showPop(targetElement: Element, isPinned: boolean, pop: Pop): void {
    let delay = isPinned ? 0 : pop.opts.showDelay;
    let groupId = targetElement.getAttribute('popgun-group');
    let isAlreadyShowing = this.isPopAlreadyOpenForGroup(groupId);

    // clear any timeouts and do a timeout and show pop
    this.clearTimeout(targetElement);
    this._timeouts.hoverdelay = setTimeout(function(): void {
      let animationEndStates = {};

      // this is gross and should be refactored
      // we store the old pop because it will be overwritten and we need it later
      let container = <Element>document.querySelector('div[pop-id="' + groupId + '"]');
      let oldPop = this.getPopFromGroupId(groupId);
      this.addPopToPopStore(targetElement.getAttribute('popgun-group'), pop);
      this._maybeSetParentChildRelationship(pop);
      if (isAlreadyShowing && !!container) {
        oldPop.targetEl.removeAttribute('pinned-pop');
        if (!!oldPop && !!oldPop.childPops.length) {
          oldPop.childPops.forEach(function(child: Pop): void {
            this.hidePop(child.targetEl, false);
          }, this);
        }
        if (!!oldPop && !!oldPop.parentPop) {
          let idx = oldPop.parentPop.childPops.indexOf(oldPop);
          if (idx !== -1) {
            oldPop.parentPop.childPops.splice(idx, 1);
          }
        }
      }

      if (isAlreadyShowing && !!container) {
        // if pop is already showing for group, reuse
        container.removeChild(container.getElementsByClassName('pop-content')[0]);
        this._maybeClearHandler(this._handlers[groupId]);
      } else {
        container = this.createPopElement(targetElement);
        document.body.appendChild(container);
      }

      if (UserAgentUtil.isSafari() && !this._transitionendCallbacks[groupId]) {
        this._transitionendCallbacks[groupId] = this._removeHiddenClass.bind(this);
        document.querySelector('div[pop-id="' + groupId + '"]').addEventListener('transitionend', this._transitionendCallbacks[groupId], true);
      }

      if (isPinned) {
        popChainManager.maybePinOrUnpinPopAndParentPops(targetElement, true);
      }

      this._maybeClearTimeout(this._timeouts.popHover, null);
      this._listenForScroll(true, groupId, container);

      // CONTENT SETUP
      this.setState(pop, PopStateType.CONTENT_SETUP, pop.opts, null, false);
      container.appendChild(pop.popOver.element);

      // PRE POSITION
      this.setState(pop, PopStateType.PRE_POSITION, pop.opts, null, false);

      this._maybeClearTimeout(this._timeouts.position, null);
      this._timeouts.position = setTimeout(function(): void {

        this._setPosition(pop, container);

        // PRE SHOW
        this.setState(pop, PopStateType.PRE_SHOW, pop.opts, null, false);

        this._maybeClearTimeout(this._timeouts.hoverdelay, null);
        this._handlers[groupId] = this.escapeStack.add(function(): boolean {
          this.hidePop(pop.targetEl, false);
          return true;
        }.bind(this));

        // SHOWING
        this.setState(pop, PopStateType.SHOWING, pop.opts, null, false);
        if (!UserAgentUtil.isSafari()) {
          container.classList.remove('hidden');
        }

      }.bind(this));
    }.bind(this), delay);
  }

  public hidePop(targetElement: Element, hideFullChain: boolean): void {
    let groupId = targetElement.getAttribute('popgun-group') || targetElement.getAttribute('pop-id');
    let pop = this.getPopFromGroupId(groupId);

    if (pop) {
      this.setState(pop, PopStateType.PRE_HIDE, pop.opts, null, false);

      this._timeouts.timeToHoverOnPop[groupId] = setTimeout(function(): void {

        let popChain = popChainManager.getFullPopChain(pop, hideFullChain);

        popChain.forEach(function(p: Pop): void {
          popChainManager.removeParentChildRelationship(p);
          let popOver = closest(p.popOver.element, 'div[pop=""]');
          if (popOver) {
            let g = popOver.getAttribute('pop-id');
            p.targetEl.removeAttribute('pinned-pop');

            this._maybeClearHandler(this._handlers[g]);
            this._listenForScroll(false, g, popOver);

            this.setState(p, PopStateType.HIDDEN, p.opts, null, false);

            if (!!popOver) {
              document.body.removeChild(popOver);
            }
            this.addPopToPopStore(g, null);
          }
        }, this);

      }.bind(this), pop.opts.timeToHoverOnPop);
    }
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

  private _clearTimeoutByGroupId(groupId: string): void {
    this._maybeClearTimeout(this._timeouts.timeToHoverOnPop, groupId);
    this._maybeClearTimeout(this._timeouts.hoverdelay, null);
  }

  private _maybeClearTimeout(timeout: any, groupId: string): void {
    return this._maybeClear(timeout, true, groupId);
  }

  private _maybeClearHandler(watch: any): void {
    return this._maybeClear(watch, false, null);
  }

  private _getParentPop(pop: Pop): Pop {
    let parentEl = closest(pop.targetEl, 'div[pop=""]');
    if (parentEl) {
      return this.getPopFromGroupId(parentEl.getAttribute('pop-id'));
    }
    return null;
  }

  private _listenForScroll(listen: boolean, groupId: string, container: Element): void {
    if (!listen) {
      document.removeEventListener('scroll', this._positionOpenPops.bind(this), true);
    } else {
      document.addEventListener('scroll', this._positionOpenPops.bind(this), true);
    }
  }

  private _positionOpenPops(): void {
    let popElementsList = Array.prototype.slice.call(document.body.getElementsByClassName('popover'));
    popElementsList.forEach(function(popOver: Element): void {
      let groupId = popOver.getAttribute('pop-id');
      this._maybeClearTimeout(this._timeouts.scrollTimer, groupId);
      this._timeouts.scrollTimer[groupId] = setTimeout(function(): void {
        this._setPosition(this.getPopFromGroupId(groupId), popOver);
      }.bind(this), 100);
    }, this);
  }

  private _setPosition(pop: Pop, container: Element): void {
    let nose = <Element>container.getElementsByClassName('nose-triangle')[0];
    let positionOpts = {
      cushion: pop.opts.cushion,
      containerCushion: pop.opts.containerCushion,
      alignmentOffset: pop.opts.alignmentOffset,
      arrowElement: nose
    };
    positioner(container, pop.targetEl, positionOpts)
              .at(pop.opts.placement, pop.opts.optimizePlacement, pop.opts.alignment);
  }

  private _maybeSetParentChildRelationship(pop: Pop): void {
    if (!!popChainManager.isNestedPop(pop)) {
      let parent = this.getPopFromGroupId((<Element>closest(pop.targetEl, '[pop]', true)).getAttribute('pop-id'));
      popChainManager.setParentChildRelationship(parent, pop);
    }
  }

  private _removeHiddenClass(e: Event): void {
    let groupId = (<Element>e.target).getAttribute('pop-id');
    e.target.removeEventListener(e.type, this._transitionendCallbacks[groupId], true);
    this._transitionendCallbacks[groupId] = null;
    (<Element>e.target).classList.remove('hidden');
  }

}

export default new PopEngine();
