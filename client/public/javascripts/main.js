angular.module('botanicofutbol', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.tournamentData = {};
    $scope.teamData = {};
    $scope.playerData = {};

    getAllTournament();

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
        $http.post('/tournament', $scope.formData)
            .success(function(data) {
                $scope.tournamentData.push(data);
                $scope.formData = {};                
                console.log("Add tournament success");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete tournament
    $scope.deleteTournament = function(tournamentID, index) {
        $http.delete('/tournament/' + tournamentID)
            .success(function(data) {
                $scope.tournamentData.splice(index, 1);
                console.log("Delete tournament success ");
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
     

});