var express = require('express');
var path = require('path');
var basicAuth = require('basic-auth');
var router = express.Router();

/**
 * For authentication
 */
var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === 'admin' && user.pass === 'admin') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
};

router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
    res.render('index');
});

router.get('/admin', auth, function(req, res, next) {
    res.render('index_admin');
});

module.exports = router;
