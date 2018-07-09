app.controller('cadastroController', function ($scope, $http) {

    //                     /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i
    $scope.pattern_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    //                     /^[a-zA-Z]*$/
    $scope.pattern_nome = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./0-9]*$/;

    $scope.users = [];
    $scope.tempUserData = {};


    $scope.saveUser = function (type) {
        var data = $.param({
            'data': $scope.tempUserData,
            'type': type
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.post("/backend/php/action.php", data, config).success(function (response) {
            if (response.status == 'OK') {
                if (type == 'edit') {
                    $scope.users[$scope.index].id = $scope.tempUserData.id;
                    $scope.users[$scope.index].nome = $scope.tempUserData.nome;
                    $scope.users[$scope.index].email = $scope.tempUserData.email;
                    $scope.users[$scope.index].senha = $scope.tempUserData.senha;
                    $scope.users[$scope.index].criado = $scope.tempUserData.criado;
                } else {
                    $scope.users.push({
                        id: response.data.id,
                        nome: response.data.nome,
                        email: response.data.email,
                        senha: response.data.senha,
                        criado: response.data.criado
                    });

                }
                $scope.cadastroForm.$setPristine();
                $scope.tempUserData = {};
                $('.formData').slideUp();
                $scope.messageSuccess(response.msg);
            } else {
                $scope.messageError(response.msg);
            }
        });
    };

    // function to add user data
    $scope.adicionaUsuario = function () {
        $scope.saveUser('add');
    };


    // function to display success message
    $scope.messageSuccess = function (msg) {
        $('.alert-success > p').html(msg);
        $('.alert-success').show();
        $('.alert-success').delay(5000).slideUp(function () {
            $('.alert-success > p').html('');
        });
    };

    // function to display error message
    $scope.messageError = function (msg) {
        $('.alert-danger > p').html(msg);
        $('.alert-danger').show();
        $('.alert-danger').delay(5000).slideUp(function () {
            $('.alert-danger > p').html('');
        });
    };
});