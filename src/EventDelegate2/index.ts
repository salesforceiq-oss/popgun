import Trigger from '../Trigger';
import TriggerType from '../TriggerType';
import TriggerEventType from '../TriggerEventType';
/* FIXME this could use some rework too */
import PopChainManager2 from '../PopChainManager';
let closest = require('closest');

class Pop {

}

class PopTreeManager {
	public startNewTree(triggerEl: Element): void {

	}

	public addToExistingTree(triggerEl: Element) : void {
		
	}

	public shouldStartNewTree(triggerElement: Element): boolean {
		return false;
	}

	/* FIXME need to change return type */
	public getPopFromGroupId(element: Element): Pop {
		return new Pop();
	}

	public isPopForTriggerOpen(element : Element): boolean {
		return false;
	}

	/* FIXME pop should be something more specific */
	public isPopAssociatedToTrigger(triggerElement: Element, pop: Pop): boolean {
		return false;
	}
}

export class EventDelegate {

	private popTreeManager: any;
	public init(): void {
    	this.popTreeManager = new PopTreeManager();
	    this._setEventListener(new Trigger(TriggerType[TriggerType['CLICK']]), this.onClick);
	    this._setEventListener(new Trigger(TriggerType[TriggerType['HOVER']]), this.onHover);
	    this._setEventListener(new Trigger(TriggerType[TriggerType['FOCUS']]), this.onFocus);
	    this._setEventListener(new Trigger(TriggerType[TriggerType['MANUAL']]), this.onManual);
	    this._setEventListener(new Trigger(TriggerType[TriggerType['MOUSEOUT']]), this.onMouseOut);
	}

	public onClick(e: MouseEvent): void {
		/*
			This should click, see if what you click is triggerable 
			if pop-triggerable, then run through pipeline..?
		*/
		let popTriggerEl: Element = this._getPopgunTrigger(<Element>e.target);
		if (popTriggerEl) {
			// FIXME not sure if the correct group id attribute name
			let pop = this.popTreeManager.getPopFromGroupId(popTriggerEl.getAttribute('pop-groupid'));
			// is pop open?
			if (pop) {
				if (this.popTreeManager.isPopAssociatedToTrigger(popTriggerEl, pop)) {
					// does not need to move, clicked a trigger, so should close pop
				} else {
					// move pop, and replace content
				}
			} else {
				// pop is not open, create pop and add to chain
				// FIXME implement

			}
		}
		this._updatePopStates();
	}

	public onHover(e: MouseEvent): void {
		let popTriggerEl = this._getPopgunTrigger(<Element>e.target);
		let popEl = this._getPop(<Element>e.target);
		if (popTriggerEl) {
			// open up new chain thingie
			// FIXME need to check if the trigger is a hover event
			if (this.popTreeManager.shouldStartNewTree(popTriggerEl)) {
				this.popTreeManager.startNewTree(popTriggerEl);
			} else {
				// FIXME not sure if the correct group id attribute name
				let pop = this.popTreeManager.getPopFromGroupId(popTriggerEl.getAttribute('pop-groupid'));
				if (this.popTreeManager.isPopAssociatedToTrigger(popTriggerEl, pop)) {

				} else {
					this.popTreeManager.addToExistingTree(popTriggerEl);
				}
			}
		} 
		this._updatePopStates();
	}

	public onFocus(e: Event): void {
		/* FIXME is this really needed...? */
	}

	public onManual(e: Event): void {
		/* FIXME To this day I still do not know what is trying to be achieved by this */
	}

	public onMouseOut(e: MouseEvent): void {
		this._updatePopStates();
	}

	private _updatePopStates():void {
		// FIXME i don't like this because it does timeout stuff within.. less control
		// close all pops that are unpinned and not hovered
		// for each pop that is unpinned or not hovered / or parent of hovered
			// if the pop does not have a timer set yet, then set one
			// else

		// for each pop that is hovered and parent
			// if a timeout has been set
				// clear it
	}

	private _getPopgunTrigger(element: Element): Element {
		return closest(element, '[popgun]', true);
	}

	private _getPop(element: Element): Element {
		return closest(element, '[pop]', true);
	}

	private _setEventListener(trigger: Trigger, listener: (e: Event) => void): void {
    	document.removeEventListener(<string>trigger.eventType, listener.bind(this));
    	document.addEventListener(<string>trigger.eventType, listener.bind(this), trigger.useCapture);
  	}
}
