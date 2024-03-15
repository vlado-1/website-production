const express = require('express');
const app = express();
const port = 3000;

const db = require('./database');

app.get('/', (req: any, res: any) => {
  res.send('Project One Homepage');
})

app.get('/getProjectList', (req: any, res: any) => {
  res.send(db.getProjectList());
})

app.listen(port, () => {
  console.log(`Project One server is listening on port ${port}`);
})