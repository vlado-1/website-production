import { Request } from 'express';
import multer from 'multer';
import { logger } from '../utils/project.logger';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        /* Used to determine within which folder the uploaded files should be stored. 
           This can also be given as a string (e.g. '/tmp/uploads'). If no destination is given, the 
           operating system’s default directory for temporary files is used.
           
           Note: You are responsible for creating the directory when providing destination as a function. 
           When passing a string, multer will make sure that the directory is created for you.*/
           logger.log('verbose',new Date().toLocaleString() + '| config/multer.ts | /destination' + " | " + "/static");
           callback(null, "./static");
    },

    filename: (
        req: Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        /* Used to determine what the file should be named inside the folder. 
           If no filename is given, each file will be given a random name that 
           doesn’t include any file extension.

           Note: Multer will not append any file extension for you, your function 
           should return a filename complete with an file extension. */
    
        var pos = file.originalname.lastIndexOf(".");
        
        logger.log('verbose',new Date().toLocaleString() + '| config/multer.ts | /filename ' + " | " + file.originalname + ".md");
    
        callback(null, file.originalname.replace(file.originalname.substring(pos < 0 ? 0 : pos, file.originalname.length) ,".md"));
    }
})