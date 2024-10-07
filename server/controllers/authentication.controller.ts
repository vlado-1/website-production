/** @module authentication-controller */

import { checkAccount } from '../services/authentication.service';
import { logger } from '../utils/project.logger';

/** @async
 *  @function login
 *  @memberof module:authentication-controller
 *  @description Takes the JWT from the request and attempts to verify it and login.
 *    If login is OK, then session info is changed, and response sets login status to true.
 *    Otherwise login has failed, and so the session is destroyed and response sets login status to false.
 *  @param {Express.Request} req Request object. Contains JWT from body of http(s) request.
 *  @param {Express.Response} res Response object.
 *  @returns {Promise<void>}
*/
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

/** 
 *  @function logout
 *  @memberof module:authentication-controller
 *  @description Logs out the user from the website by destoying the session. Not async.
 *  @param {Express.Request} req Request object. Contains the session to be destroyed.
 *  @param {Express.Response} res Response object.
 *  @returns {void}
 */
export function logout (req: any, res: any): void {
    logger.log('verbose',  new Date().toLocaleString() + ' | authentication.controller.ts | logout');
    req.session.destroy(function(err: any) {
        if (err) {
            logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | logout | User Rejected | Failed to destroy session');
            logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | logout | User Rejected | ' + JSON.stringify(err));
            res.status(200).send({loginStatus: 'error'});
        }
        else {
            res.status(200).send({loginStatus: 'false'});
        }
    });
}

/** 
 *  @function isSignedIn
 *  @memberof module:authentication-controller
 *  @description Checks session to see if user is logged in, and sends response with true/false login status.
 *    Not async.
 *  @param {Express.Request} req Request object. Contains session.
 *  @param {Express.Response} res Response object.
 *  @returns {void}
 */
export function isSignedIn (req: any, res: any): void {
    logger.log('verbose',  new Date().toLocaleString() + ' | authentication.controller.ts | isSignedIn');

    if (req.session.login) {
        logger.log('verbose',  new Date().toLocaleString() + ' | authentication.controller.ts | isSignedIn | yes');
        res.status(200).send({loginStatus: 'true'});
    }
    else {
        logger.log('verbose',  new Date().toLocaleString() + ' | authentication.controller.ts | isSignedIn | no');
        res.status(200).send({loginStatus: 'false'});
    }
}