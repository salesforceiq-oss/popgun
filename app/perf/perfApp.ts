declare var require: NodeRequire;
import ExampleGenerator from './example-generator';
(function() {
	let exampleGenerator = new ExampleGenerator();
	let examplesContainerEl:Element = document.body.querySelector('#popgunPerfSection');
	if (examplesContainerEl) {

		let formEl:HTMLFormElement = <HTMLFormElement>document.body.querySelector('#perfGeneratorForm');
		formEl.addEventListener('submit', function(event) {
			event.preventDefault();
			let numberInput:HTMLInputElement = <HTMLInputElement>formEl.querySelector('[name="numberInput"]');
			let numOfPopguns:number = parseInt(numberInput.value);

			if (typeof numOfPopguns !== 'undefined' && numOfPopguns >= 0) {
				// could be optimized by just removing examplesContainerEl and readding back in
				while(examplesContainerEl.firstChild) {
					examplesContainerEl.removeChild(examplesContainerEl.firstChild);
				}

				// generate examples
				for (var idx = 0; idx < numOfPopguns; idx++) {
					examplesContainerEl.appendChild(exampleGenerator.createPopgun());
				}
			}
		});
	}
})();
