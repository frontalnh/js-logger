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
    this.fileTransports = [];
    if (writeFile) {
      this.fileTransports = this.fileTransports.concat([
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
    const defaultOptions = {
      level: env === 'development' ? 'debug' : 'info',
      format: combine(
        uppercase(),
        addModule('UNREGISTERED')(),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        prettyPrint()
      ),
      transports: [new winston.transports.Console(), ...this.fileTransports]
    };
    this.winstonLogger = winston.createLogger(defaultOptions);
  }
  register(moduleName) {
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
      transports: [new winston.transports.Console(), ...this.fileTransports]
    };
    this.winstonLogger = winston.createLogger(defaultOptions);
  }
  info(message, ...meta) {
    this.winstonLogger.log({ level: 'info', message, meta: { ...meta } });
  }
  warn(message, ...meta) {
    this.winstonLogger.log({ level: 'warn', message, meta: { ...meta } });
  }
  debug(message, ...meta) {
    this.winstonLogger.log({ level: 'debug', message, meta: { ...meta } });
  }
  error(...args) {
    if (args.length === 1) {
      this.winstonLogger.log({
        level: 'error',
        message: args[0].message,
        errMsg: args[0].message,
        location: this.errLocation(args[0])
      });
    } else {
      this.winstonLogger.log({
        level: 'error',
        message: args[0],
        errMsg: args[1].message,
        location: this.errLocation(args[1])
      });
    }
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

class LoggerFactory {
  constructor({ path, writeFile = false }) {
    this.path = path;
    this.writeFile = writeFile;
  }

  createLogger(moduleName) {
    const logger = new JSLogger({ path: this.path, writeFile: this.writeFile });
    logger.register(moduleName);

    return logger;
  }
}

exports.LoggerFactory = LoggerFactory;
