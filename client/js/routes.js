var app = angular.module('app', ['ngRoute']); 

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'loginController',
        controllerAs: 'lgnCtrl'
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html'
    })
    .when('/myrequests',{
        templateUrl: 'partials/myrequests.html'
    })
    .when('/addemployee',{
        templateUrl: 'partials/addemployee.html',
        controller: 'addEmployeeController',
        controllerAs: 'addCtrl'
    })
    .when('/myaccount', {
        templateUrl: 'partials/myaccount.html'
    })
    .otherwise({
        redirectTo: '/dashboard'
    });
});