declare namespace Logger {
  class JSLogger {
    constructor(path: string);
    info(message: string, ...meta: any[]): void;
    debug(message: string, ...meta: any[]): void;
    warn(message: string, ...meta: any[]): void;
    error(message: string, ...meta: any[]): void;
  }

  class LoggerFactory {
    constructor({ path, writeFile }: { path: string, writeFile: boolean })
    createLogger(moduleName): JSLogger
  }
}

export = Logger;
