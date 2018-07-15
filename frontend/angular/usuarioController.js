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

    $scope.tipoDeOrdem = ''; // define o tipo de classificação padrão
    $scope.ordemReversa = false;  // define a ordem de classificação padrão
    $scope.buscarUsuario = '';     // define o termo padrão de pesquisa / filtro

});