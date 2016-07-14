var express = require('express');
var path = require('path');
var BotanicoDB = require('../models/BotanicoDB');
var router = express.Router();

/* GET list. */
router.get('/', function(req, res, next) {
	BotanicoDB.getInstance().getAllFixtures(function(err, rows){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(rows);
	});
});

/* GET list by zone_id. */
router.get('/:zone_id', function(req, res, next) {
	var zone_id = req.params.zone_id;

	BotanicoDB.getInstance().getFixtureByZoneId({
		zone_id: zone_id
	},function(err, rows){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(rows);
	});
});

/* POST. */
router.post('/', function(req, res, next) {
	var id = parseInt(req.body.id);
	var match_id = parseInt(req.body.match_id);
	var zone_id = parseInt(req.body.zone_id);
	var date = req.body.date.toString('yyyy-MM-dd hh24:mi:ss');
	var home_team_id = parseInt(req.body.home_team_id);
	var away_team_id = parseInt(req.body.away_team_id);
	var home_team_score = parseInt(req.body.home_team_score);
	var away_team_score = parseInt(req.body.away_team_score);

	BotanicoDB.getInstance().postFixture({
		id: id,
		match_id: match_id,
		zone_id: zone_id,
		date: date,
		home_team_id: home_team_id,
		away_team_id: away_team_id,
		home_team_score: home_team_score,
		away_team_score: away_team_score
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

/* DELETE. */
router.delete('/:id/:match_id', function(req, res, next) {
	var id = req.params.id;
	var match_id = req.params.match_id;

	BotanicoDB.getInstance().deleteFixture({
		id: id,
		match_id: match_id
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});


module.exports = router;