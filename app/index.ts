///<reference path="../typings/tsd.d.ts"/>
declare var require: NodeRequire;
let popgun = require('../.src').default;

let testSchema = { showDelay: 1000, trigger: 'hover' };
let groupOpts = {
  schema: 'testSchema',
  options: { showDelay: 250, text: 'Wow! I cannot believe Popgun actually works!' }
};
popgun.addSchemaToSchemaStore('testSchema', testSchema);
popgun.addGroupOptionsToGroupStore('test', groupOpts);

let el = document.createElement('div');
el.setAttribute('popgun', '');
el.setAttribute('class', 'target');
el.setAttribute('popgun-group', 'test1');
el.setAttribute('popgun-trigger', 'click');
el.setAttribute('popgun-html', '<div popgun popgun-group="test">Hover here for a nested pop!</div>');
el.innerText = 'Click Me!';
document.body.appendChild(el);

el = document.createElement('div');
el.setAttribute('popgun', '');
el.setAttribute('class', 'target different-class');
el.setAttribute('popgun-group', 'test2');
el.setAttribute('popgun-trigger', 'hover click');
el.setAttribute('popgun-html', 'Why does being <i>up for something</i> and <i>down for something</i> mean the same thing?');
el.innerText = 'Hover or Click Me!';
document.body.appendChild(el);

el = document.createElement('div');
el.setAttribute('popgun', '');
el.setAttribute('class', 'target');
el.setAttribute('popgun-group', 'test1');
el.setAttribute('popgun-trigger', 'hover');
el.setAttribute('popgun-html', 'Pirates are way cooler than ninjas.');
el.innerText = 'Hover Me!';
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