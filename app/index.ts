///<reference path="../typings/index.d.ts"/>
declare var require: NodeRequire;
let popgun = require('../.src').default;
// must instantiate popgun.
popgun.init();

require('./exampleApp.js');
require('./perf/perfApp.js');
