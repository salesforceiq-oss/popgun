///<reference path="../typings/tsd.d.ts"/>
declare var require: NodeRequire;
let popgun = require('../.src').default;

let el = document.createElement('div');
el.setAttribute('popgun', '');
el.setAttribute('id', 'inserted');
document.body.appendChild(el);

popgun.hello();