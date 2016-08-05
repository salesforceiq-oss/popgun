declare var require: NodeRequire;
import ExampleGenerator from './example-generator';
(function() {
	let exampleGenerator = new ExampleGenerator();

	var examplesContainerEl = document.body.querySelector('#popgunPerfSection');
	if (examplesContainerEl) {
		for (var idx = 0; idx < 1000; idx++) {
			examplesContainerEl.appendChild(exampleGenerator.createPopgun());
		}
	}
})();
