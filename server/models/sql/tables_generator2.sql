DROP TABLE IF EXISTS bt_team_player;
DROP TABLE IF EXISTS bt_team_position;
DROP TABLE IF EXISTS bt_goals_scored;
DROP TABLE IF EXISTS bt_fixture;
DROP TABLE IF EXISTS bt_team_zone;
DROP TABLE IF EXISTS bt_zone;
DROP TABLE IF EXISTS bt_player;
DROP TABLE IF EXISTS bt_team;
DROP TABLE IF EXISTS bt_tournament;

CREATE TABLE IF NOT EXISTS bt_tournament(
	id		SERIAL		NOT NULL PRIMARY KEY, 
	name	VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS bt_team (
	id 				serial 		NOT NULL PRIMARY KEY,
	tournament_id 	integer 	NOT NULL,
	name 			varchar(50) NOT NULL,

	CONSTRAINT bt_tournament_id_fkey FOREIGN KEY (tournament_id) 
		REFERENCES bt_tournament (id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bt_player (
	id 			serial 		NOT NULL PRIMARY KEY,
	name 		varchar(100)NOT NULL,
	email 		varchar(50) NOT NULL,
	birthday 	date 		NOT NULL
);

CREATE TABLE IF NOT EXISTS bt_zone (
	id 		serial 		NOT NULL PRIMARY KEY,
	name 	varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS bt_team_zone (
	zone_id integer NOT NULL,
	team_id integer NOT NULL,

	PRIMARY KEY (zone_id, team_id),
	CONSTRAINT bt_zone_fkey FOREIGN KEY (zone_id) 
		REFERENCES bt_zone (id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT bt_team_fkey FOREIGN KEY (team_id) 
		REFERENCES bt_team (id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bt_fixture (
	id 				integer NOT NULL,
	match_id 		integer NOT NULL,
	zone_id 		integer NOT NULL,
	date 			timestamp NOT NULL,	
	home_team_id 	integer NOT NULL,
	away_team_id 	integer NOT NULL,
	home_team_score integer NOT NULL,
	away_team_score integer NOT NULL,
	
	PRIMARY KEY (id, match_id),
	CONSTRAINT bt_zone_team_home_fkey FOREIGN KEY (zone_id, home_team_id) 
		REFERENCES bt_team_zone (zone_id, team_id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT bt_zone_team_away_fkey FOREIGN KEY (zone_id, away_team_id) 
		REFERENCES bt_team_zone (zone_id, team_id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bt_goals_scored (
	fixture_id 	integer NOT NULL,
	match_id 	integer NOT NULL,
	player_id 	integer NOT NULL,
	team_id 	integer NOT NULL,
	goals 		integer NOT NULL,

	PRIMARY KEY (fixture_id, match_id, player_id),
	CONSTRAINT bt_fixture_match_fkey FOREIGN KEY (fixture_id, match_id) 
		REFERENCES bt_fixture (id, match_id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bt_team_position (
	zone_id 	integer NOT NULL,
	position_id integer NOT NULL,
	team_id 	integer NOT NULL,
	pj 			integer NOT NULL,
	pg 			integer NOT NULL,
	pe 			integer NOT NULL,
	pp 			integer NOT NULL,
	gf 			integer NOT NULL,
	gc 			integer NOT NULL,
	dif 		integer NOT NULL,
	pts 		integer NOT NULL,
  
	PRIMARY KEY (zone_id, position_id),
	CONSTRAINT bt_zone_team_fkey FOREIGN KEY (zone_id, position_id) 
		REFERENCES bt_team_zone (zone_id, team_id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bt_team_player (
	team_id 	integer NOT NULL,
	player_id 	integer NOT NULL,
	position 	integer NULL,

	PRIMARY KEY (team_id, player_id),
	CONSTRAINT bt_team_fkey FOREIGN KEY (team_id) 
		REFERENCES bt_team (id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT bt_player_fkey FOREIGN KEY (player_id) 
		REFERENCES bt_player (id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE
);

INSERT INTO bt_tournament(name) 
	VALUES	('BOTANICO'),
			('ZONA_NORTE');
			
INSERT INTO bt_team(tournament_id, name)
	VALUES 	(1,'BOCA'),
			(1,'RIVER'),
			(1,'LANUS'),
			(1,'INDEPENDIENTE'),
			(2,'RACING');

INSERT INTO bt_player(name, email, birthday)
	VALUES	('PLAYER1','EMAIL1','12/04/1990'),
			('PLAYER2','EMAIL2','12/04/1990'),
			('PLAYER3','EMAIL3','12/04/1990'),
			('PLAYER4','EMAIL4','12/04/1990'),
			('PLAYER5','EMAIL5','12/04/1990'),
			('PLAYER6','EMAIL6','12/04/1990');

INSERT INTO bt_zone(name) 
	VALUES	('ZONA1'),
			('ZONA2'),
			('ZONA3');

INSERT INTO bt_team_zone(zone_id, team_id)
	VALUES	(1,1),
			(1,2),
			(1,3),
			(1,4);

INSERT INTO bt_fixture(id,match_id,zone_id,date,home_team_id,away_team_id,home_team_score,away_team_score)
	VALUES	(1,1,1,'04-12-1990 04:05:06',1,2,0,0),
			(1,2,1,'04-12-1990 04:05:06',2,1,0,0),
			(1,3,1,'04-12-1990 04:05:06',3,4,0,0),
			(1,4,1,'04-12-1990 04:05:06',4,3,0,0);