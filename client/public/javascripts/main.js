angular.module('botanicofutbol', [])


.controller('mainController', ["RestClient","$scope","$http", function(RestClient, $scope, $http) {
  //Forms
    $scope.formTournament = {};
    $scope.formTeam = {};
    $scope.formPlayer = {};
    $scope.formZone = {};
    $scope.formTeamZone = {};
    $scope.formFixture = {};
    $scope.formTeamPosition = {};
    //Datas
    $scope.tournamentData = {};
    $scope.teamData = {};
    $scope.playerData = {};
    $scope.zoneData = {};
    $scope.teamZoneData = {};
    $scope.fixtureData = {};
    $scope.fixtureZoneData = {};
    $scope.teamPositionData = {};

    RestClient.query(function (data) {
        $scope.zoneDAta = data;
    });

    $scope.getFixtureByZoneId = function(zoneId) {
        $http.get('/fixture/' + zoneId)
            .success(function(data) {
                $scope.fixtureZoneData = data;
                console.log("Get Fixture by zoneId success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    };

    /**
    * Tournament methods
    */

    getAllTournament();
    getAllTeams();
    getAllPlayers();
    getAllZones();
    getAllTeamZones();
    getAllFixtures();

    // Get all tournament
    function getAllTournament() {
        $http.get('/tournament')
            .success(function(data) {
                $scope.tournamentData = data;
                console.log("Get all tournament success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Crate tournament
    $scope.addTournament = function() {
        $http.post('/tournament', $scope.formTournament)
            .success(function(data) {
                $scope.tournamentData.push(data);
                $scope.formTournament = {};                
                console.log("Add tournament success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete tournament
    $scope.deleteTournament = function(tournamentID) {
        $http.delete('/tournament/' + tournamentID)
            .success(function(data) {
                var index = $scope.tournamentData.indexOf(tournamentID);
                $scope.tournamentData.splice(index, 1);
                console.log("Delete tournament success ");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    /**
    * Team methods
    */
     
    // Get all teams
    function getAllTeams() {
        $http.get('/team')
            .success(function(data) {
                $scope.teamData = data;
                console.log("Get all team success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Add team
    $scope.addTeam = function() {
        $http.post('/team', $scope.formTeam)
            .success(function(data) {
                $scope.teamData.push(data);
                $scope.formTeam = {};                
                console.log("Add team success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete team
    $scope.deleteTeam = function(teamID) {
        $http.delete('/team/' + teamID)
            .success(function(data) {
                var index = $scope.teamData.indexOf(teamID);
                $scope.teamData.splice(index, 1);
                console.log("Delete team success ");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

     /**
    * Player methods
    */

    // Get all players
    function getAllPlayers() {
        $http.get('/player')
            .success(function(data) {
                $scope.playerData = data;
                console.log("Get all player success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Crate tournament
    $scope.addPlayer = function() {
        $http.post('/player', $scope.formPlayer)
            .success(function(data) {
                $scope.playerData.push(data);
                $scope.formPlayer = {};                
                console.log("Add player success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete tournament
    $scope.deletePlayer = function(playerID) {
        $http.delete('/player/' + playerID)
            .success(function(data) {
                var index = $scope.playerData.indexOf(playerID);
                $scope.playerData.splice(index, 1);
                console.log("Delete player success ");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    /**
    * Zones methods
    */

    // Get all
    function getAllZones() {
        $http.get('/zone')
            .success(function(data) {
                $scope.zoneData = data;
                console.log("Get all Zones success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Crate
    $scope.addZone = function() {
        $http.post('/zone', $scope.formZone)
            .success(function(data) {
                $scope.zoneData.push(data);
                $scope.formZone = {};                
                console.log("Add zone success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete
    $scope.deleteZone = function(zoneId) {
        $http.delete('/zone/' + zoneId)
            .success(function(data) {
                var index = $scope.zoneData.indexOf(zoneId);
                $scope.zoneData.splice(index, 1);
                console.log("Delete zone success ");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    /**
    * Team-Zones methods
    */

    // Get all
    function getAllTeamZones() {
        $http.get('/team_zone')
            .success(function(data) {
                $scope.teamZoneData = data;
                console.log("Get all Team-Zones success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Crate
    $scope.addTeamZone = function() {
        $http.post('/team_zone', $scope.formTeamZone)
            .success(function(data) {
                $scope.teamZoneData.push(data);
                $scope.formTeamZone = {};                
                console.log("Add team-zone success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

   // Delete
    $scope.deleteTeamZone = function(zoneId, teamId) {
        $http.delete('/team_zone/' + zoneId + '/' + teamId)
            .success(function(data) {
                var objToDelete = $scope.teamZoneData.filter(function ( obj ) {
                    return obj.id == zoneId && obj.match_id == teamId;
                })[0];
                var index = $scope.teamZoneData.indexOf(objToDelete);
                $scope.teamZoneData.splice(index, 1);
                console.log("Delete team-zone success ");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    /**
    * Fixture methods
    */

    // Get all tournament
    function getAllFixtures() {
        $http.get('/fixture')
            .success(function(data) {
                $scope.fixtureData = data;
                console.log("Get all fixture success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Crate tournament
    $scope.addFixture = function() {
        $http.post('/fixture', $scope.formFixture)
            .success(function(data) {
                $scope.fixtureData.push(data);
                $scope.formFixture = {};                
                console.log("Add fixture success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete tournament
    $scope.deleteFixture = function(fixtureId, matchId) {
        $http.delete('/fixture/' + fixtureId + '/' + matchId)
            .success(function(data) {
                var objToDelete = $scope.fixtureData.filter(function ( obj ) {
                    return obj.id == fixtureId && obj.match_id == matchId;
                })[0];
                var index = $scope.fixtureData.indexOf(objToDelete);
                $scope.fixtureData.splice(index, 1);
                console.log("Delete fixture success ");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    /**
    * Team-Position methods
    */

    //seria necesario una tabla de posiciones en general

    // Get
    $scope.getTeamsPositionByZoneId = function(zoneId) {
        $http.get('/team_position/' + zoneId)
            .success(function(data) {
                $scope.teamPositionData = data;
                console.log("Get TeamPosition by zoneId success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    };


    // Crate
    $scope.addTeamPosition = function() {
        $http.post('/team_position', $scope.formTeamPosition)
            .success(function(data) {
                $scope.teamPositionData.push(data);
                $scope.formTeamPosition = {};                
                console.log("Add TeamPosition success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete
    $scope.deleteTeamPosition = function(zoneId, teamPositionId) {
        $http.delete('/team_position/' + zoneId + '/' + teamPositionId)
            .success(function(data) {
                var objToDelete = $scope.fixtureData.filter(function ( obj ) {
                    return obj.id == zoneId && obj.match_id == teamPositionId;
                })[0];
                var index = $scope.teamPositionData.indexOf(objToDelete);
                $scope.teamPositionData.splice(index, 1);
                console.log("Delete TeamPosition success ");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


}]);

.factory('RestClient', ['$resource', function ($resource) {
        return $resource('/zone', {
            id: '@_id'
        }, {});
}]);