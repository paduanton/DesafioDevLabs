app.controller('testeController', function ($scope, $http) {

    $scope.buscaRegistroBackup = function () {
        $http.get('/backend/php/executa.php', {
            params: {
                'type': 'testar'
            }
        }).success(function (response) {
            $scope.teste = response.registros;
            console.log($scope.teste); // mostrar formato do array no console na view /teste
        });
    };
});