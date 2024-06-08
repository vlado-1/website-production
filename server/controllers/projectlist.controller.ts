import {getProjectListData, addProjectData, deleteProjectData, updateProjectData} from '../services/projectone.service';
import { logger } from '../utils/project.logger';

const getProjectList = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.controller.ts | getProjectList');
    getProjectListData().then((result: any) => {
        res.status(200).send(result);
    }). catch ((error: any) => {
        res.status(500).send({message: 'Get Failed'});
    });
}

const addProject = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.controller.ts | addProject');
    addProjectData(req.body).then((result: any) => {
        res.status(200).send({message: 'Add Success'});
    }).catch ((error: any) => {
        logger.log('verbose', new Date().toLocaleString() + " | projectlist.controller.ts | Error | " + JSON.stringify(error));
        res.status(500).send({message: 'Add Failed'});
    });
}

const deleteProjects = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.controller.ts | deleteProjects');
    deleteProjectData(req.body).then((result: any) => {
        res.status(200).send({message: "Delete Success"});
    }).catch((error: any) => {
        logger.log('verbose', new Date().toLocaleString() + " | projectlist.controller.ts | Error | " + JSON.stringify(error));
        res.status(500).send({message: 'Delete Failed'});
    });
}

const updateProject = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.controller.ts | updateProject');
    updateProjectData(req.body).then((result: any) => {
        res.status(200).send({message: "Update Success"});
    }).catch((error: any) => {
        logger.log('verbose', new Date().toLocaleString() + " | projectlist.controller.ts | Error | " + JSON.stringify(error));
        res.status(500).send({message: 'Update Failed'});
    });
}

export { getProjectList, addProject, deleteProjects, updateProject };