const { JSLogger } = require('./index');

describe('test logger', () => {
  let logger;
  beforeAll(() => {
    logger = new JSLogger('log');
  });

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
