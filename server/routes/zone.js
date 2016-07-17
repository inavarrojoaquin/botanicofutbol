var express = require('express');
var path = require('path');
var BotanicoDB = require('../models/BotanicoDB');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
	BotanicoDB.getInstance().getAllZones(function(err, rows){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(rows);
	});
});

/* POST . */
router.post('/', function(req, res, next) {
	var name = req.body.name;

	BotanicoDB.getInstance().postZone({
		name: name
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

/* DELETE . */
router.delete('/:id', function(req, res, next) {
	var id = req.params.id;

	BotanicoDB.getInstance().deleteZone({
		id: id
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

module.exports = router;