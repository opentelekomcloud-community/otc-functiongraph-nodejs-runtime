## scratch-event-async

The following code is the code for async handler (for runtime 8.10 or later).

```js
exports.handler = async (event, context) => {
    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': false,
        'body': JSON.stringify(event),
    }
    return output;
}
```

If your **Node.js** function contains an asynchronous task, use **Promise** to execute the task in the current invocation. You can directly return the declared **Promise** or await to execute it.

The asynchronous task can be executed only before the function responds to requests.

```js
exports.handler =  async(event, context ) => {
    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': false,
        'body': JSON.stringify(event),
    }
 
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(output)
        }, 2000)
    })
    return promise;
    // another way 
    // res = await promise;
    // return res;
}
```

## Asynchronous function execution:

To execute the function asynchronously (respond immediately upon invocation while continuing task execution), you can call the API for Executing a Function Asynchronously through SDKs or APIs.

For an APIG trigger, click its name to go to the APIG console, and select Asynchronous for the Invocation Mode. For details, see Asynchronous Invocation.
