import { checkAccount } from '../services/authentication.service';
import { logger } from '../utils/project.logger';

export async function login (req: any, res: any): Promise<void> {
    logger.log('verbose',  new Date().toLocaleString() + ' | authentication.controller.ts | login');
    checkAccount(req.body).then((result: any) => {
        res.status(200).send(result);
    }). catch ((error: any) => {
        res.status(500).send({message: 'Check Account Failed'});
    });
}