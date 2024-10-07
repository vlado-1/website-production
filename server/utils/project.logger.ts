import * as winston from 'winston';

/** @module project-logger */

/** Logger that is set to output to a log file. */
var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            filename: 'debug.log',
            level: 'verbose'
        }),
    ]
});

export { logger };