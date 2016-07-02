DROP TABLE IF EXISTS bt_player;
DROP TABLE IF EXISTS bt_team;
DROP TABLE IF EXISTS bt_tournament;

CREATE TABLE IF NOT EXISTS bt_tournament
(
	id		SERIAL		NOT NULL PRIMARY KEY, 
	name	VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS bt_team
(
	id 						SERIAL			NOT NULL,
	tournament_id		 	INTEGER 		NOT NULL, 
	name 					VARCHAR(50) 	NOT NULL,

	PRIMARY KEY (id), 
	CONSTRAINT bt_tournament_id_fkey FOREIGN KEY (tournament_id) 
		REFERENCES bt_tournament (id) MATCH SIMPLE 
		ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bt_player
(
	id				SERIAL			NOT NULL,
	team_id			INTEGER			NOT NULL,
	name			VARCHAR(100)	NOT NULL,
	email			VARCHAR(100)	NOT NULL,
	birthday		date			NOT NULL,
	observations	VARCHAR(200)	NULL,
  	
	PRIMARY KEY (id, team_id),
	CONSTRAINT bt_team_id_fkey FOREIGN KEY (team_id)
		REFERENCES bt_team (id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE CASCADE
);


INSERT INTO bt_tournament(name) 
	VALUES	('BOTANICO'),
			('ZONA_NORTE');
			
INSERT INTO bt_team(tournament_id, name)
	VALUES 	(1,'BOCA'),
			(1,'RIVER'),
			(2,'RACING');

INSERT INTO bt_player(team_id, name, email, birthday)
	VALUES	(1,'PLAYER1','EMAIL1','12/04/1990'),
			(1,'PLAYER2','EMAIL2','12/04/1990'),
			(1,'PLAYER3','EMAIL3','12/04/1990'),
			(2,'PLAYER4','EMAIL4','12/04/1990'),
			(2,'PLAYER5','EMAIL5','12/04/1990'),
			(2,'PLAYER6','EMAIL6','12/04/1990');
			