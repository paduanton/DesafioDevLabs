app.controller('cadastroController', function ($scope, $http, md5) {

    //                     /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i
    $scope.pattern_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    //                     /^[a-zA-Z]*$/
    $scope.pattern_nome = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./0-9]*$/;
    $scope.pattern_senha = /^(?=.*\d)(?=.*[a-zA-Z])/;

    $scope.usuario = [];
    $scope.dadosUsuario = {};


    $scope.salvarUsuario = function () {
        var type = 'adicionar';

        var senha_md5 = this;
        senha_md5.hash = md5.createHash($scope.dadosUsuario.senha);
        $scope.dadosUsuario.senha = senha_md5.hash;

        var dados = $.param({
            'dados': $scope.dadosUsuario,
            'type': type
        });
        var charset = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post("/backend/php/executa.php", dados, charset).success(function (response) {
            if (response.status == 'OK') {
                $scope.usuario.push({
                    id: response.dados.id,
                    nome: response.dados.nome,
                    email: response.dados.email,
                    senha: response.dados.senha,
                    ultima_alteracao: response.dados.ultima_alteracao
                });

                $scope.reset();

                /*
                $scope.success = true;
                $scope.error = false;
                ng-show="success"
                */
                $scope.feedbackUsuario = response.msg;
                var element = angular.element('#modal-cadastro');
                element.modal('show');
                $scope.mudaCor = true;
            } else {
                $scope.mudaCor = false;
                /*
                $scope.success = false;
                $scope.error = true;
                (ng-show="error")
                */
                $scope.feedbackUsuario = response.msg;
                var element = angular.element('#modal-cadastro');
                element.modal('show');
            }
        });
    };

    $scope.reset = function () {
        $scope.dadosUsuario = {};
        $scope.cadastroForm.$setUntouched();
        $scope.cadastroForm.$setPristine();
    };
});