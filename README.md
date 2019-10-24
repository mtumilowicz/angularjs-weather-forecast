* _Reference_: https://www.udemy.com/learn-angularjs/
* _Reference_: https://www.udemy.com/course/angularjs-jumpstart/
* _Reference_: https://www.udemy.com/es6-bootcamp-next-generation-javascript/
* _Reference_: https://docs.angularjs.org/guide
* _Reference_: https://essenceofcode.com/2015/08/21/awesome-angular-controllers-with-es6-6-easy-steps/
* running scripts from package.json - `npm run-script <command> [--silent] [-- <args>...]`
# ES6
* you can think about ES6 as a javascript next version
* ES5 supported by all browsers, ES6 needs polyfills and transpilers
1. es6 compatibility with browsers
	* compiler: ES6 -> ES5 (temporary until browsers will support es6)
	* module loader: webpack, jspm
	* server: nodejs
1. `let`, `const`
    * no hoisting (moving declarations to the top of their scope)
	* `let` - block scope
	* `const` - can't change reference
1. lambda, fat arrow (`=>`)
    * `this` value of the enclosing lexical scope
1. rest operator `...`
    ```
   	function sumUp(...toAdd) {
   		...
   	}
    ```
	* in short words, converts argument list into an array: `sumUp(1,2,3,4) -> sumUp([1,2,3,4])`
1. spread operator `...`
    ```
   	let numbers = [1,2,3,4,5];
   	console.log(...numbers); // 1 \n 2 \n 3 ...
   	console.log(Math.max(...numbers)); // without ... NAN
    ```
1. the for-of loop
    ```
   	let xxx = [1, 2, 3, 4];
   	for (let x of xxx) {
   		console.log(x);
   	}
    ```
1. template literals, `${}`
    ```
   	let name = 'max';
   	let description = `Hello, Im ${name}`;
    ```
1. desctructuring array
    ```
    let numbers = [1, 2, 3];
    let [a, b] = numbers;
    console.log(a); // 1
    console.log(b); // 2
    ```
    ```
    let [a, ...b] = numbers;
    console.log(b) // 2, 3
    ```
    ```
    let numbers = [1, 2, 3];
    let [a, ,c] = numbers;
    // a = 1, c = 3
    ``` 
    * undefined if value has no equivalent  
1. desctructuring objects
    ```
   	let obj = {
   		name: 'aa'
   		age: 27
   		greet: a => console.log('a');
   	
   	}
   	let {name, age} = obj;
    ```
1. classes
    ```
   	class X {
   		constructor(name) {
   			this._name = name; // private field
   		}
   	
   		get name() { // bind to property
            return this._name;
        }
   
        set name(newName) { // binds to property
            this._name = newName;
        }
   	}
   	
   	let x = new X();
   	console.log(x.name);
    x.name = 'a';
    ```
1. importing / exporting, default exports
1. modules are always in Strict Mode (no need to define "use strict")
1. each module has its own scope
1. maps and sets

# angularjs
## Template
* HTML with additional markup
* markup / markdown - syntax that annotates text and could be then interpreted (this readme is written using markdown)
* written with HTML that contains AngularJS-specific elements and attributes
* is parsed and processed by AngularJS compiler during application start
    * recursive process of attaching directives mirrors the process of compiling source code in compiled programming 
    languages
* combined with information from the model and controller creates the dynamic view that a user sees in the browser
* types:
    * [Directive](#Directive)
    * [Markup](#Markup)
    * [Filter](#Filter)
    * [Form controls](#Form-controls)
### Directive
* extends HTML with custom attributes and elements
* the only place where an application should access the DOM is within directives
* directives are markers on a DOM element (attribute, element name, comment, CSS class) that tell compiler to attach 
a specified behavior (e.g. via event listeners) or to transform it
* when AngularJS bootstraps application, the compiler traverses the DOM matching directives against the DOM elements
* normalization
    * directives usually are referred by their camelCase name (e.g. `ngModel`)
    * HTML is case-insensitive, so directives in the DOM typically have dash-delimited attributes (e.g. `ng-model`)
    * process
        1. strip `x-` and `data-` from the front of the element/attributes
        1. convert `:`, `-`, or `_` to camelCase
* `$compile` matches directives based on 
    * `(E)` element names, 
    * `(A)` attributes, 
    * `(C)` class names, 
    * `(M)` and comments 
    * default is: `EA`
* transclusion: including some content from one template to another
    * https://teropa.info/blog/2015/06/09/transclusion.html
* `scope: {...}` - isolated scope
    * directive can gain access to the parent scope by using some special symbols known as prefixes
    * 3 types of prefixes:
        * `@` – text binding (receive the value from the outer scope as a string)
            * one-way binding: parent scope -> directive scope
        * `=` – direct model binding / two-way binding
        * `&` – behavior binding / method binding
### Markup
* interpolation - the process of evaluating a string literal containing one or more placeholders, in which 
placeholders are replaced with their corresponding values
* access variables and functions from the scope
* allows AngularJS to read and write variables
* `{{ expression | filter }}`
* compiler replaces it with the evaluated value of the markup
* is processed by `$parse`
* no direct access to global variables like window, document or location
* evaluation is forgiving to `undefined` and `null`
    * js: evaluating `a.b.c` throws an exception if `a` is not an object
    * it makes more sense to show nothing than to throw an exception if `a` is `undefined` 
    (perhaps we are waiting for the server response, and it will become defined soon)
* invoking a function `a.b.c()` on `undefined` or `null` simply returns `undefined`
* no control flow statement apart from the ternary operator `(a ? b : c)`, cause logic should be 
in controllers, not the views
### Filter
* formats the value of an expression for display to the user
* underlying API is the `$filterProvider`
* `{{ expression | filter }}`
* e.g. `{{ 12 | currency }}` produces $12.00
* chaining: `{{ expression | filter1 | filter2 | ... }}`
* filter arguments: `{{ expression | filter:argument1:argument2:... }}`
    * e.g. `{{ 1234 | number:2 }}` formats the number `1234` with `2` decimal 
    points using the number filter produces `1,234.00`
* primitive type filters are only executed when their inputs have changed
    * 7 primitive data types: `string`, `number`, `bigint`, `boolean`, `null`, `undefined`, and `symbol`
* objects type filters are executed on each `$digest` (it would be too costly to track if the inputs have 
changed)
* could be used in controllers, services, and directives (dependency injection)
* custom filters
    * just register a new filter factory function with your module
        ```
        angular.module('app', [])
        .filter('filterName', () => (input, otherArgs...) => {
        ```
    * should be pure functions
### Form controls
* Controls: input, select, textarea
* Form: collection of controls
* form and controls provide validation services
* by default: any change to the content will trigger a model update and form validation
* basic implementation for
    * text, number, url, email, date, radio, checkbox
    * required, pattern, minlength, maxlength, min, max
## Model
* the data shown to the user in the view and with which the user interacts
## Scope
* context where the model is stored so that controllers, directives and expressions can access it
* flow of a browser
    1. receive an event
    1. execute a corresponding JavaScript callback
    1. the callback completes
    1. browser re-renders the DOM
    1. wait for more events
* AngularJS modifies the normal JavaScript flow by providing its own event processing loop
* to properly process model modifications the execution has to enter the AngularJS execution context (otherwise 
AngularJS is unaware of model modifications)
* digest loop - has something changed?
    * below line of reasoning is not exactly true, but good to strengthen intuition
    * assumption: model changes happen only on user interaction
    * interactions can happen e.g. due to
        * mouse activity (move, clicked etc)
        * keyboard activity (key up, key down etc)
    * directives for the corresponding events wrap the expression execution in `$scope.$apply`
    * result: digest cycle
    * `$timeout`, `$interval` fire events that triggers the digest loop
* directives usually fall into one of two categories:
    * **observing directives**
        * e.g. `{{expression}}`
        * register listeners using the `$watch()` 
        * needs to be notified whenever the expression changes so that it can update the view
    * **listener directives**
        * `ng-click` 
        * register a listener with the DOM
        * when the DOM listener fires, the directive executes the associated expression and updates the view
* dirty checking can be done with three strategies: 
    * By reference, 
    * by collection contents
        * detects changes that occur inside an array or an object
        * shallow
    * and by value
        * detects any change in an arbitrarily nested data structure
## View
* what the user sees (the DOM)
* loaded, transformed and rendered DOM
## Data Binding
* sync data between the model and the view
* the template is compiled on the browser into live view
* when the model changes, the view reflects the change, and vice versa
* model is the single-source-of-truth for the application state
* view is a projection of the model at all times
* view is simply an instant projection of the model
## Controller
* business logic
* exposes variables and functionality to expressions and directives
* `InvoiceController as invoice` - instantiate the controller and save it in the variable
* can be attached to the DOM in different ways
    * the `ngController` directive
        * `<div ng-controller="MyCtrl">...`
    * a route controller in a `$route` definition
    * the controller of a directive
    * `controller as` syntax
* `$scope` properties will be available to the template at the point in the DOM where the Controller 
is registered
* `$scope` will have access to properties and methods defined by Controllers higher up the hierarchy
* there can be many instances of the same type of controller in an application
## Dependency Injection
* everything within AngularJS (directives, filters, controllers, services, ...) is created and wired 
using dependency injection
* AngularJS uses this array syntax to define the dependencies so that the DI also works after 
minifying the code, which will most probably rename the argument name of the controller constructor 
function to something shorter like `a`
    * strings are not minified
    * `['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')]`
    * array first contains the names of the service dependencies that the controller needs
    * order of identifiers in the array is the same as the order of argument names\
    * ordering of the values in the `$inject` array must match the ordering of the parameters
        ```
        controller.$inject = [
            "service1",
            "service2"
        ];
        ```
## Injector
* dependency injection container
* each AngularJS application has an injector
* injector is a service locator that is responsible for construction and lookup of dependencies
* example:
    * `<div ng-controller="MyController">`
    * when AngularJS compiles the HTML, it processes the `ng-controller` directive, which in turn asks the 
    injector to create an instance of the controller and its dependencies
    * `injector.instantiate(MyController);`
## Module
* a container for the different parts of an app including controllers, services, filters, directives
* `angular.module('invoice2', ['finance2'])` - module `invoice2` depends on the module `finance2`
* when AngularJS starts, it will use the configuration of the module with the name defined by the 
`ng-app` directive, including the configuration of all modules that this module depends on
* we recommend that you break your application to multiple modules like this:
    * module for each feature
    * module for each reusable component (especially directives and filters)
    * application level module which depends on the above modules
* required module will be loaded before the requiring module
* order of execution
    1. provider functions are executed, so they and the services they define can be made available to 
    the `$injector`
    1. configuration blocks (config functions) are executed
    1. this continues until all module dependencies has been resolved
    1. the run blocks that have been collected from each module are executed in order of requirement
* each module is only loaded once (even if multiple other modules require it)
* the factory function for "values" and "services" is called lazily when the value/service is injected 
for the first time
* run block is the code which needs to run to kickstart the application
* run blocks are the closest thing in AngularJS to the main method
* `angular.module('myModule')` retrieves an existing module
## Service
* reusable business logic independent of views
* singleton
* can have their own dependencies
## HTML Compiler
* parses the template, instantiates directives and expressions
* allows to attach behavior to any HTML element or attribute, create new HTML elements
* all compilation in the web browser, no server side or pre-compilation
* is a service which traverses the DOM looking for attributes
* has two phases
    * **compile**: traverse the DOM and collect all of the directives
    * **link**: combine the directives with a scope and produce a live view
        * it means setting up listeners on the DOM and setting up `$watch` on the Scope to keep the two in sync
## Bootstrap
* AngularJS automatic initialization: `<script src="../../node_modules/angular/angular.js"></script>`
    * placing script tags at the end of the page improves app load time because the HTML loading is not blocked by 
    loading of the `angular.js` script
* place `ng-app` to the root of your application, typically on the `<html>` tag if you want AngularJS to 
auto-bootstrap your application
    * `<html lang="en-us" ng-app="weatherApp" ng-strict-di>`
    * `ng-strict-di` (strict DI mode) - throw an error whenever a service tries to use implicit annotations
* AngularJS initializes automatically:
    * upon `DOMContentLoaded` event,
    * or `angular.js` script is evaluated if at that time `document.readyState == complete`
* AngularJS looks for the `ngApp` (application root), then:      
    * load the module associated with the directive
    * create the application injector
    * compile the DOM treating the `ngApp` directive as the root of the compilation