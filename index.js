const winston = require('winston');
const format = winston.format;
const { combine, timestamp, label, prettyPrint, printf, splat } = format;

const uppercase = format(data => {
  data.level = data.level.toUpperCase();

  return data;
});

const env = process.env.NODE_ENV || 'development';

exports.logger = {
  init(path) {
    const defaultOptions = {
      level: env === 'development' ? 'debug' : 'info',
      format: combine(
        uppercase(),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        prettyPrint()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path + '/error.log',
          level: 'error'
        }),
        new winston.transports.File({
          filename: path + '/debug.log',
          level: 'debug'
        }),
        new winston.transports.File({ filename: path + '/info.log', level: 'info' })
      ]
    };

    this.winstonLogger = winston.createLogger(defaultOptions);
  },
  info(message, ...meta) {
    this.winstonLogger.log({ level: 'info', message, ...meta });
  },
  warn(message, ...meta) {
    this.winstonLogger.log({ level: 'warn', message, ...meta });
  },
  debug(message, ...meta) {
    this.winstonLogger.log({ level: 'debug', message, ...meta });
  },
  error(message) {
    this.winstonLogger.log({ level: 'error', message, location: this.errLocation() });
  },

  errLocation() {
    const stack = new Error().stack;

    const jsOrtsRegex = /((\/.*?.ts)|(\/.*?.js)).*?.\:.\w/g;

    let stackList = stack.match(jsOrtsRegex);

    if (stackList) {
      return stackList.filter(v => !/.node_modules./.test(v)).filter(v => !/dist/g.test(v));
    }

    return [];
  }
};
