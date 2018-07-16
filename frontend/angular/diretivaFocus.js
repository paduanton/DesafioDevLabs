app.directive('focus', function () { // usado va view /lista/usuarios
    return function (scope, element) {
        element[0].focus();
    }
});