const { LoggerFactory } = require('./index');
const loggerFactory = new LoggerFactory({ path: '.' })
const logger = loggerFactory.createLogger("<moduleName>");

describe('test logger', () => {


  it('info', () => {
    logger.info('hello', { name: 'hello' }, { age: '10' });
  });
  it('error', () => {
    try {
      throw new Error('hello');
    } catch (err) {
      logger.error('error occured', err);
      return;
    }
  });
});
