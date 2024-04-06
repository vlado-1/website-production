import { logger } from "../utils/project.logger";
import { Router } from "express";
import { getProjectList, addProject, deleteProjects } from "../controllers/projectlist.controller";

var router = Router();

router.get('/projectlist', function (req: any, res: any) {
    logger.log('verbose',new Date().toLocaleString() + '| projectlist.router.ts | /projectList');
    getProjectList(req, res);
});

router.post('/addProject', function (req: any, res: any) {
    logger.log('verbose',new Date().toLocaleString() + '| projectlist.router.ts | /addProject');
    addProject(req, res);
});

router.post('/deleteProjects', function(req: any, res: any) {
    logger.log('verbose',new Date().toLocaleString() + '| projectlist.router.ts | /deleteProjects');
    deleteProjects(req, res);
});

export { router };