import * as winston from 'winston';

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            filename: 'debug.log',
            level: 'verbose'
        }),
    ]
});

export { logger };