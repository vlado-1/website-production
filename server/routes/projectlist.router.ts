const exprs = require('express');
const router = exprs.Router();
const controller = require('../controllers/projectlist.controller');

router.get('/projectlist', function (req: any, res: any) {
    controller.getProjectList(req, res);
});

module.exports = { router };