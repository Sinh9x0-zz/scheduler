var app = angular.module('app', ['ngRoute']); 

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'loginController',
        controllerAs: 'lgnCtrl',
        css: 'css/login.css'
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'scheduleController',
        controllerAs: 'schCtrl'
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
    .when('/admin/dashboard', {
        templateUrl: 'partials/admin-dashboard.html'
    })
    .when('/addshift', {
        templateUrl: 'partials/addshift.html'
    })
    .otherwise({
        redirectTo: '/dashboard'
    });
});