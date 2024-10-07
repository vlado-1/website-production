import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import { logger } from './project.logger';

/** @module utils/multer */

/** @function
 *  @name fileFilter
 *  @description Filter out non-text files.
 *  @param {Request} request 
 *  @param {Express.Multer.File} file
 *  @param {FileFilterCallback} callback
 *  @returns {void} 
 */
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