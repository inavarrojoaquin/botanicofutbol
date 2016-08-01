angular.module('botanicofutbol', [])

.controller('presentationController', function($scope, $http) {
	
	$scope.setTournamentId = function(id){
		console.log("Presentation panel: " + id);
        window.location = 'http://localhost:3000';
    };
});