var express = require('express');
var path = require('path');
var BotanicoDB = require('../models/BotanicoDB');
var router = express.Router();

/* GET player list. */
router.get('/', function(req, res, next) {
	BotanicoDB.getInstance().getAllPlayers(function(err, rows){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(rows);
	});
});

/* POST player. */
router.post('/', function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var birthday = req.body.birthday.toString('yyyy-MM-dd');

	BotanicoDB.getInstance().postPlayer({
		name: name,
		email: email,
		birthday: birthday,
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

/* DELETE player. */
router.delete('/:id', function(req, res, next) {
	var id = req.params.id;

	BotanicoDB.getInstance().deletePlayer({
		id: id
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

module.exports = router;