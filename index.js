var OAuth = require('oauth').OAuth;
var FACTUAL_API_BASE_URI = 'http://api.v3.factual.com';

var customHeaders = {
  "Accept": "*/*",
  "Connection": "close",
  "User-Agent": "Node authentication",
};

var FactualApiServer = function(config) {
  this.oauth = new OAuth(
    null, 
    null, 
    config.key, 
    config.secret, 
    '1.0', 
    null, 
    'HMAC-SHA1', 
    null, 
    customHeaders);
};

FactualApiServer.prototype.middleware = function() {
  return function(req, res, next) {
    var factualReqUrl = FACTUAL_API_BASE_URI + req.url;
    this.oauth.get(factualReqUrl, null, null, function(err, data, resp) {
      if(err) return res.end(JSON.stringify(err));
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(data);
    });
  }.bind(this);
};

module.exports = FactualApiServer;

