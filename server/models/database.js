var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/futboldb';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE torneo(id int PRIMARY KEY, text VARCHAR(40) not null)');
query.on('end', function() { 
	client.end(); 
});