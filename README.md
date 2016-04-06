# Description

Very simple middleware for the factual api. Hides your factual api key and secret in the server and takes care of your oauth for you. You can then just point any valid factual query to your own server and get back a response.

# Usage

```
var http = require('http');
var FactualMiddleware = require('factual-api-middleware');

var factualMiddleware = new FactualMiddleware([ KEY ], [ SECRET ], [ MOUNTPOINT ]);
var server = http.createServer(factualMiddleware.middleware());
srv.listen(3000);
```

* mountpoint is a string like '/api'
* you can pass a next function to the middleware function

