app.controller('cadastroController', function ($scope, $http, md5) {

    //                     /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i
    $scope.pattern_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    //                     /^[a-zA-Z]*$/
    $scope.pattern_nome = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./0-9]*$/;
    $scope.pattern_senha = /^(?=.*\d)(?=.*[a-zA-Z])/;

    $scope.usuario = [];
    $scope.dadosUsuario = {};


    $scope.salvarUsuario = function (type) {
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
                    
                $scope.cadastroForm.$setPristine();
                $scope.dadosUsuario = {};
                $('.formdData').slideUp();
                $scope.messageSuccess(response.msg);
            } else {
                $scope.messageError(response.msg);
            }
        });
    };


    $scope.adicionaUsuario = function () {
        $scope.salvarUsuario('adicionar');
    };


    $scope.messageSuccess = function (msg) {
        $('.alert-success > p').html(msg);
        $('.alert-success').show();
        $('.alert-success').delay(5000).slideUp(function () {
            $('.alert-success > p').html('');
        });
    };

    $scope.messageError = function (msg) {
        $('.alert-danger > p').html(msg);
        $('.alert-danger').show();
        $('.alert-danger').delay(5000).slideUp(function () {
            $('.alert-danger > p').html('');
        });
    };
});