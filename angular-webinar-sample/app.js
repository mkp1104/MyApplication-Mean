angular.module( 'sample', [
  'ui.router',
  'restangular',
  'sample.auth',
  'sample.homePage',
  'SaveFormServices',
  // 'sample.todoList',
  // 'sample.todoItem',
  'sample.login',
  'auth0'
])
.config( function ($urlRouterProvider, authProvider, $httpProvider) {

  authProvider.init({
    domain: 'mkp.auth0.com',
    clientID: 'hGjThwxsOXDlvjSVy0sK2BMP18ooD4Yq',
    callbackURL: location.href,
    loginState: 'login'
  });

 // RestangularProvider.setBaseUrl('http://localhost:8085/api/');

  $httpProvider.interceptors.push('authInterceptor');

  $urlRouterProvider.otherwise('/');

  authProvider.on('loginSuccess', function($state) {
    $state.go('auth.homePage');
  })
})
.run(function(auth) {
  auth.hookEvents();
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

})

;

