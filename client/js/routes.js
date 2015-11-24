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
        controllerAs: 'addCtrl',
        css: 'css/addemployee.css'
    })
    .when('/myaccount', {
        templateUrl: 'partials/myaccount.html',
        controller: 'accountController',
        controllerAs: 'accCtrl'
    })
    .when('/admin/dashboard', {
        templateUrl: 'partials/admin-dashboard.html'
    })
    .when('/addshift', {
        templateUrl: 'partials/addshift.html'
    })
    .when('/showallemployees', {
        templateUrl: 'partials/showallemployees.html', 
        controller:'allEmployeesController',
        controllerAs: 'allEmplCtrl'
    })
    .when('/editemployeeinfo/:id', {
        templateUrl: 'partials/editemployeeinfo.html', 
        controller:'editEmployeeController',
        controllerAs: 'editEmpCtrl'
    })
    .otherwise({
        redirectTo: '/dashboard'
    });
});