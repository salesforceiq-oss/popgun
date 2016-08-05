import ColorGenerator from './color-generator';

export default class ExampleGenerator {

	constructor() {
		this.colorGenerator = new ColorGenerator();
		this.id = 0;
	}

	public createPopgun(): Element {
		let trigger = document.createElement('div');

		trigger.setAttribute('popgun', '');
		trigger.setAttribute('pop-id', 'popgun-id-' + this.id);
		this.id++;
		trigger.setAttribute('popgun-text', 'Hello World');
		trigger.classList.add('popgun-example');

		var block = document.createElement('div');
		block.classList.add('pop-example-block');
		block.setAttribute('style', 'background-color: ' + this.colorGenerator.generateColor());

		trigger.appendChild(block);
		return trigger;
	}
	id: number;
	colorGenerator: ColorGenerator;
}

