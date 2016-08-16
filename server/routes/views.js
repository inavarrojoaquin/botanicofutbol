var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/home', function(req, res, next) {
    //res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
    res.render('home', { title: 'Home' });
});

router.get('/positions', function(req, res, next) {
    res.render('positions', { title: 'Positions' });
});

module.exports = router;