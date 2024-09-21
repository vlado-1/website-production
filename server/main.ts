import { logger } from "./utils/project.logger";
import express from 'express';
import cors from 'cors';
import session from 'express-session';

import {router} from './routes/projectlist.router';
import { init } from "./models/projectone.models";

const app = express();
const port = 3000;

init();

/* Cross-Origin Resource Sharing (CORS) is an HTTP-header based 
   mechanism that allows a server to indicate any origins (domain, scheme, or port) 
   other than its own from which a browser should permit loading resources. 
   CORS also relies on a mechanism by which browsers make a "preflight" request 
   to the server hosting the cross-origin resource, in order to check that the 
   server will permit the actual request. In that preflight, the browser sends headers 
   that indicate the HTTP method and headers that will be used in the actual request. 
   Read: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS*/
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type, Accept'
}));

app.use(express.json());

app.use(express.static('static'));

/* Create a session for incoming connections to server.
   Though don't save session until login success. */
app.use(session({
  secret: 'rQEMKVdmfRQGYq9JG7r7PLd8oITY9i', // May need to regularly change this, and provide array of all secreats used so far
  resave: false,
  saveUninitialized: false,
  cookie: { path: '/', 
            httpOnly: true, 
            secure: false,
            maxAge: undefined }
}));

app.use((req: any, res: any, next: Function) => {
  req.session.name = "Guest";
  logger.log('verbose',  new Date().toLocaleString() + ' | main.ts | Client request received from ' + req.session.name);
  next();
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Project One server is listening on port ${port}`);
})