const serviceProjectOne = require('../services/projectone.service');

const getProjectList = async (req: any, res: any) => {
    serviceProjectOne.getProjectListData().then((result: any) => {
        //console.log(JSON.stringify(result));
        res.status(200).send(result);
    }). catch ((error: any) => {
        console.error('[projectlist.controller][getProjectList][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).send({message: 'There was an error when fetching the project list'});
    });
}

const addProject = async (req: any, res: any) => {
    serviceProjectOne.addProjectData(req.body).then((result: any) => {
        res.status(200).send({message: 'Successfully added project item.'});
    }).catch ((error: any) => {
        console.error('[projectlist.controller][addProject][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).send({message: 'There was a error when creating the project item.'});
    });
}

const deleteProjects = async (req: any, res: any) => {
    serviceProjectOne.deleteProjectData(req.body).then((result: any) => {
        res.status(200).send({message: "Successfully deleted project item."});
    }).catch((error: any) => {
        console.error('[projectlist.controller][addProject][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).send({message: 'There was a error when deleting the project item.'});
    });
}

module.exports = { getProjectList, addProject, deleteProjects };