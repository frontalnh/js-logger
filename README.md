```js
const { LoggerFactory } = require('./index');
const loggerFactory = new LoggerFactory({ path: '.' })
const logger = loggerFactory.createLogger("<moduleName>");

logger.info('hello', { message: 'hello' }, { age: '10' });

try {
  throw new Error('hello');
} catch (err) {
  logger.error('error occured', err);
  return;
}

```

output

```js
{ level: 'INFO',
  message: 'hello',
  meta: { '0': { name: 'hello' }, '1': { age: '10' } },
  module: '<moduleName>',
  timestamp: '2019-09-30 15:17:26' }

{ level: 'ERROR',
  message: 'error occured',
  errMsg: 'hello',
  location: [ '/home/namhoonlee/Desktop/git/js-logger/index.test.js:13' ],
  module: '<moduleName>',
  timestamp: '2019-09-30 15:17:26' }
```