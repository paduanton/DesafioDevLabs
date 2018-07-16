app.controller('inicioController', function ($scope, $window) {

    $scope.select = '/desafio/select.php';

    $scope.mudancas = '/desafio/mudancas.sql';

    $scope.mudancas_questao7 = '/desafio/mudancas_questao7.sql';

    $scope.versaophp = '/desafio/phpinfo.php';
    $scope.KingHost = 'https://king.host';

    $scope.linkFunc = function (url) { // função para redirecionar links que estão fora da rota
        console.log('redirecionando..');
        $window.open(url);
    }
});