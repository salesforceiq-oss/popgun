///<reference path="../typings/tsd.d.ts"/>
declare var require: NodeRequire;
let popgun = require('../.src').default;

let el = document.createElement('div');
el.setAttribute('popgun', '');
el.setAttribute('class', 'insert');
el.setAttribute('id', 'inserted');
el.setAttribute('popgun-group', 'test');
el.setAttribute('popgun-trigger', 'click');
el.setAttribute('popgun-html', 'HELLO WORLD!!');
document.body.appendChild(el);

let el2 = document.createElement('div');
el2.setAttribute('popgun', '');
el2.setAttribute('class', 'insert');
el2.setAttribute('id', 'inserted2');
el2.setAttribute('popgun-group', 'test');
el2.setAttribute('popgun-trigger', 'hover');
// el2.setAttribute('popgun-show-delay', '500');
el2.setAttribute('popgun-html', 'BANANA!!');
document.body.appendChild(el2);

// let el3 = document.createElement('input');
// el3.setAttribute('popgun', '');
// // el3.setAttribute('class', 'insert');
// // el3.setAttribute('id', 'inserted2');
// el3.setAttribute('popgun-group', 'test');
// el3.setAttribute('popgun-trigger', 'focus');
// // el3.setAttribute('popgun-show-delay', '500');
// el3.setAttribute('popgun-html', 'BANANA!!');
// document.body.appendChild(el3);



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