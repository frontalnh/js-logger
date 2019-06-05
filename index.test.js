const { JSLogger } = require('./index');

describe('test logger', () => {
  let logger;
  beforeAll(() => {
    logger = new JSLogger({});
  });

  it('info', () => {
    logger('index').info('hello', { name: 'hello' }, { age: '10' });
  });
  it('error', () => {
    try {
      throw new Error('hello');
    } catch (err) {
      logger('index').error('error occured', err);
      return;
    }
  });
});
