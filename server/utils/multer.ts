import { Request } from 'express'
import { FileFilterCallback } from 'multer'
import { logger } from './project.logger';

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'application/text'
    ) {
        logger.log('verbose',new Date().toLocaleString() + '| utils/multer.ts | /fileFilter | text' );
        callback(null, true)
    } else {
        logger.log('verbose',new Date().toLocaleString() + '| utils/multer.ts | /fileFilter | not text' );
        callback(null, false)
    }
}