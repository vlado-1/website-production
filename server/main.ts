const express = require('express');
const app = express();
const port = 3000;
const routerProjectList = require('./routes/projectlist.router');
const modelProject = require('./models/projectone.models');

modelProject.init();

app.use('/', routerProjectList.router);

app.listen(port, () => {
  console.log(`Project One server is listening on port ${port}`);
})