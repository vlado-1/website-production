# Myweb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Project Information
## Steps to setup environment from scratch

1. Install NodeJs (comes with NPM).
2. Set global install location of NPM to desired location.
3. Globally install @angular/cli.
4. Globally install typescript, ts-node and @types/node.
5. Follow Angular site instuctions on how to create project using ng command (https://angular.io/guide/setup-local).
6. Create server folder, npm init and then install express.js + typescript locally.
7. Run server with ts-node main.ts (if typescript is being used) else node main.js.
8. Run angular development server with ng serve.

## Server project structure

1. config = contains config information for connecting to the MySQL DB (host, user, pswd etc..).
2. controllers = get requests from routes, and convert them to HTTP responses (use middleware as necessary)
3. middlewares = segregates middleware functions by purpose (e.g. logging, authentication etc..). Middleware functions are those that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
4. models = defines the interface for the https request objects, and query strings.  
5. routes = single file for each logical set of routes. Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
6. services = contains the functions that perform CRUD on the MySQL db and all the business logic.
7. utils = helper functions.

server host = localhost
server port = 3000

## Server File Relations

main -> routers (-> middlewares) -> controllers + models -> services + config
(utils anywhere)
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

## Server Problems
    <li> Had to use 'commonjs' module type (nodejs require) instead of 'ES' module type (typescript import) in the server-side javascript files otherwise I get an error about 'SyntaxError: Cannot use import statement outside a module'.  </li>
    <li> Need to settle on a consistent variable naming scheme.  </li>