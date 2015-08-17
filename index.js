var url   = require('url');
var OAuth = require('oauth').OAuth;
var FACTUAL_API_BASE_URI = 'http://api.v3.factual.com';

var customHeaders = {
  "Accept": "*/*",
  "Connection": "close",
  "User-Agent": "Node authentication",
};

function stripTrailingSlash(path) {
  if (typeof path !== 'string') return null;
  if (path[path.length - 1] === '/') {
    path = path.slice(0, -1);
  } 
  return path;
}

var FactualApiServer = function(key, secret, mountPoint) {
  this.mountPoint = stripTrailingSlash(mountPoint) || '/';
  this.oauth = new OAuth(
    null, 
    null, 
    key, 
    secret, 
    '1.0', 
    null, 
    'HMAC-SHA1', 
    null, 
    customHeaders);
};

FactualApiServer.prototype.middleware = function() {
  var mountPoint = this.mountPoint.toLowerCase();

  return function(req, res, next) {
    var factualReqUrl;
    var parsed = url.parse(req.url);

    if(mountPoint !== '/') {
      var path  = parsed.pathname || '/';
      if (path !== '/') path = stripTrailingSlash(path).toLowerCase();
      if (path.substr(0, mountPoint.length) !== mountPoint) {
        return (typeof next === 'function') ? next() : null;
      }
      factualReqUrl = FACTUAL_API_BASE_URI + path.toLowerCase().substr(mountPoint.length);
    } else {
      factualReqUrl = FACTUAL_API_BASE_URI + req.url;
    }
    factualReqUrl += ('?' + parsed.query);

    this.oauth.get(factualReqUrl, null, null, function(err, data, resp) {
      if(err) return res.end(JSON.stringify(err));
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  }.bind(this);
};

module.exports = FactualApiServer;

