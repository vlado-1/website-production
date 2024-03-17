const serviceProjectOne = require('../services/projectone.service');

const getProjectList = async (req: any, res: any) => {
    serviceProjectOne.getProjectListData().then((result: any) => {
        //console.log(JSON.stringify(result));
        res.status(200).send(result);
    }). catch ((error: any) => {
        console.error('[projectlist.controller][getProjectList][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).status({message: 'There was an error when fetching the project list'});
    });
}

module.exports = { getProjectList };