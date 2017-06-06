'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'api', 'toaster', 'auth', function ($scope, $http, $state, api, toaster, auth) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function () {
        $scope.authError = null;

        api.signIn($scope.user)
            .then(function (response) {
                var userDetail = {
                    uid: response.uid,
                    refreshToken: response.refreshToken,
                    detail: response.providerData[0],
                    isAnonymous: response.isAnonymous,
                    emailVerified: response.emailVerified
                };
                auth.saveUser(userDetail);
                $state.go('app.dashboard-v2');
            })
            .catch(function (error) {
                $scope.$apply(toaster.pop('error', "Error", error.message));
            });
    };
}])
;
