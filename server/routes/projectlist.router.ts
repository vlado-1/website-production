import { logger } from "../utils/project.logger";
import { Router } from "express";
import multer from 'multer';
import { fileFilter } from "../utils/multer";
import { fileStorage } from "../config/multer";
import { getProjectList, addProject, deleteProjects, updateProject } from "../controllers/projectlist.controller";

var router = Router();
var upload = multer({ storage: fileStorage, fileFilter: fileFilter });

router.get('/projectlist', function (req: any, res: any) {
    logger.log('verbose',new Date().toLocaleString() + '| projectlist.router.ts | /projectList');
    getProjectList(req, res);
});

router.post('/addProject', upload.single("upload"), function (req: any, res: any) {
    logger.log('verbose',new Date().toLocaleString() + '| projectlist.router.ts | /addProject');
    addProject(req, res);
});

router.post('/deleteProjects', function(req: any, res: any) {
    logger.log('verbose',new Date().toLocaleString() + '| projectlist.router.ts | /deleteProjects');
    deleteProjects(req, res);
});

router.post('/updateProject', upload.single("upload"), function(req: any, res: any) {
    logger.log('verbose', new Date().toLocaleString() + '| projectlist.router.ts | /updateProject');
    updateProject(req, res);
});

export { router };