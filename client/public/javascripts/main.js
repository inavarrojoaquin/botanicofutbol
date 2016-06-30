angular.module('botanicofutbol', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.todoData = {};

     // Get all todos
    $http.get('/torneo')
        .success(function(data) {
            $scope.todoData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });


        // Crate a torneo
    $scope.createTorneo = function() {
        $http.post('/torneo', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todoData = data;
                console.log("Create: " + data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete a todo
    $scope.deleteTorneo = function(torneoID) {
        $http.delete('/torneo/' + torneoID)
            .success(function(data) {
                $scope.todoData = data;
                console.log("Delete: " + data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
     

});