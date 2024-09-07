// Will need to import Execute from projectone.models.ts
// Helpful site: https://www.becomebetterprogrammer.com/mysql-nodejs-expressjs-typescript/
import { AuthenticationQueries } from "../models/authentication.queries";
import { execute } from "../models/projectone.models";
import { logger } from "../utils/project.logger";

export async function checkAccount (data: any): Promise<any> {
    var token: any = data.jwt;
    var valid: boolean = false;

    // Validation of a Google JWT (id token) requires several steps:

    /* 1.  Verify that the ID token is properly signed by the issuer. 
           Google-issued tokens are signed using one of the certificates 
           found at the URI specified in the jwks_uri metadata value of 
           the Discovery document. */

    /* 2.  Verify that the value of the iss claim in the ID token is equal to https://accounts.google.com or accounts.google.com. */

    /* 3.  Verify that the value of the aud claim in the ID token is equal to your app's client ID. */

    /* 4.  Verify that the expiry time (exp claim) of the ID token has not passed. */

    /* 5.  If you specified a hd parameter value in the request, verify that the ID token has a hd claim that matches an accepted domain associated with a Google Cloud organization. */

    valid = true;

    logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount');
    return execute(AuthenticationQueries.CheckAccount, [token.sub]);
};
