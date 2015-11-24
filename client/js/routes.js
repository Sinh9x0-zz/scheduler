var app = angular.module('app', ['ngRoute']); 

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'loginController as lgnCtrl',
        css: 'css/login.css'
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html'
    })
    .when('/myrequests',{
        templateUrl: 'partials/myrequests.html'
    })
    .when('/myaccount', {
        templateUrl: 'partials/myaccount.html'
    })
    .otherwise({
        redirectTo: '/dashboard'
    });
});