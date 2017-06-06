'use strict';

/* Controllers */

app
  // Chart dashboard controller 
  .controller('DashboardCtrl', ['$scope', 'api', '$filter', 'auth', function ($scope, api, $filter, auth) {
      var vm = this;
      ctrlInit()

      function ctrlInit() {
          var view = {
              userCheckInDetail: {},
              practitioners: []
          };
          $scope.view = view;

          getPractitioners();
          getChartData();
      }

      function getPractitioners() {
          var index = 0,
              mapData = [];

          api.getPractitioners()
              .then(function (response) {
                  $scope.view.practitioners = response;
                  console.log('$scope.view.practitioners', $scope.view.practitioners);
              });
      }

      function getChartData() {
          var index = 0,
              mapData = [];

          api.getCheckIns()
              .then(function (response) {
                  getLoginedCheckIn(response);
              });
      }

      function getLoginedCheckIn(allCheckIns) {
          var loginUser = auth.getUser();
          if (loginUser) {
              api.getCheckInByUserId(loginUser.uid)
                  .on("value", function (data) {
                      angular.forEach(data.val(), function (value, key) {
                          $scope.view.userCheckInDetail = value;
                          console.log($scope.view.userCheckInDetail)
                      })
                  });
          } else {
              $scope.view.userCheckInDetail = {};
          }
      }
  }]);
