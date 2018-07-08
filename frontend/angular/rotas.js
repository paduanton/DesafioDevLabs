app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true // indica se precisa ou não da tag base na index
        });

        $routeProvider
            .when('/', {
                templateUrl: 'frontend/views/cadastrar.html',
                controller: 'formController',
            })

            .otherwise({
                redirectTo: '/'
            });
    }]);