'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', 'api', 'toaster', function ($scope, $http, $state, api, toaster) {

    $scope.user = {};
    $scope.authError = null;
    $scope.signup = function () {
        $scope.authError = null;
        api.signUp($scope.user)
            .then(function (response) {
                $scope.$apply(toaster.pop('success', "Success", "Sign up successfully"));
                var refData = { email: $scope.user.email, name: $scope.user.name, age: $scope.user.age, phoneNumber: $scope.user.phoneNumber, zipCode: $scope.user.zipCode };
                api.setRef(response.uid, refData);
                $state.go('app.dashboard-v2');
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    $scope.$apply(toaster.pop('error', "Error", 'The password is too weak.'));
                } else {
                    $scope.$apply(toaster.pop('error', "Error", errorMessage));
                }
                console.log(error);
            });
    };
}])
;