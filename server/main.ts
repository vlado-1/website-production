const express = require('express');
const app = express();
const port = 3000;
const routerProjectList = require('./routes/projectlist.router');

app.use('/', routerProjectList);

app.listen(port, () => {
  console.log(`Project One server is listening on port ${port}`);
})