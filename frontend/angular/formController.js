app.controller('formController', function ($scope) {

    //                     /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i
    $scope.pattern_email =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
});