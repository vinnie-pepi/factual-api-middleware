# Description

Very simple middleware for the factual api. Hides your factual api key and secret in the server and takes care of your oauth for you. You can then just point any valid factual query to your own server and get back a response.

# Usage

```
var http = require('http');
var FactualApiServer = require('factual-api-server');

var FactualApiServer = new FactualApiServer([ KEY ], [ SECRET ], [ MOUNTPOINT ]);
var factualMiddleware = FactualApiServer.middleware();
var server = http.createServer(factualMiddleware);
srv.listen(3000);
```

