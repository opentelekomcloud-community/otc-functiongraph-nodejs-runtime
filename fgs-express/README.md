# fgs-express

Run serverless applications and REST APIs using existing Node.js application frameworks on top of FunctionGraph and API Gateway. The provided examples allow you to easily build serverless web applications/services and RESTful APIs using the Express framework。


## Example

```js
	// Nodejs 6.10
	const fgsExpress= require('fgs-express')
	const app = require('./app')
	const server = fgsExpress.createServer(app)

	exports.handler =  (event, context, callback) => {
	    fgsExpress.proxy(server, event, context, callback);
	}
```


```js
	// Nodejs 8.10
	const fgsExpress= require('fgs-express')
	const app = require('./app')
	const server = fgsExpress.createServer(app)

	exports.handler =  async (event, context) => {
	    return await fgsExpress.proxy(server, event, context).promise;
	}
```


## Middleware usage
Get the event object received by api-gateway   

```js
	const fgsExpressMiddleware = require('fgs-express/middleware')
	app.use(fgsExpressMiddleware.eventContext())
	app.get('/', (req, res) => {
	  res.json(req.apiGateway.event)
	})
```