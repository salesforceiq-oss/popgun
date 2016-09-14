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
  let leftColumn = document.body.querySelector('#left');
  let rightColumn = document.body.querySelector('#right');

  if (exampleContainerEl && leftColumn && rightColumn) {
    // POPGUN TARGETS
    let el1 = document.createElement('div');
    el1.setAttribute('popgun', '');
    setPopgunElements(el1);
    el1.setAttribute('class', 'target');
    el1.innerText = 'Target One';
    rightColumn.appendChild(el1);

    let el2 = document.createElement('div');
    el2.setAttribute('popgun', '');
    setPopgunElements(el2);
    el2.setAttribute('class', 'target different-class');
    el2.innerText = 'Target Two';
    rightColumn.appendChild(el2);

    let el3 = document.createElement('div');
    el3.setAttribute('popgun', '');
    setPopgunElements(el3);
    el3.setAttribute('class', 'target very-different-class');
    el3.innerText = 'Target Three';
    rightColumn.appendChild(el3);

    let btn1 = document.createElement('button');
    btn1.innerText = 'Set Target One\'s Popgun Attributes';
    leftColumn.appendChild(btn1);

    let btn2 = document.createElement('button');
    btn2.innerText = 'Set Target One\'s Popgun Attributes';
    leftColumn.appendChild(btn2);

    let btn3 = document.createElement('button');
    btn3.innerText = 'Set Target One\'s Popgun Attributes';
    leftColumn.appendChild(btn3);

    btn1.addEventListener('click', function(e) {
      setPopgunElements(el1);
    });

    btn2.addEventListener('click', function(e) {
      setPopgunElements(el2);
    });

    btn3.addEventListener('click', function(e) {
      setPopgunElements(el3);
    });

    function setPopgunElements(el: Element): void {
      let trigger = (<HTMLInputElement>document.getElementById('popgun-trigger')).value;
      el.setAttribute('popgun-trigger', trigger);

      let group = (<HTMLInputElement>document.getElementById('popgun-group')).value;
      el.setAttribute('popgun-group', group);

      let placement = (<HTMLInputElement>document.getElementById('popgun-placement')).value;
      el.setAttribute('popgun-placement', placement);

      let alignment = (<HTMLInputElement>document.getElementById('popgun-alignment')).value;
      el.setAttribute('popgun-alignment', alignment);

      let timeToHoverOnPop = (<HTMLInputElement>document.getElementById('popgun-time-to-hover-on-pop')).value;
      el.setAttribute('popgun-time-to-hover-on-pop', timeToHoverOnPop);

      let showDelay = (<HTMLInputElement>document.getElementById('popgun-show-delay')).value;
      el.setAttribute('popgun-show-delay', showDelay);

      let tipClass = (<HTMLInputElement>document.getElementById('popgun-tip-class')).value;
      el.setAttribute('popgun-tip-class', tipClass);

      let text = (<HTMLInputElement>document.getElementById('popgun-text')).value;
      el.setAttribute('popgun-text', text);

      let html = (<HTMLInputElement>document.getElementById('popgun-html')).value;
      el.setAttribute('popgun-html', html);

      let darkStyle = (<HTMLInputElement>document.getElementById('popgun-dark-style')).checked;
      el.setAttribute('popgun-dark-style', darkStyle.toString());

      let optimizePlacement = (<HTMLInputElement>document.getElementById('popgun-optimize-placement')).checked;
      el.setAttribute('popgun-optimize-placement', optimizePlacement.toString());

      let disable = (<HTMLInputElement>document.getElementById('popgun-disable')).checked;
      el.setAttribute('popgun-disable', disable.toString());

      let reusePopover = (<HTMLInputElement>document.getElementById('popgun-reuse-popover')).checked;
      el.setAttribute('popgun-reuse-popover', reusePopover.toString());

      let eventListeners = (<HTMLInputElement>document.getElementById('popgun-event-listeners')).checked;
      if (eventListeners) {
        setEventListeners(el);
      }
    }

    function setEventListeners(el: Element): void {
      // Test Event Listeners
      el.addEventListener('PopgunContentSetup', function(e) {
        console.log('PopgunContentSetup fired!');
      }, false);

      el.addEventListener('PopgunPrePosition', function(e) {
        console.log('PopgunPrePosition fired!');
      }, false);

      el.addEventListener('PopgunPreShow', function(e) {
        console.log('PopgunPreShow fired!');
      }, false);

      el.addEventListener('PopgunShowing', function(e) {
        console.log('PopgunShowing fired!');
      }, false);

      el.addEventListener('PopgunPreHide', function(e) {
        console.log('PopgunPreHide fired!');
      }, false);

      el.addEventListener('PopgunHidden', function(e) {
        console.log('PopgunHidden fired!');
      }, false);
    }
  }
})();
