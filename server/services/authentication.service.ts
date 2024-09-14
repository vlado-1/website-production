// Will need to import Execute from projectone.models.ts
// Helpful site: https://www.becomebetterprogrammer.com/mysql-nodejs-expressjs-typescript/
import { AuthenticationQueries } from "../models/authentication.queries";
import { execute } from "../models/projectone.models";
import { logger } from "../utils/project.logger";
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';

export async function checkAccount (data: any): Promise<any> {
    var token: any = JSON.parse(data.jwt).credential;
    var uid: string = "";

    logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount');
    
    // Validation of a Google JWT (id token) requires several steps:

    /* 1.  Verify that the ID token is properly signed by the issuer. 
           Google-issued tokens are signed using one of the certificates 
           found at the URI specified in the jwks_uri metadata value of 
           the Discovery document. */         
    /* 2.  Verify that the value of the iss claim in the ID token is equal to https://accounts.google.com or accounts.google.com. */
    /* 3.  Verify that the value of the aud claim in the ID token is equal to your app's client ID. */
    /* 4.  Verify that the expiry time (exp claim) of the ID token has not passed. */
    /* 5.  If you specified a hd parameter value in the request, verify that the ID token has a hd claim that matches an accepted domain associated with a Google Cloud organization. */
    
    // All these steps are encapsulated in the Google Auth Library for NodeJS used below 
    var client: OAuth2Client = new OAuth2Client("470042236186-4ktmsh2n5fi48ooagmobbfmdau5rlese.apps.googleusercontent.com");
    async function verify() {
        const ticket: LoginTicket = await client.verifyIdToken({
            idToken: token,
            audience: "470042236186-4ktmsh2n5fi48ooagmobbfmdau5rlese.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload: TokenPayload | undefined = ticket.getPayload();

        if (payload != null) {
            uid = payload['sub'];
            // If the request specified a Google Workspace domain:
            // const domain = payload['hd'];
        }
    };

    try{
        return await verify()
                    .then((response: any) => {
                        logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | Verified Google ID Token | ' + uid.toString());
                        return execute(AuthenticationQueries.CheckAccount, [uid]);
                    });
    }
    catch(error: any) {
        logger.log('verbose',  new Date().toLocaleString() + ' | authentication.service.ts | checkAccount | Failed to verify Google ID Token');
        throw error;
    };
};
