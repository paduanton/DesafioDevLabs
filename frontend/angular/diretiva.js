app.directive('letraNumero', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            ngModel.$parsers.push(function (viewValue) {
                var reg = /^[a-zA-Z0-9]*$/;
                if (viewValue.match(reg)) {
                    return viewValue;
                }
                var transformedValue = ngModel.$modelValue;
                ngModel.$setViewValue(transformedValue);
                ngModel.$render();
                return transformedValue;
            });
        }
    };
});