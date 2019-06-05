```js
const { JSLogger } = require('./index');
const logger = new JSLogger({path:"<path>",writeFile:true);
// or const logger = new JSLogger({writeFile:false);

logger("<moduleName>").info('hello', { message: 'hello' }, { age: '10' });
logger("<moduleName>").error('error occured',err);

```

output

```
{ '0': { name: 'hello' },
  '1': { age: '10' },
  level: 'INFO',
  message: 'hello',
  module: '<moduleName>',
  timestamp: '2019-06-05 10:14:35'}

{ level: 'ERROR',
  message: 'error occured',
  location:
   [ '/Users/namhoonlee/Desktop/git/js-logger/index.test.js:14' ],
  module: '<moduleName>',
  timestamp: '2019-06-05 10:32:31' }
```