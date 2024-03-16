var router = express.Router();
var controllerProjectList = require('../controllers/projectlist.controller');

router.get('/projectlist', controllerProjectList.getProjectList);

module.exports = router;