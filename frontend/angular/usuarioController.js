app.controller('usuarioController', function ($scope, $http) {

    $scope.buscaRegistro = function () {
        $http.get('/backend/php/action.php', {
            params: {
                'type': 'view'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                $scope.users = response.records;
            }
        });
    };

});