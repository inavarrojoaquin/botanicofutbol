var pg = require('pg'),
	util = require('util'),
	fs = require('fs'),
	path = require('path');
 
function DaoFactory() {
  this.connector = null;
}

DaoFactory.Connector = {
  MySQL: 'MySQL',
  JSON: 'JSON',
  Postgre: 'Postgre'
};

DaoFactory.instance = null;

DaoFactory.getInstance = function () {
  if (!DaoFactory.instance) {
    DaoFactory.instance = new DaoFactory();
  }

  return DaoFactory.instance;
};


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

	var sql = fs.readFileSync('server/models/sql/tables_generator.sql').toString();

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
BotanicoDB.prototype.getAllTeam = function (callback) {
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
			callback(err, []);
			return;
		}

		console.log('Post Team...');
		// SQL Query > Insert Data
		bt.query("INSERT INTO bt_team(tournament_id,name) values($1, $2) RETURNING id, tournament_id, name", [data.tournament_id, data.name], function (err, result) {
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
		bt.query("INSERT INTO bt_player(team_id, name, email, birthday, observations) values($1, $2, $3, $4, $5) RETURNING id, team_id, name", [data.team_id, data.name, data.email, data.birthday, data.observations], function (err, result) {
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
		bt.query("UPDATE bt_player SET team_id=($1), name=($2), email=($3), birthday=($4), observations=($5) WHERE id=($6)", [data.team_id, data.name, data.email, data.birthday, data.observations, data.id], function (err) {
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

module.exports = BotanicoDB;