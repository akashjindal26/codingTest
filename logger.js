const winston = require('winston');

module.exports.logger = winston.createLogger({
    transports: [
        // creating info lavel for logger file to store logs info
        new winston.transports.File({
            level: 'info',
            filename: 'filelog-info.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),

        // creating error level for logger file to store logs error
        new winston.transports.File({
            level: 'error',
            filename: 'filelog-error.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        })
    ]
});