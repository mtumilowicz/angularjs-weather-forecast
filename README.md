* _Reference_: https://www.udemy.com/learn-angularjs/
* _Reference_: https://www.udemy.com/course/angularjs-jumpstart/
* _Reference_: https://www.udemy.com/es6-bootcamp-next-generation-javascript/
* _Reference_: https://docs.angularjs.org/guide
* _Reference_: https://essenceofcode.com/2015/08/21/awesome-angular-controllers-with-es6-6-easy-steps/
* running scripts from package.json - `npm run-script <command> [--silent] [-- <args>...]`
 
# angularjs
## Template
* HTML with additional markup
* markup / markdown - syntax that annotates text and could be then interpreted (this readme is written using markdown)
* written with HTML that contains AngularJS-specific elements and attributes
* is parsed and processed by AngularJS compiler during application start
    * recursive process of attaching directives mirrors the process of compiling source code in compiled programming languages
* combined with information from the model and controller creates the dynamic view that a user sees in the browser
* types:
    * [Directive](#Directive)
    * [Markup](#Markup)
    * [Filter](#Filter)
    * [Form controls](#Form-controls)
### Directive
* extends HTML with custom attributes and elements
* directives are markers on a DOM element (attribute, element name, comment, CSS class) that tell  compiler to attach 
a specified behavior to that DOM element (e.g. via event listeners), or to transform the DOM element
    * compilation means attaching directives to the HTML to make it interactive
* when AngularJS bootstraps your application, the compiler traverses the DOM matching directives against the DOM elements
* AngularJS normalizes an element's tag and attribute name to determine which elements match which directives
    * directives usually are referred by their camelCase name (e.g. `ngModel`)
    * HTML is case-insensitive, so directives in the DOM typically have dash-delimited attributes (e.g. `ng-model`)
* normalization process:
    1. strip `x-` and `data-` from the front of the element/attributes
    1. convert `:`, `-`, or `_` to camelCase
* `$compile` matches directives based on 
    * `(E)` element names, 
    * `(A)` attributes, 
    * `(C)` class names, 
    * `(M)` and comments 
    * default is: `EA`
* transclude - We've seen that you can pass in models to a directive using the isolate scope, but sometimes it's desirable to be able to pass in an entire template rather than a string or an object
    * only use transclude: true when you want to create a directive that wraps arbitrary content
    * The dialog box should be able to wrap any arbitrary content.
* scope: {...} // isolated scope
    * there may be scenarios where the directive needs to exchange data with the parent
    * directive can gain access to the parent scope by using some special symbols known as prefixes
    * Using prefixes helps establish a two-way or one-way binding between parent and directive scopes, and also make calls to parent scope methods
    * There are 3 types of prefixes in AngularJS:
        * ‘@’ – Text binding / one-way binding
            *  ‘@’ tells the directive to receive the value from the outer scope one-way (one-way binding) as a string. The one-way here means even if you change the value in the directive scope, that would not affect the value in the parent scope
        * ‘=’ – Direct model binding / two-way binding
        * ‘&’ – Behavior binding / Method binding
* the only place where an application should access the DOM is within directives
### Markup
* access variables and functions from the scope
* allows AngularJS to read and write variables
* `{{ expression | filter }}`
* compiler replaces it with the evaluated value of the markup
* The double curly brace notation {{ }} to bind expressions to elements is built-in AngularJS markup
* AngularJS's $parse service processes these expressions
* do not have direct access to global variables like window, document or location
* Expression evaluation is forgiving to undefined and null
* In JavaScript, evaluating a.b.c throws an exception if a is not an object
* It makes more sense to show nothing than to throw an exception if a is undefined (perhaps we are waiting for the server response, and it will become defined soon)
* invoking a function a.b.c() on undefined or null simply returns undefined
* apart from the ternary operator (a ? b : c), you cannot write a control flow statement in an expression
    * logic should be in controllers, not the views
* interpolation -  the process of evaluating a string literal containing one or more placeholders, yielding a result in which the placeholders are replaced with their corresponding values
    * Interpolation markup with embedded expressions is used by AngularJS to provide data-binding to text nodes and attribute values
### Filter
* formats the value of an expression for display to the user
* underlying API is the $filterProvider
* {{ expression | filter }}
* {{ 12 | currency }} ----> $12.00
* chaining: {{ expression | filter1 | filter2 | ... }}
* filter arguments: {{ expression | filter:argument1:argument2:... }}
    * {{ 1234 | number:2 }} formats the number 1234 with 2 decimal points using the number filter
    * ---> 1,234.00
* primitive type filters are only executed when their inputs have changed
    * 7 primitive data types: string, number, bigint, boolean, null, undefined, and symbol
* objects type filters are executed on each $digest, as it would be too costly to track if the inputs have changed
* You can also use filters in controllers, services, and directives
    * inject a dependency with the name <filterName>Filter
* Creating custom filters
    * just register a new filter factory function with your module
        ```
        angular.module('app', [])
        .filter('filterName', () => (input, otherArgs...) => {
        ```
    * This factory function should return a new filter function which takes the input value as the first argument. Any filter arguments are passed in as additional arguments to the filter function
    * should be pure functions
### Form controls
* Controls (input, select, textarea) are ways for a user to enter data. A Form is a collection of controls for the purpose of grouping related controls together.
* form and controls provide validation services, so that the user can be notified of invalid input before submitting a form
* By default, any change to the content will trigger a model update and form validation
* AngularJS provides basic implementation for most common HTML5 input types: (text, number, url, email, date, radio, checkbox), as well as some directives for validation (required, pattern, minlength, maxlength, min, max)
## Model
* the data shown to the user in the view and with which the user interacts
* values that are stored in variables on the scope
## Scope
* context where the model is stored so that controllers, directives and expressions can access it
## View
* what the user sees (the DOM)
* loaded, transformed and rendered DOM
## Data Binding
* sync data between the model and the view
* the template is compiled on the browser into live view
* Any changes to the view are immediately reflected in the model, and 
any changes in the model are propagated to the view
* model is the single-source-of-truth for the application state
* automatic synchronization of data between the model and view components
* view is a projection of the model at all times. 
* When the model changes, the view reflects the change, and vice versa
* You can think of the view as simply an instant projection of your model
## Controller
* the business logic behind views
* exposes variables and functionality to expressions and directives
* `InvoiceController as invoice` - instantiate the controller and save it in the variable 
`invoice` in the current scope
* can be attached to the DOM in different ways
    * the `ngController` directive - new child scope will be created and made available as an injectable parameter 
    to the Controller's constructor function as `$scope`
    * a route controller in a `$route` definition
    * the controller of a regular directive, or a component directive
    * controller as syntax then the controller instance will be assigned to a property on the scope
*  all the `$scope` properties will be available to the template at the point in the DOM where the Controller 
is registered
* The `$scope` that each Controller receives will have access to properties and methods defined by Controllers 
higher up the hierarchy
* there can be many instances of the same type of controller in an application
## Dependency Injection
* creates and wires objects and functions
* everything within AngularJS (directives, filters, controllers, services, ...) 
is created and wired using dependency injection
* `['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')]`
* will not minify strings
* array first contains the names of the service dependencies that the controller needs
*  AngularJS uses this array syntax to define the dependencies so that the DI also works after minifying the code, 
which will most probably rename the argument name of the controller constructor function to something shorter like 
`a`
* order of identifiers in the array is the same as the order of argument names in the factory function
* ordering of the values in the $inject array must match the ordering of the parameters in MyController
## Injector
* dependency injection container
* each AngularJS application has an injector
* injector is a service locator that is responsible for construction and lookup of dependencies
* `<div ng-controller="MyController">`
* When AngularJS compiles the HTML, it processes the ng-controller directive, which in turn asks the injector to 
create an instance of the controller and its dependencies
* `injector.instantiate(MyController);`
## Module
* a container for the different parts of an app including controllers, services, 
filters, directives which configures the Injector
* `angular.module('invoice2', ['finance2'])` - invoice2 depends on the finance2
* when AngularJS starts, it will use the configuration of the module with the name defined by the 
`ng-app` directive, including the configuration of all modules that this module depends on
* AngularJS apps don't have a main method. Instead modules declaratively specify how an application should be bootstrapped.
    * application level module which depends on the above modules and contains any initialization code
* we recommend that you break your application to multiple modules like this:
    * A module for each feature
    * A module for each reusable component (especially directives and filters)
    * And an application level module which depends on the above modules and contains any initialization code.
* Depending on a module implies that the required module will be loaded before the requiring module is loaded
* In a single module the order of execution is as follows:
    1. provider functions are executed, so they and the services they define can be made available to the $injector.
    1. After that, the configuration blocks (config functions) are executed. This means the configuration blocks of the required modules execute before the configuration blocks of any requiring module.
    1. This continues until all module dependencies has been resolved.
    1. the run blocks that have been collected from each module are executed in order of requirement
* each module is only loaded once, even if multiple other modules require it
* the factory function for "values" and "services" is called lazily when the value/service is injected for the first time
* Run blocks are the closest thing in AngularJS to the main method. A run block is the code which needs to run to kickstart the application
* Beware that using angular.module('myModule', []) will create the module myModule and overwrite any existing module named myModule. Use angular.module('myModule') to retrieve an existing module
## Service
* reusable business logic independent of views
* Lazily instantiated – AngularJS only instantiates a service when an application component depends on it
* Singletons – Each component dependent on a service gets a reference to the single instance generated by the 
service factory
* can have their own dependencies
## HTML Compiler
* parses the template, instantiates directives and expressions
* allows to attach behavior to any HTML element or attribute, create new HTML elements or attributes with custom behavior
    * AngularJS calls these behavior extensions directives
* all compilation in the web browser, no server side or pre-compilation
* is a service which traverses the DOM looking for attributes
* has two phases
    * compile: traverse the DOM and collect all of the directives. The result is a linking function
    * link: combine the directives with a scope and produce a live view
* directive is just a function which executes when the compiler encounters it in the DOM
* The AngularJS compiler consumes the DOM, not string templates. The result is a linking function, which when combined 
with a scope model results in a live view
* The AngularJS approach produces a stable DOM. The DOM element instance bound to a model item instance does not change 
for the lifetime of the binding. This means that the code can get hold of the elements and register event handlers and 
know that the reference will not be destroyed by template data merge
* happens in three steps:
    1. `$compile` traverses the DOM and matches directives
    1. compiler sorts the directives by their priority
        * each directive's compile functions are executed
        * each compile function has a chance to modify the DOM
        * each compile function returns a link function
        * functions are composed into a "combined" link function
    1. `$compile` links the template with the scope by calling the combined linking function
        * invokes linking function of the individual directives
        * registers listeners on the elements
        * setting up `$watch` with the scope as each directive is configured to do
* The result of this is a live binding between the scope and the DOM.
* why the compile process has separate compile and link phases?
    * compile and link separation is needed any time a change in a model causes a change in the structure of the DOM
    * It's rare for directives to have a compile function, since most directives are concerned with working with a specific DOM element instance rather than changing its overall structure.
    * Directives often have a link function. A link function allows the directive to register listeners to the specific cloned DOM element instance as well as to copy content into the DOM from the scope.
* Link means setting up listeners on the DOM and setting up $watch on the Scope to keep the two in sync
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