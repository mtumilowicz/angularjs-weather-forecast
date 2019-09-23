* _Reference_: https://www.udemy.com/learn-angularjs/
* _Reference_: https://www.udemy.com/course/angularjs-jumpstart/
* _Reference_: https://www.udemy.com/es6-bootcamp-next-generation-javascript/

* https://en.wikipedia.org/wiki/Favicon
* https://www.sitepoint.com/writing-angularjs-apps-using-es6/
* running scripts from package.json - `npm run-script <command> [--silent] [-- <args>...]`

# notes
1. DOM - representation of html inside web browser memory
1. MV*
	* Model - data (var name = 'a')
	* View - html (what user sees)
	* bind: Model <-> View - whatever happens to the model affects view & one another
	* angulajs has a thing that can bind model to the view - watchers and the digest loop
1. html - custom attributes
	* attribute: `<h1 style = "asd">` - style is attribute
	* custom attribute: `<h1 customAttribute = 'asd'>`
		* `console.log($("h1").attr("customAttribute")) // asd`
		* `ng-` - custom attribute, that angular may know
1. the global namespace
	* namespace is a container for variables and functions
	* JavaScript doesn’t provide namespace by default - anything we create 
	is global be default (global namespace pollution)
		* global
		    ```
            function calculateTax(item) {
                return item.price * 1.40;
            }
            
            var product = function (cost) {
                this.cost = cost;
                this.getCost = function () {
                    return this.cost;
                };
            };
            
            function doTaxCalculations() {
                var p = new product(100);
                console.log(calculateTax(p.getCost()));
            }
            ```
		* namespace
		    ```
            var MYAPPLICATION = {
                calculateTax: function (item) {
                    return item * 1.40;
                },
                product: function (cost) {
                    this.cost = cost;
                    this.getCost = function () {
                        return this.cost;
                    };
                },
                doTaxCalculations: function () {
                    var p = new MYAPPLICATION.product(100);
                    console.log(this.calculateTax(p.getCost()));
                }
            };
            ```
	* window object is the global object
	* why is it bad idea to have vars/functions on a global level?
	    * collisions
1. global namespace with angular module
	* `var myApp = angular.module('myApp', []);` // only one thing in global namespace; in [] we declare module that we depend on - othwerwise $injector.unpr when we inject $xxx that is included in that module
	* then in html below document attribute: ng-app="myApp" - matches to a module name
		* myApp.controller('mainController', () => {
			
		})
		* binding controller: ng-controller="mainController"
1. dependency injection - giving a function an object rather than creating an object inside a function
	```
 	function xxx() {
 		let p = new Yyy(...) // function is dependent on HOW the object is created
 		...
 	}
    ```
1. scope service
	* all angularjs services starts with `$`
	* scope - bind a model to the view
		myApp.controller('mainController', ($scope) => { // angularjs inject it to the function
			$scope.name = 'asd'; // add a property name with value 'asd', we can also add a function
			cl($scope); // complex object
		})
	* and then in view: {{name}}
		if you write in controller something like that
			$scope.name = 'xxx';
			$timeout(function() {
				$scope.name = 'yyy';
			}, 3000);
			
			then after 3 second the name in the view goes from 'xxx' to 'yyy'
	* scope defines data that will go back and forth between view and js script
	* scope is new in every controller request (by DI)
1. how does angularjs do dependency injection?
	* suppose we have v`ar f = function(a, b)`
	* `angular.injector().annotate(f)` returns `["a", "b"]` (array of param names)
	* ex. `params.includes("$scope")` and could inject it
	* minification could change param names `$scope -> a`
	    * minification does not touch strings
	* angularjs offers another approach to DI
	    * `myApp.controller('mainController', ($scope) => ...`
	    * `myApp.controller('mainController', ["$scope", scope => ...]`
1. useful angular services are
    * `$scope`
    * `$log`
    * `$http`
    * `$timeout`
1. minification vs compression
	* Minification is the process of minifying something, and we talk about minifying something, we are talking about making it shorter, smaller, tinier.
		* In the Internet context and very often in Web technologies, we are talking about removing unnecessary stuff from our files, like for instance: headings, spaces, author information, comments, breaklines, among others.
	* compression: Huffmans algo
		* Nowadays most servers support the utility and make sure they send over a compressed version of the file, then, on the client side, the browser decompresses the file and shows it as it was before compression.
1. interpolation: 'a' + 'b' (creating a string by concat two others)
1. directives and two way data binding
	* directives - an instruction to angularjs to manipulate a piece of the DOM - this could be, for example, hide this, show that, create this...
		* ng-app, ng-controller
		* <input type="text" ng-model="handle"/> then in controller $scope.handle = ''; bind in two directions
1. event loop - javascript waits and listen for events (click, keypress. mouseover) in an event loop
	* angularjs is extending event loop; it adds angular context
		* watchers - tracking and watch all values that can change watchlist (old value, new value)
			$scope.$watch('handle', (new, old) => {})
			* out of angular context
				setTimeout(() => {$scope.handle = 'aasdsd'; cl('scope changed!');}, 3000); // after 3 second will be logged, but not changed
				* all put in $scope.$apply( () => ...)
				* angularjs is usually put everything in $scope.$apply instead of you; it provides $timeout - you have to buy all with angularjs
		* digest loop - checked if something has changed? - it compared old value and new value from watchlist
1. common directives
	* ng-if="condition" - hide / show
	* ng-show / ng-hide ="condition" - hide / show
	* ng-if vs ng-show
		* ng-if - removes or recreates; 
		* ng-show - shows or hides; 
	* ng-class="{ 'alert-warning': handle.length < characters }" - decide what class to choose (alert, or OK); separate by comma
	* ng-repeat="rule in rules"; rules = [{rulename: "as", ....}]
	* ng-click="function from scope"
	* ng-clock - prevent the AngularJS html template from being briefly displayed by the browser in its raw (uncompiled) form while your application is loading
1. XMLHttpRequest Object
	* can make request
	* angularjs - $http
	* $http.get('/api').success(r => $scope.rules = result).error(e, status => )
1. SPA & hash 
	* hash identifies by element by id; <a href="#bookmark"/>
	* window.addEventListener('hashchange', () => console.log(window.location.hash))
		* bookmark could not exists, hashchange is still fired
		* pretend to directory structure: #/bookmark/1 - we could use if like if window.location.hash === #/bookmark/1 ...
	* using fragment identifier for some purposes is a fundamental key to SPA
		* SPA - is downloaded once by browser using fragment URL
		* pretenmd each hash value corresponds to the other page
1. routing, templates, controllers
	* $location - $location.path() - after #, #/bookmark/1 -> /bookmark/1
	* ngRoute, $routeProvider - specifies route - what should I do when I see particular thing in hash (pattern)
		$routeProvider
			.when('/', {
				templateUrl: 'pages/main.html',
				controller: 'mainController'
			})
			.when('/second', {
				templateUrl: 'pages/second.html', // downloaded only when switched to appropriate URL
				controller: 'secondController'
			})
			.when('/second/:num/', { // pattern matching, second - slash - something
				templateUrl: 'pages/second.html',
				controller: 'secondController'
			})
	* instead ng-controller use ng-view which connects view and controllers
		* ng-view used to SPA - replace content with routing provider definitions
	* $routeParams
	* why? it is not blinking - it comes to speed; downloaded only once and then the appropriate parts are only downloaded
1. singletons and services
	* singleton - one and only copy of an object; $log is singleton
	* scope - scope is a child scope it is inherited from root scope; it is not exactly a singleton
		* new copy of scope to each injection
	* service
		myApp.service('nameService', () => { ... })
		* how to access service in controller - DI: ($scope, $log, nameService)
		* singleton
		* SPA - the same js memory space: we can share data and services across pages
1. reusable components
	copy paste -> <search-result>...</search-result>
1. variable worlds and normalization
	* normalize - make consistent to a standard
	* cant use dashes in javascript
	* angularjs - normalization: converts string into camel case: search-result -> (in code) -> searchResult
		* in both directions
1. creating directives
	* instead of
		<a href="#" class="list-group-item">
			<h4 class="list-group-item-heading">Doe, John</h4>
			<p class="list-group-item-text"> ....
			</p>
		</a>
	* we can use directive
		myApp.directive("searchResult", () => { template: 'point higher', replace: true }) // replace: true <search-result> is gone
	* then in html:
		<search-result></search-result>
	* custom attribute
		<div search-result></div>
	* restrict: 'AE' A - attribute, e-element; by default: AE; not supported by default: ex. class, comment
1. templates
	* searchresult.html
		content of template
	* then in directive
		template -> templateUrl: 'directives/searchresult.html'
1. scope
	* isolate scope - in directive: scope: { } - instead of taking scope from the controller; good practice
		* if you want some from controller scope: <search-result person-name="{{ person.name }}"></search-result>
		* scope: {
			personName: "@" // matches person-name; expect text; one way binding
		}
		* then in view: {{ personName }}
	* person-object="person" whole object - how to say to angular that we need object
		* scope: {
			personObject: "=" // two way binding
		}
	* instead of object we want to have access to function
		$scope.formattedAddress = (aperson) => { }
		* in view - another attribute: formatted-address-function="formattedAddress(person)"
		* in directive
			scope: {
				formattedAddressFunction: "&"
			}
		* in the view
			{{formattedAddress({ aperson: personObject })}} // the same param as in the view
1. repeated directives
	* controller
		$scope.people = [{}, {}, {}]
	* ng-repeat="person in people" in directive
1. compile and link
	* compile - converting code to a lower-level language
	* linker - then linker generates a file the computer will actually interact with
	* angularjs directives are not the same
	* angularjs
		* compile (initialize)
			in directive
				compile: (elem, attrs) => {
					cl('compile...')
					cl(elem.html())
					
					return {
						pre: (scope, element, attrs) => ... // not safe
						post: (scope, element, attrs) => ... // we can do changes to actually generated html
					
					}
				}
		* linker (post - onbind)
1. understanding linking
	* link: (scope, element, attrs) => {}
1. transclusion
	* include one document inside another
	* in template
		<search-...> asd </search-...>
	* <ng-transclude></ng-transclude>
	* in directive
		transclude: true
	* the asd is seen
1. transpile - converting source code of one programming language to another (ES6 -> ES5)
	* typescript is transpiled into javascript
	
# notes 2
1. spa overview
	* spas allow different views (screens) to be loaded into SHELL PAGE as the user interacts with the page
	* views can be replaced with other views
		<div> VIEW1 </div> -> <div> VIEW2 </div>
	* desktop style UX - more fluent, faster etc
	* spas maintain a histor of views that have been displayed
	* spas rely on many different technologies:
		* DOM manipulation
		* history
		* routing
		* ajax
		* data binding
1. enabling angularjs
	* ng-app to enable angularjs in the whole shell page (notify angular that it will be angular page)
	* ng-model="name" - directive to bind with controller
		<input type="text" ng-model="name" /> {{ name }}
1. key players
	* module - containers for components (controllers, services, directives)
	* routes - how to determine which view should be loaded (route is path, urls in browser); can have: /customers/:customerId
	* UI
		* view
		* directives - enhances html (binds the data to the view)
		* filters - data filter functionality, like uppercase
	* logic/data
		* controllers (binded to view by $scope)
		* factory
		* service
1. data binding overview
	* js no native support for data binding
	* two-way data binding cal lead to significant reduction in code
1. directives and expressions
	* directives teach html new tricks
	* dom manipulation
		* ng-hide
		* ng-repeat
		* ng-show
		* ng-view
	* data binding
		* ng-bind
		* ng-init
		* ng-model
	* events
		* ng-click
		* ng-keypress
		* ng-mouseenter
	* modules / controllers
		* ng-app
		* ng-controller
	* most directives are used as attributes
	* expressions in binding markup: {{ xxx }}
1. additional directives
	* ng-clock - dont load until is ready
	* ng-switch="asd"
		ng-switch-when="..."
		ng-switch-default
	* ng-show="true"
	* ng-class="data.status"
1. iterating over data
	* ng-init="names=[...]">
		<li ng-repeat="name in names"> {{ name }} </li>
	* ng-init="names=[{name:'John', city:'Chandler'}, ...]">
		<li ng-repeat="person in persons"> {{ person.name }} </li>
1. sort, filter, formatting
	* use pipe |
	* ng-repeat="cust in customers | orderBy:'name'"
	* key angularjs filters
		* currency
		* date: cust.joined | date:'yyyy'
		* filter
		* json
		* limitTo, ng-repeat="cust in customers | limitTo: 2
		* lowercase
		* number
		* orderBy
		* uppercase
	* ng-click="sortBy='name';reverse=!reverse"
	* ng-repeat=cust in customers | orderBy:sortBy:reverse"
1. angularjs relies on two key architecture patterns:
	* model-view-controller
	* model-view-viewModel
	* mvc + mvvm = mv*
	* request -> controller <-> model 
				 controller <-> $scope (viewModel) <-> view -> response
	* $scope is injected into a controller
		* acts as the ViewModel
		* views bind to scope properties and functions
1. ng-controller directive
	* ng-controller="SimpleController"
	* all scope values can be referenced from html inside the tag
	* controller as syntax - ng-controller="SimpleController as ctrl" then ng-repeat="cust in ctrl.customers"
		* easy to see from which controller property comes from
1. modules - are containers for:
	* controllers
	* routes
	* factories/services
	* directives
	* filters
	* <html ng-app="moduleName">
	* creating module: var demoApp = angular.module('demoApp', []); // [] -> dependencies (other modules)
	* adding controller to module:
		* take module created before: demoApp.controller("SimpleController", function($scope) => )
		* angular.module('demoApp').controller(...)
		* SimpleController.$inject = ['$scope']
1. routes - used for navigation
	* angularjs routes associate a view with a controller
	* customers.html <- /customers -> customersController
	* relies on ngRoute module
	* configured using $routeProvider
1. configuring routes
	var app = angular.module('customersApp', ['ngRoute']);
	app.config($routeProvider => {
		$routeProvider
			.when('/',
				{
					controller: 'CustomersController',
					templateUrl: '/app/views/...'
			})
			.otherwise({ redirectTo: '/' });
	
	});
	* route parameter: when('/editCustomer/:customerId', ...
		* then in controller we inject $routeParams and we use name: $routeParams.customerId
	* ng-view: <div ng-view> </div>
1. factories, services
	* singletons that perform re-useable tasks:
		* ajax calls
		* business rules
		* calculations
		* share data between controllers
	* built-in services:
		* $http
		* $timeout
		* $window
		* $location
		* $q
		* $rootScope
		* $interval
		* $filter
		* $log
1. creating factory
	* define reusable tasks
	* share code or state between controllers
	* factories	
		* create and return a custom object
		* created usinmg the module.factory() function
		* can be injected into other components
		* can have dependencies
	* vs controller: controller is everytime new instance
	* angular.module('asd').factory('factoryName', () => ... var factory = {}; factory.getCustomers = () => ...; return factory;)
	
1. service
	* similar to a factory as far as functionality
	* service function represents the returned oject as opposed to a custom object like in a factory
		* change "factory." into "this."
1. value: module.value(key, value); constant: module.constant(key, value)
	* constant vs value - value can't be injected into config(); constant - can be injected into config()
	* both can be injected in controllers etc...
1. ajax calls from factory / service
	* ajs can be used to make Ajax calls
	* $http, $resource
	* $http service
		* provides Ajax functionality
		* uses brower's XmlHttpRequest
		* asynchronous requests
		* relies on $q service's deferred/promise APIs
		* access data by calling then(), success(), error()
1. using $log service
	* $log.log('')
1. animations
	* ngClass - add and remove
	* ngHide/ngShow - add and remove
	* ngInclude - enter and leave
	* ngRepeat - enter leave move
	* ngSwitch - enter leave
	* ngView - enter leave
1. role of directives
	* directives - markers on a DOM element that tell AngularJS HTML compiler ($compile)
		to attach a specified behaviour to that DOM element
		<div my-directive></div>
	* directives teach HTML new tricks
	* what can directives do:
		* manipulate the DOM
		* iterate through Data
		* handle events
		* modify css
		* data binding
	* key angularjs directives
		* forms
			* ng-maxlength, minlength, pattern, required, submit
		* behavior
			* ng-blur, change, checked, click, key*, mouse*
		* data binding
			* ng-bind, href, init, model, src, style
		* app
			* ng-app, ng-controller
		* DOM
			* ng-disabled, cloak, hide, if, repeat, show, switch, view
		* 3rd party directives
			* UI bootstrap
			* angularStrap
			* angular UI grid
			* angular translate
1. creating directive
	* app.directive('name', () => )
1. directive categories
	* DOM-Driven directives - all about DOM manipulation
	* Data-Driven Directives - all about data, using other directives and a controller
	* behavior-driven directives - all about handling DOM events
1. directives types
	* attribute directives <span my-dir="exp">
	* element directives <my-dir>
1. directive building blocks
	* template (html) <- merge -> Scope (data)
	* $compile provider - compiles an HTML string or DOM into a template and produces a template function,
		which can then be used to link scope and the template together.
	* DDO - directive definition object
		* restrict
		* template
		* templateUrl
		* scope
		* controller
		* link
		angular.module('moduleName')
			.directive('myDirective', () => {
				return {
					restrict: 'EA',
					scope: {},
					template: '<div>{{ myVal }}</div>',
					controller: controller,
					link: (scope, element, attrs) => ...
				}
		
		})
	* template
	* scope
1. shared and isolate scope
	* shared scope
		* on top: parent scope
		* on bottom: child scope
		* nested controllers
	* isolate scope
		* parent scope and child scope are separated
		* however we can communicate parent scope with child scope
		* scope: {} // isolate scope
		* @ local scope property
			* string with one-way binding
			$scope.first = 'Dave';
			scope: {name: '@'}
			<my-directive name="{{ first }}" />
		* = local scope property
			* object
			* without {{ }}
			* bi-directional binding
		* & local scope property
			* function
			* invoke external function
1. link() function
	* all about DOM manipulation
	* links the data to the view, template to the scope
	* (scope, element, attrs)
		* scope - isolate or shared scope
		* element - element directive is on
		* attrs - attributes of element
	* jqLite - subset of jquery that allows angular to manipulate the DOM-Driven
		* middleman between DOM and directive
		* key jqLite functions
			* angular.element()
			* addClass()/css()
			* attr()
			* on()/off()
			* find()
			* append()/remove()
			* html()/text()
			* ready()
	return {
		link: (scope, elem, attrs) => {elem.on('click', () => elem.html('You clicked me');}
	
	}
1. directives properties
	* restrict - Determines where a directive can be used (as an element, attribute, CSS class, or comment).
	* scope - Used to create a new child scope or an isolate scope
	* template - Defines the content that should be output from the directive. 
		Can include HTML, data binding expressions, and even other directives.
	* templateUrl Provides the path to the template that should be used by the directive. 
		It can optionally contain a DOM element id when templates are defined in <script> tags.
	* controller - Used to define the controller that will be associated with the directive template.
	* link - Function used for DOM manipulation tasks.
# es6
1. es5 vs es6
	* language: ECMAScript (ES)
	* dialect: follow ES: JavaScript
	* you can think about ES6 as a javascript next version
	* ES5 supported by all browsers, ES6 needs polyfills and transpilers
1. es6 compatibility with browsers
	* compiler: ES6 -> ES5 (temporary until browsers will support es6)
	* module loader: webpack, jspm
	* server: nodejs
1. let, const
	* let - block scope
		if (true) {
			var x = 5;
		}
		console.log(x) // print 5; let - not print (x is not defined)
		
		let x = 6;
		if (true) {
			let x = 5;
			console.log(x) // print 5
		}
		console.log(x) // print 6
	* const - can't change reference
1. hoisting in ES6
	* Hoisting is a JavaScript mechanism where variables and function declarations are moved 
	to the top of their scope before code execution.
		age = 27; // declare now
		console.log(age);
		
		var age; // define later
	* hoisting does not work with let, const
		function doSmth() {
			age = 27;
		}
		
		let age;
		doSmth();
		console.log(age) // print 27, in fact declaration is before definition
1. fat arrow functions (lambda)
	var fn = () => {
			console.log('asd');
		};
	var fn = () => console.log('asd');
	var fn = (a) => 'asd';
	var fn = a => 'asd';
1. fat arrow function and this
	var fn2 = () => cl(this) // global scope
	
	function fn() {
		console.log(this);
	}
	button.addEventListener('click', fn); // refer to the caller - button; fn2 - get global scope - window; fn2 - keep the context no matter how and where you call it
1. default parameters
	* from left to right
	* var eq = (a, b = 0) => a === b
	* var eq = (a, b = a) => a === b
1. object literal extensions
	let name = 'Anna';
	let age = 25;
	
	let obj = {
		name, // nameXXX: name,
		age
	};
	
	console.log(obj); // print age: 25, name: Anna
1. rest operator
	pass antything that is converted to array as a rest operator
	function sumUp(...toAdd) {
		...
	}
1. spread operator
	let numbers = [1,2,3,4,5];
	console.log(...numbers); // 1 \n 2 \n 3 ...
	console.log(Math.max(...numbers)); // without ... NAN
1. the for-of loop
	let xxx = [1, 2, 3, 4];
	for (let x of xxx) {
		console.log(x);
	}
1. template literals
	let name = 'max';
	let description = `Hello, Im ${name}`;
	
1. desctructuring array
	* could set default values
	let numbers = [1, 2, 3];
	let [a, b] = numbers;
	cl(a); // 1
	cl(b); // 2
	console.log(numbers) // 1, 2, 3
	let [a, ...b] = numbers;
	cl(b) // 2, 3
	* if more values - not defined
	* fast swap
		[a, b] = [b, a]
	* empty space
		let numbers = [1, 2, 3];
		let [a, ,c] = numbers;
		// a = 1, c = 3
1. desctructuring objects
	let obj = {
		name: 'aa'
		age: 27
		greet: a => console.log('a');
	
	}
	let {name, age: age22} = obj; // age22 - alias
1. summary destructuring
	* array - by position
	* object - by name
1. importing / exporting
	- external.js
		export let keyValue = 1000; // function could also be exported
	- script.js
		import {keyValue} from './external.js';
		cl(keyValue);
	* exported value is only reference (it is not copied)
	* export default - only one, can have any value
	* aliases (keyValue as xxx)
	* * as xxx (object key-value pair)
	* class could be exported
1. Modules are always in Strict Mode (no need to define "use strict")
1. Modules don't have a shared, global Scope. Instead each Module has its own Scope
1. class basics
	class X {
		consstructor(name) {
			this.name = name;
		}
	
		greet() {
			cl('asd' + this.name);
		}
	}
	
	let p = new Person();
	p.greet();
1. inheritance: class X extends Y { } // constructor in parent - super(); overriding
1. static methods allowed
1. syntax
	* this._name - private field
	* get name() { } getter - bind function to property
1. symbol
	let symbol = Symbol('debug'); // symbol represents unique id
	cl(symbol.toString());
	cl(typeof symbol); // it is a primitive - its not object
	let obj = {
		name: 'max',
		[symbol]: 22
	}
	cl(obj); // without symbol - used for metaprogramming - for example creation timestamp
	cl(obj[symbol]); // 22
1. symbol vol2
	let symbol1 = Symbol.for('age');
	let symbol2 = Symbol.for('age');
	cl(symbol1 == symbol2); // true - if Symbol('age') - false
	* you should use it when you in one function put timesamp and in other - read the timestamp\
1. symbols already in
	* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
	class Person {
	
	}
	Person.prototype[Symbol.toStringTag] = 'Person'; // without - [object Object]
	let person = new Person();
	cl(person); // [object Person] {...}
1. iterators and generators
	* iterator - object that you can loop with
	* generator - yields the next value when you need it
	* cl(typeof array[Symbol.iterator]); // function
	* let iterator = array[Symbol.iterator]();
		it.next(); // cl(...) [object Object] {done:false, value: 2}
	* in for of we use iterator (until done is not true); we could implement our own iterator
		array[Symbol.iterator] = () => {...}
1. make object iterable
	let person = {
		hobbies: [...]
		[Symbol.iterator]: x => {go through hobbies}
	}
	for (let hobby of person) {
		cl(hobby); // go through hobbies
	}
1. generator
	function *generate() {
		yield 'a';
		yeild 'b';
	}
	let it = select();
	cl(it.next()); // [object Object] {done: false, value: "a"}
	cl(it.next());
	cl(it.next());
1. break iteration with it.throw() / it.throw('a'); it.return('asd');
1. promises enable to break the callback hell
	let promise = new Promise((resolve, reject) => setTimeout(() => resolve('Done!'), 1500));
	promise.then(value => cl(value);
1. rejecting promises
	let promise = new Promise((resolve, reject) => setTimeout(() => reject('Done!'), 1500));
	promise.then(value => cl(value), error => cl(error));
1. promises could be chained
	then method takes the function and thrust the return value from resolve as an argument
1. you have catch on promise
	xxx.catch(error => {cl.log(error)})
1. all vs race
	* all - waits for last to finish
		* Promise.all([promise1, promise2]) - all have to be resolved
			* function in then takes array of arguments from return values of all promises
	* race = waits for the first to finish
1. object extensions
	* proto
		* merging objects, same with classes
			let obj = Object.assign(obj1, obj2);
		* proto (the base object) of obj will be the first object passed (obj1)
		* Object.setPrototypeOf(obj, prototype), obj.__proto__ === boss // after creation - you could set it in creation time
	* Math object
	* String
		* startsWith, endsWith, includes
	* number object
		* isNaN, isFinite, isInteger
	* arrays
		* Array.of(5, 10, 15), array2.from(array, val => val*2), fill(100, from, to)
		* array.find(val => val >= 12)
		* array.entries() -> [index, value]
1. maps and sets
	* for (key / value of deck.keys() / values()) ...
	* for (entry of deck / deck.entries()) ... ([key, value])
	* WeakMap - only javascript obj - weak references
	* set.has(...)
	* WeakSet
1. reflect API
	* bundles of all properties in one place, one API
	* new features
	* proxy API
	* creating objects, calling functions, Reflect.getPrototypeOf(...) (same as __proto__), Reflect.setPrototypeOf()
	* what is prototype?
	* getProperty, setProperty
	* own fields - Reflect.ownKeys(person) // ["_name", "age"]
	* defining property (field) - defineProperty - readOnly by default; writable: true
	* blocking extensions: Reflect.preventsExtensions(person); Reflect.isExtensible(...)
1. proxy API
	* proxy is a wrapper of an object
	* traps
		let person = {name: 'max'}
		
		let handler = {
			// methods from reflect API
			get: target, name => name in target ? target[name] : 'xxx'
		}
		
		var proxy = new Proxy(person, )
	* proxy as prototype
		Reflect.setPrototypeOf(let proxy = new Proxy({}, handler), proxy)
	* proxy with functions (for cache)
	* let {proxy, revoke} = Proxy.revocable(persom, handler); // revoke() - cant use proxy after