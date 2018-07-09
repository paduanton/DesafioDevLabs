app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
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
            .when('/usuarios', {
                templateUrl: 'frontend/views/usuarios.html',
                controller: 'usuarioController',
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);