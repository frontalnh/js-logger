declare namespace Logger {
  class JSLogger {
    constructor({ path: string, writeFile: boolean });
    register(moduleName: string): void;
    info(message: string, ...meta: any[]): void;
    debug(message: string, ...meta: any[]): void;
    warn(message: string, ...meta: any[]): void;
    error(message: string, ...meta: any[]): void;
  }

  class LoggerFactory {
    constructor({ path, writeFile }: { path: string; writeFile?: boolean });
    createLogger(moduleName: string, type: string): JSLogger;
  }
}

export = Logger;
