import {getProjectListData, addProjectData, deleteProjectData, updateProjectData} from '../services/projectone.service';
import { logger } from '../utils/project.logger';

/** @module projectlist-controller */

/** @async
 *  @function getProjectList
 *  @description Retrieves a list of project list items and sends them back in a response.
 *  @param {Express.Request} req Request object.
 *  @param {Express.Response} res Response object.
 *  @returns {Promise<void>}
 */
const getProjectList = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.controller.ts | getProjectList');
    getProjectListData().then((result: any) => {
        res.status(200).send(result);
    }). catch ((error: any) => {
        res.status(500).send({message: 'Get Failed'});
    });
}

/** @async
 *  @function addProject
 *  @description Adds project list item specified in request. The request must come from
 *    a logged in session.
 *  @param {Express.Request} req Request object.
 *  @param {Express.Response} res Response object.
 *  @returns {Promise<void>}
 */
const addProject = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.controller.ts | addProject | ' + req.session.name);

    if (!req.session.login) {
        res.status(500).send({message: 'Not logged in' });
    }
    else {
        addProjectData(req.body).then((result: any) => {
            res.status(200).send({message: 'Add Success'});
        }).catch ((error: any) => {
            logger.log('verbose', new Date().toLocaleString() + " | projectlist.controller.ts | Error | " + JSON.stringify(error));
            res.status(500).send({message: 'Add Failed'});
        });
    }
}


/** @async
 *  @function deleteProjects
 *  @description Deletes project list item(s) specified in request. The request must come from a logged
 *    in session.
 *  @param {Express.Request} req Request object
 *  @param {Express.Response} res Response object
 *  @returns {Promise<void>}
 */
const deleteProjects = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.controller.ts | deleteProjects | ' + req.session.name );

    if (!req.session.login) {
        res.status(500).send({message: 'Not logged in' });
    }
    else {
        deleteProjectData(req.body).then((result: any) => {
            res.status(200).send({message: "Delete Success"});
        }).catch((error: any) => {
            logger.log('verbose', new Date().toLocaleString() + " | projectlist.controller.ts | Error | " + JSON.stringify(error));
            res.status(500).send({message: 'Delete Failed'});
        });
    }
}

/** @async
 *  @function updateProject
 *  @description Updates the project list item specified in request. The request must come from
 *    a logged in session.
 *  @param {Express.Request} req Request object
 *  @param {Express.Response} res Response object
 *  @returns {Promise<void>} 
 */
const updateProject = async (req: any, res: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectlist.controller.ts | updateProject | ' + req.session.name);
    
    if (!req.session.login) {
        res.status(500).send({message: 'Not logged in' });
    }
    else {
        updateProjectData(req.body).then((result: any) => {
            res.status(200).send({message: "Update Success"});
        }).catch((error: any) => {
            logger.log('verbose', new Date().toLocaleString() + " | projectlist.controller.ts | Error | " + JSON.stringify(error));
            res.status(500).send({message: 'Update Failed'});
        });
    }
}

export { getProjectList, addProject, deleteProjects, updateProject };