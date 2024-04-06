import {getProjectListData, addProjectData, deleteProjectData} from '../services/projectone.service';
import { logger } from '../utils/project.logger';

const getProjectList = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.constroller.ts | getProjectList');
    getProjectListData().then((result: any) => {
        res.status(200).send(result);
    }). catch ((error: any) => {
        res.status(500).send({message: 'Get Success'});
    });
}

const addProject = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.constroller.ts | addProject');
    addProjectData(req.body).then((result: any) => {
        res.status(200).send({message: 'Add Success'});
    }).catch ((error: any) => {
        logger.log('verbose', new Date().toLocaleString() + " | projectlist.controller.ts | Error | " + JSON.stringify(error));
        res.status(500).send({message: 'Add Failed'});
    });
}

const deleteProjects = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.constroller.ts | deleteProjects');
    deleteProjectData(req.body).then((result: any) => {
        res.status(200).send({message: "Delete Success"});
    }).catch((error: any) => {
        logger.log('verbose', new Date().toLocaleString() + " | projectlist.controller.ts | Error | " + JSON.stringify(error));
        res.status(500).send({message: 'Delete Failed'});
    });
}

export { getProjectList, addProject, deleteProjects };