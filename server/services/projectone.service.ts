// Will need to import Execute from projectone.models.ts
// Helpful site: https://www.becomebetterprogrammer.com/mysql-nodejs-expressjs-typescript/
var modelProjectOne = require('../models/projectone.models');
var queriesModule = require('../models/projectone.queries');

const getProjectListData = async () => {
    return modelProjectOne.execute(queriesModule.projectOneQueries.GetProjectList, []);
};

module.exports = { getProjectListData };