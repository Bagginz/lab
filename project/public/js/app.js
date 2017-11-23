var app = {};
(function() {
        app = angular.module("MainApp", ['ngRoute', 'ngSanitize', 'ngResource', 'ngAnimate', 'mgcrea.ngStrap']);
        app.config(function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(false).hashPrefix('!');
            $routeProvider
            .when("/",{
                templateUrl: '/views/index.html', controller: 'mainCtrl'
            }).when("/sample",{
                templateUrl: '/views/sample/sample.html', controller: 'sampleCtrl'
            }).when("/scrub",{
                templateUrl: '/views/ScrubDomain/scrubdomain.html', controller: 'scrubCtrl'
            }).when("/verification",{
                templateUrl: '/views/Vertification/VertifiCation.html', controller: 'verificationCtrl'
            }).otherwise({
                redirectTo: "/"
            });
        });
    }
)();