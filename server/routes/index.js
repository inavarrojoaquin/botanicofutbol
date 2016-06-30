var express = require('express');
var pg = require('pg');
var path = require('path');
var router = express.Router();

var connectionString = require(path.join(__dirname, '../', '../', 'config'));

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});

router.post('/torneo', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {id: req.body.id, text: req.body.text};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO torneo(id, text) values($1, $2)", [data.id, data.text]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM torneo ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

router.get('/torneo', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM torneo ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.put('/torneo/:id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.id;

    // Grab data from http request
    var data = {text: req.body.text};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE torneo SET text=($1) WHERE id=($2)", [data.text, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM torneo ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

router.delete('/torneo/:id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM torneo WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM torneo ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

module.exports = router;
