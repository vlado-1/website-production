import { checkAccount } from '../services/authentication.service';
import { logger } from '../utils/project.logger';

export async function login (req: any, res: any): Promise<void> {
    logger.log('verbose',  new Date().toLocaleString() + ' | authentication.controller.ts | login');
    try {
        checkAccount(req.body)
        .then((results: any) => {
            if (results.length <= 0) {
                logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Rejected');
                res.status(200).send({loginStatus: 'false'});    
            }
            else {
                logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Accepted | ' + JSON.stringify(results));            
                res.status(200).send({loginStatus: 'true'});
            }
        })
        .catch((error: any) => {
            logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | Query Error Occured | ' + JSON.stringify(error));
            res.status(500).send({loginStatus: 'false'});    
        });
    }
    catch (error: any) {
        logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | Token Verification Error Occured | ' + JSON.stringify(error));
        res.status(500).send({loginStatus: 'false'});
    }
}