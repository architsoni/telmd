// config

var app =
angular.module('app')
  .config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
    }
    ])
  .config(['$translateProvider', function ($translateProvider) {
      // Register a loader for the static files
      // So, the module will search missing translation tables under the specified urls.
      // Those urls are [prefix][langKey][suffix].
      $translateProvider.useStaticFilesLoader({
          prefix: 'l10n/',
          suffix: '.js'
      });
      // Tell the module what language to use by default
      $translateProvider.preferredLanguage('en');
      // Tell the module to store the language in the local storage
      $translateProvider.useLocalStorage();


  }])
  .run(['$rootScope', '$location', 'auth', '$http', '$state',
    function run($rootScope, $location, auth, $http, $state) {
        $rootScope.$state = $state;

        $rootScope.$on('$stateChangeStart',
           function (event, toState, toParams, fromState, fromParams, options) {
               //event.preventDefault();
               var data = auth.getUser() || {};

               if (angular.equals(data, {})) {
                   $location.path('/access/signin');
               }
               if (toState.name === "access.signin" && !angular.equals(data, {})) {
                   $location.path('/app/dashboard-v2');
               }
           });

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
            });

    }]);