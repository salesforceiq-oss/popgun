///<reference path="../typings/index.d.ts"/>
declare var require: NodeRequire;

(function() {
  let popgun = require('../.src').default;
  let testSchema = { showDelay: 1000, trigger: 'hover' };
  let groupOpts = {
    schema: 'testSchema',
    options: { showDelay: 250, html: '<div popgun popgun-group="test5" popgun-trigger="click" popgun-text="hi">Wow! I cannot believe Popgun actually works!</div>' }
  };
  popgun.registerSchema('testSchema', testSchema);
  popgun.registerGroup('test', groupOpts);


  let exampleContainerEl = document.body.querySelector('#popgunExampleSection');
  if (exampleContainerEl) {
    let el = document.createElement('div');
    el.setAttribute('popgun', '');
    el.setAttribute('class', 'target');
    el.setAttribute('popgun-group', 'test1');
    el.setAttribute('popgun-trigger', 'click');
    el.setAttribute('popgun-html', '<div popgun popgun-group="test" popgun-trigger="click hover">Click/Hover here for a nested pop!</div>');
    el.innerText = 'Click Me!';
    exampleContainerEl.appendChild(el);

    el = document.createElement('div');
    el.setAttribute('popgun', '');
    el.setAttribute('class', 'target different-class');
    el.setAttribute('popgun-group', 'test2');
    el.setAttribute('popgun-trigger', 'hover click');
    el.setAttribute('popgun-html', 'Why does being <i>up for something</i> and <i>down for something</i> mean the same thing?');
    el.innerText = 'Hover or Click Me!';
    exampleContainerEl.appendChild(el);

    el = document.createElement('div');
    el.setAttribute('popgun', '');
    el.setAttribute('class', 'target');
    el.setAttribute('popgun-group', 'test1');
    el.setAttribute('popgun-trigger', 'hover');
    el.setAttribute('popgun-dark-style', 'true');
    el.setAttribute('popgun-html', 'Pirates are way cooler than ninjas.');
    el.innerText = 'Hover Me I am dark styled!!';
    exampleContainerEl.appendChild(el);

    let inp = document.createElement('input');
    inp.setAttribute('type', 'text');
    inp.setAttribute('placeholder', 'Focus me!');
    inp.setAttribute('popgun', '');
    inp.setAttribute('popgun-group', 'test3');
    inp.setAttribute('popgun-trigger', 'focus');
    inp.setAttribute('popgun-placement', 'right');
    inp.setAttribute('popgun-html', '<div>Wow! Focusing too?!</div>');
    exampleContainerEl.appendChild(inp);

    // Test Event Listeners
    el.addEventListener('PopgunContentSetup', function(e) {
      console.log('PopgunContentSetup');
    }, false);

    el.addEventListener('PopgunPrePosition', function(e) {
      console.log('PopgunPrePosition');
    }, false);

    el.addEventListener('PopgunPreShow', function(e) {
      console.log('PopgunPreShow');
    }, false);

    el.addEventListener('PopgunShowing', function(e) {
      console.log('PopgunShowing');
    }, false);

    el.addEventListener('PopgunPreHide', function(e) {
      console.log('PopgunPreHide');
    }, false);

    el.addEventListener('PopgunHidden', function(e) {
      console.log('PopgunHidden');
    }, false);
  }
})();
