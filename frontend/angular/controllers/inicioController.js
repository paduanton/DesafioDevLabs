app.controller('inicioController', function ($scope, $window) {

    $scope.select = 'http://localhost/desafio/select.php';

    $scope.mudancas = 'http://localhost/desafio/mudancas.sql';

    $scope.mudancas_questao7 = 'http://localhost/desafio/mudancas_questao7.sql';

    $scope.versaophp = 'http://localhost/desafio/phpinfo.php';

    $scope.linkFunc = function (url) { // função para redirecionar links que estão fora da rota
        console.log('redirecionando..');
        $window.open(url);
    }
});