// Will need to import Execute from projectone.models.ts
// Helpful site: https://www.becomebetterprogrammer.com/mysql-nodejs-expressjs-typescript/
import { execute } from "../models/projectone.models";
import { projectOneQueries } from "../models/projectone.queries";
import { logger } from "../utils/project.logger";

/** @module projectone-service
 *  @description Sets calls to model logic.
 */

/** @async
 *  @function getProjectListData
 *  @description Calls model to fetch project list data.
 *  @returns {Promise<void>}
 */
const getProjectListData = async () => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectone.service.ts | getProjectListData');
    return execute(projectOneQueries.GetProjectList, []);
};

/** @async
 *  @function addProjectData
 *  @description Calls model to add project list data.
 *  @returns {Promise<void>}
 */
const addProjectData = async (item: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectone.service.ts | addProjectData');
    return execute(projectOneQueries.AddProject, [item.title,item.descn,Number(item.effort),item.file]);
};

/** @async
 *  @function deleteProjectListData
 *  @description Calls model to delete project list data.
 *  @returns {Promise<void>}
 */
const deleteProjectData = async (items: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectone.service.ts | deleteProjectData');
    
    // Need to provide a list of pids to delete to the query. ([1,2,3,..]) is good
    let pids: number[] = [];

    items["data"].forEach((item: any) => {
        pids.push(item.pid);
    });
    return execute(projectOneQueries.DeleteProjects,[pids]);
};

/** @async
 *  @function updateProjectData
 *  @description Calls model to update project data.
 *  @returns {Promise<void>}
 */
const updateProjectData = async (item: any) => {
    logger.log('verbose',  new Date().toLocaleString() + ' | projectone.service.ts | updateProjectData');
    return execute(projectOneQueries.UpdateProject,[item.title, item.descn, item.effort, item.file, item.pid]);
};

export { getProjectListData, addProjectData, deleteProjectData, updateProjectData };