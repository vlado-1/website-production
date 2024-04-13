import { logger } from "../utils/project.logger";
import { Router } from "express";
import { getProjectList, addProject, deleteProjects, updateProject } from "../controllers/projectlist.controller";

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

router.post('/updateProject', function(req: any, res: any) {
    logger.log('verbose', new Date().toLocaleString() + '| projectlist.router.ts | /updateProject');
    updateProject(req, res);
});

export { router };