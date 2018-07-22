app.controller('usuarioController', function ($scope, $http) {

    $scope.buscaRegistro = function () {
        $http.get('/backend/php/index.php', {
            params: {
                'type': 'buscar'
            }
        }).success(function (response) {
            if (response.status == 'OK') {
                $scope.usuario = response.registros;
            }
        });
    };
                              // quando possui muitos dados na tabela, o filtro por id buga @TODO arrumar filtro id
    $scope.tipoDeOrdem = ''; // define o tipo de classificação padrão
    $scope.ordemReversa = false;  // define a ordem de classificação padrão
    $scope.buscarUsuario = '';     // define o termo padrão de pesquisa / filtro

});