# Project One

A website I've built. It doesn't have a clear purpose. For now it displays an editable list of projects that I want to showcase. The editor uses a WYSIWYG editor for markdown in angular. 

I'll extend the website in any direction I want to. My ideas appear as github issues that I work on whenever I have time.

## General Architecture

The website consists of the following components:

- Angular front end
- NodeJs backend server using the ExpressJS framework.
- SQL Database server.

View the appropriate package-lock.json file to see the versions.

There is REST communication between the front and backend.

## Developer Interface

frontend host,port = (localhost, 4200)
backend host,post = (localhost, 3000)

DB Details will vary based on the DB server settings.

## Common Commands
  
  - `ng serve`: Builds and serves your application, rebuilding on file changes. Server can be accessed from `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
  - `ng generate component component-name`: generates a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
  - `ng build`: builds the project. The build artifacts will be stored in the `dist/` directory.
  - `ng test`: executes the unit tests via [Karma](https://karma-runner.github.io).
  - `npm backend`: runs the backend server. Need to be in the 'server' folder when executing this command as it executes a script specified in the server/package.json file. 

## Steps to setup environment from scratch

1. Install NodeJs (comes with NPM).
2. Set global install location of NPM to desired location.
3. Globally install @angular/cli.
4. Globally install typescript, ts-node and @types/node.
5. Follow Angular site instuctions on how to create project using ng command (https://angular.io/guide/setup-local).
6. Create server folder, npm init and then install express.js + typescript locally.
7. Run server with npx tsx main.ts (if typescript is being used) else node main.js.
8. Run angular development server with ng serve.

## Server project structure

1. config = contains config information for connecting to the MySQL DB (host, user, pswd etc..).
2. controllers = get requests from routes, and convert them to HTTP responses (use middleware as necessary)
3. middlewares = segregates middleware functions by purpose (e.g. logging, authentication etc..). Middleware functions are those that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
4. models = defines the interface for the https request objects, and query strings.  
5. routes = single file for each logical set of routes. Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
6. services = contains the functions that perform CRUD on the MySQL db and all the business logic.
7. utils = helper functions.

## Server File Relations

main -> routers (-> middlewares) -> controllers + models -> services + config
(utils anywhere)
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

## Server Problems
    <li> Had to use 'commonjs' module type (nodejs require) instead of 'ES' module type (typescript import) in the server-side javascript files otherwise I get an error about 'SyntaxError: Cannot use import statement outside a module'.  </li>
    <li> Need to settle on a consistent variable naming scheme.  </li>
