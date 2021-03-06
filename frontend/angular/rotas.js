app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({ // remover #! da url junto com regra do .htaccess e tag base na index
            enabled: true,
            requireBase: true // indica se precisa ou não da tag base na index
        });

        $routeProvider
            .when('/', {
                templateUrl: 'frontend/views/inicio.html',
                controller: 'inicioController',
            })
            .when('/cadastro', {
                templateUrl: 'frontend/views/cadastro.html',
                controller: 'cadastroController',
            })
            .when('/lista/usuarios', {
                templateUrl: 'frontend/views/usuarios.html',
                controller: 'usuarioController',
            })
            .when('/teste', {
                templateUrl: 'frontend/views/teste.html',
                controller: 'testeController',
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);