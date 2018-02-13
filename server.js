var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(function(req, res, next) {
    if (req.url == '/callback') {
      req.url = '/index.html';
      next();
    } else {
      next();
    }
});
var port = process.env.PORT || 80;
app.listen(port);
console.log('server started : '+ port);
