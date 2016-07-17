var express = require('express');
var path = require('path');
var BotanicoDB = require('../models/BotanicoDB');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
	BotanicoDB.getInstance().getAllTeamZones(function(err, rows){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(rows);
	});
});

/* POST . */
router.post('/', function(req, res, next) {
	var zone_id = parseInt(req.body.zone_id);
	var team_id = parseInt(req.body.team_id);

	BotanicoDB.getInstance().postTeamZone({
		zone_id: zone_id,
		team_id: team_id
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

/* DELETE . */
router.delete('/:zone_id/:team_id', function(req, res, next) {
	var zone_id = req.params.zone_id;
	var team_id = req.params.team_id;

	BotanicoDB.getInstance().deleteTeamZone({
		zone_id: zone_id,
		team_id: team_id
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

module.exports = router;