var http = require('http');
var FactualApiServer = require('./index');
var config = require('./config');
var PORT   = config.port || 3001;

var FactualApiServer = new FactualApiServer(config.key, config.secret, config.mountPoint);
var factualMiddleware = FactualApiServer.middleware();

var srv = http.createServer(factualMiddleware);
srv.listen(PORT, function() {
  console.log("server listening on port: %s", PORT);
});
