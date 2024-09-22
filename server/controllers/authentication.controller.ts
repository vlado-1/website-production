import { checkAccount } from '../services/authentication.service';
import { logger } from '../utils/project.logger';

export async function login (req: any, res: any): Promise<void> {
    logger.log('verbose',  new Date().toLocaleString() + ' | authentication.controller.ts | login');
    try {
        checkAccount(req.body)
        .then((results: any) => {
            if (results.length <= 0) {
                logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Rejected');
                
                // Log out
                req.session.destroy(function(err: any) {
                    if (err) {
                        logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Rejected | Failed to destroy session');
                        logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Rejected | ' + JSON.stringify(err));
                    }
                    res.status(200).send({loginStatus: 'false'});
                });   
            }
            else {
                logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Accepted | ' + JSON.stringify(results));            
                
                // Create session for logged in user
                req.session.uid  = results[0].uid;
                req.session.name = results[0].username;
                req.session.login = true;
                logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | Logged In | ' + req.session.name);            

                res.status(200).send({loginStatus: 'true'});
            }
        })
        .catch((error: any) => {
            logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | Query Error Occured | ' + JSON.stringify(error));
            // Log out
            req.session.destroy(function(err: any) {
                if (err) {
                    logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Rejected | Failed to destroy session');
                    logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Rejected | ' + JSON.stringify(err));
                }
                res.status(500).send({loginStatus: 'false'});
            });     
        });
    }
    catch (error: any) {
        logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | Token Verification Error Occured | ' + JSON.stringify(error));
        // Log out
        req.session.destroy(function(err: any) {
            if (err) {
                logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Rejected | Failed to destroy session');
                logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | User Rejected | ' + JSON.stringify(err));
            }
            res.status(500).send({loginStatus: 'false'});
        }); 
    }
}