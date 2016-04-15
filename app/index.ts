///<reference path="../typings/tsd.d.ts"/>
declare var require: NodeRequire;
let popgun = require('../.src').default;

let el = document.createElement('div');
el.setAttribute('popgun', '');
el.setAttribute('id', 'inserted');
el.setAttribute('popgun-trigger', 'click hover');
el.setAttribute('popgun-html', 'HELLO WORLD!!');
document.body.appendChild(el);



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