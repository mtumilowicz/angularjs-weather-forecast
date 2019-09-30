* _Reference_: https://www.udemy.com/learn-angularjs/
* _Reference_: https://www.udemy.com/course/angularjs-jumpstart/
* _Reference_: https://www.udemy.com/es6-bootcamp-next-generation-javascript/
* _Reference_: https://docs.angularjs.org/guide
* _Reference_: https://essenceofcode.com/2015/08/21/awesome-angular-controllers-with-es6-6-easy-steps/
* running scripts from package.json - `npm run-script <command> [--silent] [-- <args>...]`

# angularjs
## overview
* **Template** - HTML with additional markup
    * markup - language that annotates text so that the computer can manipulate that text
    * template is parsed and processes by AngularJS compiler during application start
    * the view - loaded, transformed and rendered DOM
* **Directives** - extend HTML with custom attributes and elements
    * the only place where an application should access the DOM is within directives
* **Model** - the data shown to the user in the view and with which the user interacts
    * values that are stored in variables on the scope
* **Scope** - context where the model is stored so that controllers, directives and expressions can access it
* **Expressions** - access variables and functions from the scope
    * allows AngularJS to read and write variables
    * `{{ expression | filter }}`
    * compiler replaces it with the evaluated value of the markup
* **Compiler** - parses the template and instantiates directives and expressions
* **Filter** - formats the value of an expression for display to the user
* **View** - what the user sees (the DOM)
* **Data Binding** - sync data between the model and the view
    * the template is compiled on the browser into live view
    * Any changes to the view are immediately reflected in the model, and 
    any changes in the model are propagated to the view
    * model is the single-source-of-truth for the application state
* **Controller** - the business logic behind views
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
* **Dependency Injection** - creates and wires objects and functions
    * everything within AngularJS (directives, filters, controllers, services, ...) 
    is created and wired using dependency injection
    * `['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')]`
    * will not minify strings
    * array first contains the names of the service dependencies that the controller needs
    *  AngularJS uses this array syntax to define the dependencies so that the DI also works after minifying the code, 
    which will most probably rename the argument name of the controller constructor function to something shorter like 
    `a`
* **Injector** - dependency injection container
* **Module** - a container for the different parts of an app including controllers, services, 
filters, directives which configures the Injector
    * `angular.module('invoice2', ['finance2'])` - invoice2 depends on the finance2
    * when AngularJS starts, it will use the configuration of the module with the name defined by the 
    `ng-app` directive, including the configuration of all modules that this module depends on
* **Service** - reusable business logic independent of views