var http = require('http');
var FactualApiServer = require('./index');
var _config = require('./config');
var PORT    = _config.port || 3001;

var config = {
  key: _config.key,
  secret: _config.secret
};

var factualMiddle = new FactualApiServer(config).middleware();

var srv = http.createServer(factualMiddle);
srv.listen(PORT);

function defaultMiddle(req, res) {
  var body = 'served';
  res.writeHead(200, {
    'Content-Length': body.length,
    'Content-Type': 'text/plain' });
  res.write(body);
  res.end();
}
