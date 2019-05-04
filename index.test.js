const { logger } = require('./index');

describe('test logger', () => {
  beforeAll(() => {
    logger.init('log');
  });

  it('info', () => {
    logger.info('hello');
  });
  it('error', () => {
    try {
      throw new Error('hello');
    } catch (err) {
      logger.error('error occured');

      return;
    }
  });
});
