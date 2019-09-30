declare namespace Logger {
  class JSLogger {
    constructor(path: string);
    info(message: string, ...meta: any[]): void;
    debug(message: string, ...meta: any[]): void;
    warn(message: string, ...meta: any[]): void;
    error(message: string, ...meta: any[]): void;
  }

  class LoggerFactory {
    createLogger(moduleName): JSLogger
  }
}

export = Logger;
