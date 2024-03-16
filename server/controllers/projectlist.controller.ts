import { Request, RequestHandler, Response } from 'express';

var ProjectOneService = require('../services/projectone.service');

export const getProjectList: RequestHandler = async (req: Request, res: Response ) => {
    try {
        const projectlist = await ProjectOneService.getProjectList();
        
        res.status(200).json({projectlist});
    } catch (error) {
        console.error('[projectlist.controller][getProjectList][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching the project list'
        });
    }
}