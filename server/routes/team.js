var express = require('express');
var path = require('path');
var BotanicoDB = require('../models/BotanicoDB');
var router = express.Router();

/* GET team list. */
router.get('/', function(req, res, next) {
	BotanicoDB.getInstance().getAllTeams(function(err, rows){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(rows);
	});
});

/* POST team. */
router.post('/', function(req, res, next) {
	var name = req.body.name;
	var tournament_id = parseInt(req.body.tournament_id);

	BotanicoDB.getInstance().postTeam({
		tournament_id: tournament_id,
		name: name
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

/* DELETE team. */
router.delete('/:id', function(req, res, next) {
	var id = req.params.id;

	BotanicoDB.getInstance().deleteTeam({
		id: id
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});


module.exports = router;