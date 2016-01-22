var app = angular.module('app', ['ngRoute']); 

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'loginController',
        controllerAs: 'lgnCtrl',
        resolve: {
            user: function(sessionFactory, $location, $q){
                var deferred = $q.defer();

                if(sessionFactory.checkUser() == undefined) {
                    deferred.resolve();
                } else {
                    deferred.reject('logged in'); 
                    $location.path('/dashboard')
                }   
                return deferred.promise;
            }
        },
        css: 'css/login.css'
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'scheduleController',
        resolve: { user: userPromise },
        controllerAs: 'schCtrl'
    })
    .when('/addemployee',{
        templateUrl: 'partials/addemployee.html',
        controller: 'addEmployeeController',
        resolve: { admin: adminPromise },
        controllerAs: 'addCtrl',
        css: 'css/addemployee.css'
    })
    .when('/myaccount', {
        templateUrl: 'partials/myaccount.html',
        controller: 'accountController',
        resolve: { user: userPromise },
        controllerAs: 'accCtrl'
    })
    .when('/admin/dashboard', {
        templateUrl: 'partials/admin-dashboard.html',
        controller: 'adminDashController',
        resolve: { admin: adminPromise },
        controllerAs: 'adDashCtrl'
    })
    .when('/addshift', {
        templateUrl: 'partials/addshift.html',
        controller: 'addShiftController',
        resolve: { admin: adminPromise },
        controllerAs: 'addSftCtrl'
    })
    .when('/showallemployees', {
        templateUrl: 'partials/showallemployees.html', 
        controller:'allEmployeesController',
        resolve: { admin: adminPromise },
        controllerAs: 'allEmplCtrl'
    })
    .when('/editemployeeinfo/:id', {
        templateUrl: 'partials/editemployeeinfo.html', 
        controller:'editEmployeeController',
        resolve: { admin: adminPromise },
        controllerAs: 'editEmpCtrl'
    })
    .when('/availability/:id', {
        templateUrl: 'partials/availability.html', 
        controller: 'addEmployeeController',
        resolve: { admin: adminPromise },
        controllerAs: 'addCtrl',
        css: 'css/addemployee.css'
    })
    .when('/addlocation', {
        templateUrl: 'partials/addlocation.html', 
        controller: 'addLocationController',
        resolve: { admin: adminPromise },
        controllerAs: 'addLocationCtrl'
    })
    .otherwise({
        redirectTo: '/dashboard'
    });
});

userPromise = function(sessionFactory, $location, $q){
    var deferred = $q.defer();

    if(sessionFactory.checkUser() == undefined) {
        deferred.reject('Not logged in'); 
        $location.path('/')
    } else {
        deferred.resolve();
    }   
    return deferred.promise;
}

adminPromise = function(sessionFactory, $location, $q){
    var deferred = $q.defer();

    if(sessionFactory.checkAdmin() == undefined) {
        deferred.reject('Not logged in'); 
        $location.path('/')
    } else {
        deferred.resolve();
    }   
    return deferred.promise;
}