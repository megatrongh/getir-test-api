import {createLogger, format, transports} from 'winston';
const loggerOptions = {
    transports: [new transports.Console()],
    format: format.combine(
        format.json(),
        format.prettyPrint(),
        format.colorize({ all: true })
    ),
};

const logger = createLogger(loggerOptions);

export default logger;