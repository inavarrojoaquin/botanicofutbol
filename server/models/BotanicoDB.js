var pg = require('pg'),
	util = require('util'),
	fs = require('fs'),
	path = require('path');
 
function BotanicoDB(){
	this.connString = require(path.join(__dirname, '../', '../', 'config'));

	// here should do all the configuration
	// 1. setting up connections
	// 2. checking DB existance  

	this.tablesGenerator();
}

BotanicoDB.instance = null;

/**
 * Singleton getInstance definition
 * @return singleton class
 */
BotanicoDB.getInstance = function(){
    if(!BotanicoDB.instance){
        BotanicoDB.instance = new BotanicoDB();
    }
    return BotanicoDB.instance;
};

/**
 * Get a valid connection from pool
 * handle error
 */
BotanicoDB.prototype.GetConnection = function (callback) {
	pg.connect(this.connString, function (err, bt, done) {
		if (err) {
			console.error("BotanicoDB", "GetConnection", err);
			// return client to pool, will not be usable in callback
			done();
		} else {
			console.log("BotanicoDB", "GetConnection", "Success");
		}

		callback(err, bt, done);
	});
};

/**
 * Generate tables and insert default datas
 */
BotanicoDB.prototype.tablesGenerator = function () {
	console.log("Tables Generator running...");

	var sql = fs.readFileSync('server/models/sql/tables_generator2.sql').toString();

	this.GetConnection(function (err, bt, done) {
		if (err) {
			console.log('error: ', err);
			process.exit(1);
		}
		bt.query(sql, function (err, result) {
			done();
			if (err) {
				console.log('error: ', err);
				process.exit(1);
			}
			console.log("Tables Generator done");
		});
	});
};

/**
 * Tournament Methods
 */
/* GET all tournaments */
BotanicoDB.prototype.getAllTournaments = function (callback) {
	this.GetConnection(function (err, bt, done) {
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Connected to postgres! Getting getAllTournaments...');
		bt
			.query('SELECT * FROM bt_tournament;')
			.on("row", function (row, result) {
				result.addRow(row);
			})
			.on('end', function (result) {
				done();
				callback(null, result.rows);
			});
	});
};

/* POST */
BotanicoDB.prototype.postTournament = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Post Tournament...');
		// SQL Query > Insert Data
		bt.query("INSERT INTO bt_tournament(name) values($1) RETURNING id, name", [data.name], function (err, result) {
			if(err) {
				done();
				callback(err, []);
				return;
			}
			done();
			callback(err, result.rows[0]);
		});
	});
};

/* PUT */
BotanicoDB.prototype.putTournament = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Update Data
		bt.query("UPDATE bt_tournament SET name=($1) WHERE id=($2)", [data.name, data.id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/* DELETE */
BotanicoDB.prototype.deleteTournament = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Delete Data
		bt.query("DELETE FROM bt_tournament WHERE id=($1)", [data.id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/**
 * Team Methods
 */
/* GET all tournaments */
BotanicoDB.prototype.getAllTeams = function (callback) {
	this.GetConnection(function (err, bt, done) {
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Connected to postgres! Getting getAllTeam...');
		bt
			.query('SELECT * FROM bt_team;')
			.on("row", function (row, result) {
				result.addRow(row);
			})
			.on('end', function (result) {
				done();
				callback(null, result.rows);
			});
	});
};

/* POST */
BotanicoDB.prototype.postTeam = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			done();
			callback(err, []);
			return;
		}

		console.log('Post Team...');
		// SQL Query > Insert Data
		bt.query("INSERT INTO bt_team(tournament_id,name) values($1, $2) RETURNING id, tournament_id, name", [data.tournament_id, data.name], function (err, result) {
			if(err) {
				done();
				callback(err, []);
				return;
			}
			done();
			callback(err, result.rows[0]);
		});
	});
};

/* PUT */
BotanicoDB.prototype.putTeam = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Update Data
		bt.query("UPDATE bt_team SET tournament_id=($1), name=($2) WHERE id=($3)", [data.tournament_id, data.name, data.id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/* DELETE */
BotanicoDB.prototype.deleteTeam = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Delete Data
		bt.query("DELETE FROM bt_team WHERE id=($1)", [data.id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/**
 * Players Methods
 */
/* GET */
BotanicoDB.prototype.getAllPlayers = function (callback) {
	this.GetConnection(function (err, bt, done) {
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Connected to postgres! Getting getAllPlayers...');
		bt
			.query('SELECT * FROM bt_player;')
			.on("row", function (row, result) {
				result.addRow(row);
			})
			.on('end', function (result) {
				done();
				callback(null, result.rows);
			});
	});
};

/* POST */
BotanicoDB.prototype.postPlayer = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Post Player...');
		// SQL Query > Insert Data
		bt.query("INSERT INTO bt_player(name, email, birthday) values($1, $2, $3) RETURNING id, name, email, birthday", [data.name, data.email, data.birthday], function (err, result) {
			if(err){
				done();
				callback(err, []);
				return;
			}
			done();
			callback(err, result.rows[0]);
		});
	});
};

/* PUT */
BotanicoDB.prototype.putPlayer = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Update Data
		bt.query("UPDATE bt_player SET name=($1), email=($2), birthday=($3) WHERE id=($4)", [data.name, data.email, data.birthday, data.id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/* DELETE */
BotanicoDB.prototype.deletePlayer = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Delete Data
		bt.query("DELETE FROM bt_player WHERE id=($1)", [data.id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/**
 * Zone Methods
 */
/* GET */
BotanicoDB.prototype.getAllZones = function (callback) {
	this.GetConnection(function (err, bt, done) {
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Connected to postgres! Getting getAllZones...');
		bt
			.query('SELECT * FROM bt_zone;')
			.on("row", function (row, result) {
				result.addRow(row);
			})
			.on('end', function (result) {
				done();
				callback(null, result.rows);
			});
	});
};

/* POST */
BotanicoDB.prototype.postZone = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Post Zone...');
		// SQL Query > Insert Data
		bt.query("INSERT INTO bt_zone(name) values($1) RETURNING id, name", [data.name], function (err, result) {
			if(err){
				done();
				callback(err, []);
				return;
			}
			done();
			callback(err, result.rows[0]);
		});
	});
};

/* PUT */
BotanicoDB.prototype.putZone = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Update Data
		bt.query("UPDATE bt_zone SET name=($1) WHERE id=($2)", [data.name, data.id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/* DELETE */
BotanicoDB.prototype.deleteZone = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Delete Data
		bt.query("DELETE FROM bt_zone WHERE id=($1)", [data.id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/**
 * Fixture Methods
 */
/* GET */
BotanicoDB.prototype.getAllFixtures = function (callback) {
	this.GetConnection(function (err, bt, done) {
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Connected to postgres! Getting getAllFixtures...');
		bt
			.query('SELECT * FROM bt_fixture;')
			.on("row", function (row, result) {
				result.addRow(row);
			})
			.on('end', function (result) {
				done();
				callback(null, result.rows);
			});
	});
};

/* GET by zone_id*/
BotanicoDB.prototype.getFixtureByZoneId = function (data, callback) {
	this.GetConnection(function (err, bt, done) {
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Connected to postgres! Getting getFixtureByZoneId...');
		bt
			.query('SELECT fix.id, fix.match_id, fix.zone_id, fix.date, t1.name as home_team_name, t2.name as away_team_name, fix.home_team_score, fix.away_team_score FROM bt_fixture fix JOIN (SELECT f.id, f.match_id, f.home_team_id, t.name FROM bt_fixture f JOIN bt_team t ON t.id=f.home_team_id)t1 ON t1.id=fix.id AND t1.match_id=fix.match_id JOIN (SELECT f.id, f.match_id, f.home_team_id, t.name FROM bt_fixture f JOIN bt_team t ON t.id=f.away_team_id)t2 ON t2.id=fix.id AND t2.match_id=fix.match_id WHERE fix.zone_id=($1);', [data.zone_id])
			.on("row", function (row, result) {
				result.addRow(row);
			})
			.on('end', function (result) {
				done();
				callback(null, result.rows);
			});
	});
};

/* POST */
BotanicoDB.prototype.postFixture = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Post Fixture...');
		// SQL Query > Insert Data
		bt.query("INSERT INTO bt_fixture(id, match_id, zone_id, date, home_team_id, away_team_id, home_team_score, away_team_score) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, match_id, zone_id, date, home_team_id, away_team_id, home_team_score, away_team_score", [data.id, data.match_id, data.zone_id, data.date, data.home_team_id, data.away_team_id, data.home_team_score, data.away_team_score], function (err, result) {
			if(err){
				done();
				callback(err, []);
				return;
			}
			done();
			callback(err, result.rows[0]);
		});
	});
};

/* PUT */
BotanicoDB.prototype.putFixture = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Update Data
		bt.query("UPDATE bt_fixture SET zone_id=($1), date=($2), home_team_id=($3), away_team_id=($4), home_team_score=($5), away_team_score=($6) WHERE id=($7) and match_id=($8)", [data.zone_id, data.date, data.home_team_id, data.away_team_id, data.home_team_score, data.away_team_score, data.id, data.match_id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/* DELETE */
BotanicoDB.prototype.deleteFixture = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Delete Data
		bt.query("DELETE FROM bt_fixture WHERE id=($1) and match_id=($2)", [data.id, data.match_id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/**
 * Goals-Scored Methods
 */
/* GET */
BotanicoDB.prototype.getAllGoalsScored = function (callback) {
	this.GetConnection(function (err, bt, done) {
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Connected to postgres! Getting getAllGoalsScored...');
		bt
			.query('SELECT * FROM bt_goals_scored;')
			.on("row", function (row, result) {
				result.addRow(row);
			})
			.on('end', function (result) {
				done();
				callback(null, result.rows);
			});
	});
};

/* POST */
BotanicoDB.prototype.postGoalScored = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Post Goals-Scored...');
		// SQL Query > Insert Data
		bt.query("INSERT INTO bt_goals_scored(fixture_id, match_id, player_id, team_id, goals) values($1, $2, $3, $4, $5) RETURNING fixture_id, match_id, player_id, team_id, goals", [data.fixture_id, data.match_id, data.player_id, data.team_id, data.goals], function (err, result) {
			if(err){
				done();
				callback(err, []);
				return;
			}
			done();
			callback(err, result.rows[0]);
		});
	});
};

/* PUT */
BotanicoDB.prototype.putGoalsScored = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Update Data
		bt.query("UPDATE bt_goals_scored SET team_id=($1), goals=($2) WHERE fixture_id=($3), match_id=($4), player_id=($5)", [data.team_id, data.goals, data.fixture_id, data.match_id, data.player_id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/* DELETE */
BotanicoDB.prototype.deleteGoalsScored = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Delete Data
		bt.query("DELETE FROM bt_goals_scored WHERE fixture_id=($1), match_id=($2), player_id=($3)", [data.fixture_id, data.match_id, data.player_id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/**
 * Team-Position Methods
 */
/* GET */
BotanicoDB.prototype.getAllTeamsPosition = function (callback) {
	this.GetConnection(function (err, bt, done) {
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Connected to postgres! Getting getAllTeamsPosition...');
		bt
			.query('SELECT * FROM bt_team_position;')
			.on("row", function (row, result) {
				result.addRow(row);
			})
			.on('end', function (result) {
				done();
				callback(null, result.rows);
			});
	});
};

/* POST */
BotanicoDB.prototype.postTeamPosition = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Post Team-Position...');
		// SQL Query > Insert Data
		bt.query("INSERT INTO bt_team_position(zone_id, position_id, team_id, pj, pg, pe, pp, gf, gc, dif, pts) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING zone_id, position_id, team_id, pj, pg, pe, pp, gf, gc, dif, pts", [data.zone_id, data.position_id, data.team_id, data.pj, data.pg, data.pe, data.pp, data.gf, data.gc, data.dif, data.pts], function (err, result) {
			if(err){
				done();
				callback(err, []);
				return;
			}
			done();
			callback(err, result.rows[0]);
		});
	});
};

/* PUT */
BotanicoDB.prototype.putTeamPosition = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Update Data
		bt.query("UPDATE bt_team_position SET pj=($1), pg=($2), pe=($3), pp=($4), gf=($5), gc=($6), dif=($7), pts=($8) WHERE zone_id=($9) and position_id=($10) and team_id=($11)", [data.pj, data.pg, data.pe, data.pp, data.gf, data.gc, data.dif, data.pts, data.zone_id, data.position_id, data.team_id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/* DELETE */
BotanicoDB.prototype.deleteTeamPosition = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Delete Data
		bt.query("DELETE FROM bt_team_position WHERE zone_id=($1) and position_id=($2) and team_id=($3)", [data.zone_id, data.position_id, data.team_id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/**
 * Team-Player Methods
 */
/* GET */
BotanicoDB.prototype.getAllTeamPlayer = function (callback) {
	this.GetConnection(function (err, bt, done) {
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Connected to postgres! Getting getAllTeamPlayer...');
		bt
			.query('SELECT * FROM bt_team_player;')
			.on("row", function (row, result) {
				result.addRow(row);
			})
			.on('end', function (result) {
				done();
				callback(null, result.rows);
			});
	});
};

/* POST */
BotanicoDB.prototype.postTeamPlayer = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}

		console.log('Post Team-Player...');
		// SQL Query > Insert Data
		bt.query("INSERT INTO bt_team_player(team_id, player_id, position) values($1, $2, $3) RETURNING team_id, player_id, position", [data.team_id, data.player_id, data.position], function (err, result) {
			if(err){
				done();
				callback(err, []);
				return;
			}
			done();
			callback(err, result.rows[0]);
		});
	});
};

/* PUT */
BotanicoDB.prototype.putTeamPlayer = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Update Data
		bt.query("UPDATE bt_team_player SET position=($1) WHERE team_id=($2) and player_id=($3)", [data.position, data.team_id, date.player_id], function (err) {
			done();
			callback(err, data);
		});
	});
};

/* DELETE */
BotanicoDB.prototype.deleteTeamPlayer = function (data, callback) {
	// Get a Postgres client from the connection pool
	this.GetConnection(function (err, bt, done) {
		// Handle connection errors
		if (err) {
			callback(err, []);
			return;
		}
		// SQL Query > Delete Data
		bt.query("DELETE FROM bt_team_player WHERE team_id=($1) and player_id=($2)", [data.team_id, date.player_id], function (err) {
			done();
			callback(err, data);
		});
	});
};

module.exports = BotanicoDB;