var express = require('express');
var path = require('path');
var BotanicoDB = require('../models/BotanicoDB');
var router = express.Router();

/* GET tournament list. */
router.get('/', function(req, res, next) {
	BotanicoDB.getInstance().getAllTournaments(function(err, rows){
		if (err) console.log("Error Selecting : %s ", err);
    	res.send(rows);
	});
});

/* POST tournament. */
router.post('/', function(req, res, next) {
	var name = req.body.name;

	BotanicoDB.getInstance().postTournament({
		name: name
	}, function(err, data){
		if (err) console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

/* DELETE tournament. */
router.delete('/:id', function(req, res, next) {
	var id = req.params.id;

	BotanicoDB.getInstance().deleteTournament({
		id: id
	}, function(err, data){
		if (err) console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});


module.exports = router;