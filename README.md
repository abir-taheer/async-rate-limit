# async-rate-limit

Queue setup for limiting things like api calls and other asynchronous tasks like api calls that may take unpredictable amounts of time. 

## Usage: 

### Importing 
ES6 imports
```javascript
import RateLimit from "async-rate-limit";
```

CommonJS: 
```javascript
const RateLimit = require("async-rate-limit");
```

### Using In practice
```javascript
// Pretending to have an API with a limit of 10 requests per second
const limiter = new RateLimit({limit: 10, timespan: 1000});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

for(let x = 0; x < 100; x++){    
    limiter.perform(async () => {
        const requestTime = Math.floor(Math.random() * 2000);
        await sleep(requestTime);
        return requestTime;
    }).then(time => {
    	console.log(`Completed Request ${x} in ${time}ms`);
    });
}
```

## Documentation

### Creating an instance of RateLimit:
```javascript
const limiter = new RateLimit(options);
```
### Options
| Name:    | Description:                                                                                                                  |
|----------|-------------------------------------------------------------------------------------------------------------------------------|
| limit    | The maximum number of actions that can be performed in a given timespan. Also the max number of concurrent events. Default: 5 |
| timespan | How long to wait before freeing up an action slot. Given in milliseconds. Default: 1000.                                      |

### Methods

#### perform(action)
Takes in a function and returns a Promise. 

The promise resolves to the value that is returned by calling the provided function. If the provided function returns a promise then it will wait for the promise to resolve first.

```javascript

const return5 = async () => 5;

limiter
    .perform(return5)
    .then(result => {
        console.log("Expected: 5; Result: " + result);
    });
```