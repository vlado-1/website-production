const exprs = require('express');
const router = exprs.Router();
const controller = require('../controllers/projectlist.controller');

router.get('/projectlist', function (req: any, res: any) {
    controller.getProjectList(req, res);
});

router.post('/addProject', function (req: any, res: any) {
    controller.addProject(req, res);
});

module.exports = { router };