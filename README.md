```js
const { JSLogger } = require('./index');
const logger = new JSLogger('<path>');

logger.info('hello', { message: 'hello' }, { age: '10' });
logger.error('error occured',err);

```

output

```
{ '0': { name: 'hello' },
  '1': { age: '10' },
  level: 'INFO',
  message: 'hello',
  timestamp: '2019-06-05 10:14:35'}

{ level: 'ERROR',
  message: 'error occured',
  location:
   [ '/Users/namhoonlee/Desktop/git/js-logger/index.test.js:14' ],
  timestamp: '2019-06-05 10:32:31' }
```