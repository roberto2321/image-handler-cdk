import { createLogger, format, transports } from 'winston';

const commonConfiguration = {
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
};

const appLogger = createLogger({
  ...commonConfiguration,
  transports: [
    // new transports.File({ filename: 'logs/errors.log', level: 'error' }),
    // new transports.File({ filename: 'logs/combined.log' }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export { appLogger as logger };
