import ColorGenerator from './color-generator';

export default class ExampleGenerator {

	constructor() {
		this.colorGenerator = new ColorGenerator();
		this.id = 0;
	}

	public createPopgun(): Element {
		let target = document.createElement('div');

		target.setAttribute('popgun', '');
		target.setAttribute('pop-id', 'popgun-id-' + this.id);
		this.id++;
		target.setAttribute('popgun-text', 'Hello World');
		target.classList.add('popgun-example');

		var block = document.createElement('div');
		block.classList.add('pop-example-block');
		block.setAttribute('style', 'background-color: ' + this.colorGenerator.generateColor());

		target.appendChild(block);
		return target;
	}
	id: number;
	colorGenerator: ColorGenerator;
}

