[![npm][npm-badge]][npm-badge-url]
[npm-badge]: https://img.shields.io/npm/v/popgun.svg
[npm-badge-url]: https://www.npmjs.com/package/popgun

# Popgun

## What is Popgun?

Popgun is a pure Javascript popover component for high performance and feature-rich web applications!

## How to Use

### Simple implementation
Define a target element and set some inline attributes.

**html**
```html
<!-- On hover, a text popover will appear. -->
<div popgun popgun-trigger="hover" popgun-text="Hello World"></div>
```

### Register Groups and Schemas
If there are a lot of popgun elements, rather than define inline attributes, register groups and schemas.

**html**
```html
<!-- On hover, an html element popover will appear -->
<div popgun popgun-group="sampleGroup1"></div>

<!-- On click or hover, a text popover will appear. -->
<div popgun popgun-group="sampleGroup2"></div>

<!-- On click or hover, a text popover will appear with the overriden inline attribute. -->
<div popgun 
     popgun-group="sampleGroup2" 
     popgun-text="Inline attribute override group attributes, which override schema options.">
</div>
```
**js**
```javascript
// A base schema 
var schema = {
  hoverDelay: 200,
  trigger: 'hover'
}
popgun.registerSchema('sampleSchema', schema);

// A group based on schema
var group = {
  schemaId: 'sampleSchema',
  options: {
    html: '<div>html element</div>'
  }
}

// Another group based on schema that overrides one of the schema attribute
var anotherGroup = {
  schemaId: 'sampleSchema',
  options: {
    text: 'This is sample text.',
    trigger: 'click hover'
  }
}

popgun.registerGroup('sampleGroup1', group);
popgun.registerGroup('sampleGroup2', anotherGroup);
```

### Popgun Attributes
Some Popgun attributes that you can define are:
* **containerCushion**: *(int - default 10)* the amount of padding between the popover border and the window.
* **darkStyle**: *(boolean - default false)* Sets a dark theme to the popover.
* **disable**: *(boolean - default false)* Clicking elsewhere on the page of a pinned popover will not hide the popm if this is set to true.
* **disableClickOff**: *(boolean - default false)* When triggering a popgun target, the popover will not display if this attribute is set to true.
* **fadeDuration**: *(int - default 100)* time for pop to fade in and out.
* **html**: an html element for the content of the popover (will take precedence over the text attribute).
* **optimzePlacement**: *(boolean - default true)* popgun will decide how to best position the popover.
* **placement**: *(string - default 'top')* you can set placement of popover around target - 'top', 'bottom', 'left', 'right'.
* **reusePopover**: *(boolean - default true)* boolean which sets whether popgun will reuse the same popover when moving between two Popgun targets of the same group.
* **showDelay**: *(int - default 0)* the time it takes between the user triggering the target and the popover appearing.
* **text**: text content for the popover.
* **timeToHoverOnPop**: *(int - default 300)* the time a user has to hover back over the popover when they hover off the target.
* **tipClass**: *(string - default '')* Adds css classes to the popover container (class names should be space separated).
* **trigger**: *(string - default 'hover')* triggers for the target to show pop - 'hover', 'click', 'focus'.

### DOM Events
Throughout the life cycle of the popover, Popgun will fire the following events onto the target:

**Show States**
* PopgunContentSetup
* PopgunPrePosition
* PopgunPreShow
* PopgunShowing

**Hide States**
* PopgunPreHide
* PopgunHidden

**js**
```javascript
el.addEventListener('PopgunPreShow', function(e) {
  console.log('PopgunPreShow');
}, false);
```


## Run Demo Popgun Application
Run `bin/iqb install` in the root directory to install the npm and typings dependencies.

Run `bin/iqb start` in the root directory to run a demo application with Popgun.
