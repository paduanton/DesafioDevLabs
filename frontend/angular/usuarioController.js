app.controller('usuarioController', function ($scope, $http) {

    $scope.buscaRegistro = function () {
        $http.get('/backend/php/executa.php', {
            params: {
                'type': 'buscar'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                $scope.usuario = response.registros;
            }
        });
    };

});