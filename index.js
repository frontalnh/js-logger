const winston = require('winston');
const format = winston.format;
const { combine, timestamp, label, prettyPrint, printf, splat } = format;

const uppercase = format(data => {
  data.level = data.level.toUpperCase();

  return data;
});

const addModule = moduleName =>
  format(data => {
    data['module'] = moduleName;

    return data;
  });

const env = process.env.NODE_ENV || 'development';

class JSLogger {
  constructor({ path, writeFile = false }) {
    let fileTransports = [];
    if (writeFile) {
      fileTransports = fileTransports.concat([
        new winston.transports.File({
          filename: path + '/error.log',
          level: 'error'
        }),
        new winston.transports.File({
          filename: path + '/debug.log',
          level: 'debug'
        }),
        new winston.transports.File({ filename: path + '/info.log', level: 'info' })
      ]);
    }
    return moduleName => {
      const defaultOptions = {
        level: env === 'development' ? 'debug' : 'info',
        format: combine(
          uppercase(),
          addModule(moduleName)(),
          timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          prettyPrint()
        ),
        transports: [new winston.transports.Console(), ...fileTransports]
      };
      this.winstonLogger = winston.createLogger(defaultOptions);

      return this;
    };
  }
  info(message, ...meta) {
    this.winstonLogger.log({ level: 'info', message, metaData: { ...meta } });
  }
  warn(message, ...meta) {
    this.winstonLogger.log({ level: 'warn', message, metaData: { ...meta } });
  }
  debug(message, ...meta) {
    this.winstonLogger.log({ level: 'debug', message, metaData: { ...meta } });
  }
  error(message, err) {
    this.winstonLogger.log({ level: 'error', message, errMsg: err.message, location: this.errLocation(err) });
  }

  errLocation(err) {
    const stack = err.stack;

    const jsOrtsRegex = /((\/.*?.ts)|(\/.*?.js)).*?.\:.\w/g;

    let stackList = stack.match(jsOrtsRegex);

    if (stackList) {
      return stackList.filter(v => !/.node_modules./.test(v)).filter(v => !/dist/g.test(v));
    }

    return [];
  }
}

exports.JSLogger = JSLogger;
