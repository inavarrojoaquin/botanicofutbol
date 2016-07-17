var express = require('express');
var path = require('path');
var BotanicoDB = require('../models/BotanicoDB');
var router = express.Router();

/* GET list. */
router.get('/', function(req, res, next) {
	BotanicoDB.getInstance().getAllTeamPositions(function(err, rows){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(rows);
	});
});

/* GET list by zone_id. */
router.get('/:zone_id', function(req, res, next) {
	var zone_id = req.params.zone_id;

	BotanicoDB.getInstance().getTeamsPositionByZoneId({
		zone_id: zone_id
	},function(err, rows){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(rows);
	});
});

/* POST. */
router.post('/', function(req, res, next) {
	var zone_id = parseInt(req.body.zone_id);
	var position_id = parseInt(req.body.position_id);
	var team_id = parseInt(req.body.team_id);
	var pj = parseInt(req.body.pj);
	var pg = parseInt(req.body.pg);
	var pe = parseInt(req.body.pe);
	var pp = parseInt(req.body.pp);
	var gf = parseInt(req.body.gf);
	var gc = parseInt(req.body.gc);
	var dif = parseInt(req.body.dif);
	var pts = parseInt(req.body.pts);	

	BotanicoDB.getInstance().postFixture({
		zone_id: zone_id,
		position_id: position_id,
		pj: pj,
		pg: pg,
		pe: pe,
		pp: pp,
		gf: gf,
		gc: gc,
		dif: dif,
		pts: pts
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});

/* DELETE. */
router.delete('/:zone_id/:position_id', function(req, res, next) {
	var id = req.params.id;
	var position_id = req.params.position_id;

	BotanicoDB.getInstance().deleteTeamPosition({
		id: id,
		position_id: position_id
	}, function(err, data){
		if (err) return console.log("Error Selecting : %s ", err);
    	res.send(data);
	});
});


module.exports = router;