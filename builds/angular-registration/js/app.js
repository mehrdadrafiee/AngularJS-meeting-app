var myApp = angular.module('myApp',
  ['ngRoute', 'firebase'])
  .constant('FIREBASE_URL', 'https://angularjs-register.firebaseio.com/');

// Run
myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  //event info
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if(error=='AUTH_REQUIRED') {
      //AUTH REQUIRED
      $rootScope.message = 'Sorry, you must log in to access that page.';
      $location.path('/login');
    }
  });
}]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
