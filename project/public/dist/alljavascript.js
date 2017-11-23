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
var spinner = {};
var token = "XXX";
(function() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    var optSpinerModal = {
        lines: 11, // The number of lines to draw
        length: 23, // The length of each line
        width: 8, // The line thickness
        radius: 40, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 9, // The rotation offset
        color: '#FFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 50, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        //className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent in px
        left: '50%' // Left position relative to parent in px
    };

    var spinnerObj = null;
    spinner.show = function () {
        var spinner_div = document.getElementById('spinner');
        if (spinnerObj == null) {
            spinnerObj = new Spinner(optSpinerModal).spin(spinner_div);
        } else {
            spinnerObj.spin(spinner_div);
        }
        $.blockUI({message: null, overlayCSS: {backgroundColor: '#5c5c5c'}});
    }

    spinner.hide = function () {
        var spinner_div = document.getElementById('spinner');
        spinnerObj.stop(spinner_div);
        $.unblockUI();
    }
})();
(function() {
    app.controller("globalCtrl", function ($scope) {
        $scope.pageData = [
            {Name: 'Home'},
            {Name: 'Sample'}
        ];
        $scope.directiveTest = "HELLO WORLD";
    });
})();
(function(){
    app.directive('directiveSample',function() {
        return {
            restrict: 'AEC',
            replace: true,
            require: 'ngModel',
            scope: true,
            //template : "",
            //templateUrl : "",
            link: function (scope, element, attr, ngModel) {
                ngModel.$render = function () {
                    element.empty();
                    element.append(ngModel.$viewValue);
                };
            }
        }
    });
})();
(function() {
    Date.prototype.addHours= function(h){
        this.setHours(this.getHours()+h);
        return this;
    }
    app.filter('DateTrick', function () {
        return function (input) {
            if (input !== null) {
                var DateCal = input.addHours(7);
                return DateCal;
            } else {
                return {};
            }
        }
    });
})();
(function() {
    app.controller('scrubCtrl', function ($scope, $modal, scrubService) {

        $scope.Scrub ={};
        $scope.setScrubDomain = function(){
            var Filepath = "C:/Users/biw/Desktop/ScrubFile/scrubExport.txt";
            scrubService.setScrubDomain(Filepath).then(function(filepath){
                console.log(filepath);
            });
        };
    });
})();

(function(){
    app.factory('scrubService', function ($http,$q) {
        var thisfact = {};

        thisfact.setScrubDomain = function(obj){
            spinner.show();
            var defer = $q.defer();
            $http({
                method: "POST",
                url: '/scrub/setScrubDomain',
                contentType: 'application/json; charset=utf-8',
                data: { filepath: obj},
                dataType: 'json',
                headers: {
                    'RequestVerificationToken': token
                }
            }).success(function(data) {
                spinner.hide();
                defer.resolve(data);
            }).error(function(data) {
                spinner.hide();
                defer.reject(data);
            });
            return defer.promise;
        };
        return thisfact;

    });
})();
!function(n){function r(o){if(t[o])return t[o].exports;var e=t[o]={i:o,l:!1,exports:{}};return n[o].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var t={};r.m=n,r.c=t,r.d=function(n,t,o){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:o})},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},r.p="",r(r.s=0)}([function(n,r,t){!function(){throw new Error('Cannot find module "babel-polyfill"')}(),function(){throw new Error('Cannot find module "/project/public/js/app.js"')}()}]);
(function(){
    app.factory('searchEngineService', function ($http,$q) {
        var thisfact = {};
        thisfact.addKeyword = function(data){
            spinner.show();
            var defer = $q.defer();
            console.log(data);
            $http({
                method: "POST",
                url: '/searchengine/addKeyword',
                contentType: 'application/json; charset=utf-8',
                data : data,
                dataType: 'json',
                headers: {
                    'RequestVerificationToken': token
                }
            }).success(function(data) {
                spinner.hide();
                defer.resolve(data);
            }).error(function(data) {
                spinner.hide();
                defer.reject(data);
            });
            return defer.promise;
        };

        return thisfact;
    });
})();
(function() {
    app.controller('verificationCtrl', function ($scope, $modal, verificationService) {

        $scope.setFilePath = function(){
            var getfilepath = document.getElementById('exampleInputFile').value;
            if(getfilepath!== undefined && getfilepath!=""){
                var file = getfilepath.split("\\");
                var filepath = "D:/" + file[2];
                console.log(filepath);
                verificationService.FindThisData(filepath).then(function(data){
                    console.log(data);
                });
            }
        };
    });
})();

(function(){
    app.factory('verificationService', function ($http,$q) {
        var thisfact = {};

        thisfact.FindThisData = function(obj){
            spinner.show();
            var defer = $q.defer();
            $http({
                method: "POST",
                url: '/verification/FindThisData',
                contentType: 'application/json; charset=utf-8',
                data: { filepath: obj},
                dataType: 'json',
                headers: {
                    'RequestVerificationToken': token
                }
            }).success(function(data) {
                spinner.hide();
                defer.resolve(data);
            }).error(function(data) {
                spinner.hide();
                defer.reject(data);
            });
            return defer.promise;
        };
        return thisfact;

    });
})();
(function(){
    app.controller('mainCtrl', function ($scope,mainService) {
        $scope.activePage = 1; // Home
        $scope.initMT = function() {
            mainService.GetSample().then(function (data) {
                $scope.testData = data;
            });
        };
    });
})();
(function(){
    app.factory('mainService', function ($http,$q) {
        var thisfact = {};
        thisfact.GetSample = function(){
            spinner.show();
            var defer = $q.defer();
            $http({method: 'GET', url: '/sample'}).
                success(function(data) {
                    spinner.hide();
                    defer.resolve(data);
                }).
                error(function(err) {
                    spinner.hide();
                    defer.reject(err);
                });
            return defer.promise;
        };

        return thisfact;

    });
})();
(function() {
    app.controller('sampleCtrl', function ($scope, $modal, sampleService) {
        $scope.activePage = 2; //"Sample";
        $scope.readSampleData = [];

        ///------------ Create Section ---------------------
        $scope.createSample = function () {
            sampleService.createSample().then(function (result) {
                if (result != "ERROR") {
                    toastr.success('การบันทึกสำเร็จ', 'การบันทึกข้อมูล');
                    $scope.readSampleData.push(result);
                } else {
                    toastr.warning('การบันทึกผิดพลาด' + result, 'การบันทึกข้อมูล');
                }
            })
        };
        $scope.createNewSample = function () {
            sampleService.createNewSample($scope.modalData).then(function (result) {
                if (result != "ERROR") {
                    toastr.success('การบันทึกสำเร็จ', 'การบันทึกข้อมูล');
                    $scope.readSampleData.push(result);
                } else {
                    toastr.warning('การปรับปรุงผิดพลาด' + result, 'การปรับปรุงผิดพลาด');
                }
            });
        }
        ///-------------------------------------------------

        ///------------- Read Section ----------------------
        $scope.modalData = {};
        $scope.read = function (id, cb) {
            sampleService.readSample(id).then(function (result) {
                cb(result);
            });
        }
        $scope.readAllSample = function () {
            sampleService.readAllSample().then(function (result) {
                if (result != "ERROR") {
                    $scope.readSampleData = result;
                } else {
                    toastr.warning('การอ่านข้อมูลผิดพลาด' + result, 'การอ่านข้อมูลผิดพลาด');
                }
            })
        };
        // TODO : Pagination Serverside ReadData

        ///-------------------------------------------------

        ///------------- Update Section --------------------
        $scope.updateSample = function () {
            var id = $scope.currentID;
            var index = $scope.currentIndex;
            sampleService.updateSample($scope.modalData, id).then(function (result) {
                if (result != "ERROR") {
                    $scope.readSampleData[index] = $scope.modalData;
                } else {
                    toastr.warning('การปรับปรุงผิดพลาด' + result, 'การปรับปรุงผิดพลาด');
                }
            })
        }
        ///-------------------------------------------------

        ///------------- Delete Section --------------------
        $scope.deleteConfirm = function (id, index) {
            $scope.currentID = id;
            $scope.currentIndex = index;
            $modal({scope: $scope, template: '/views/sample/modal/sampleConfirm.html', show: true});
        };
        $scope.deleteSample = function () {
            var id = $scope.currentID;
            var index = $scope.currentIndex;

            sampleService.deleteSample(id).then(function (result) {
                if (result != "ERROR") {
                    $scope.readSampleData.splice(index, 1);
                } else {
                    toastr.warning('การลบผิดพลาด' + result, 'การลบผิดพลาด');
                }
            })
        };
        ///-------------------------------------------------

        ///-------------- Other Section --------------------
        $scope.checkData = function () {
            switch ($scope.modalMode) {
                case "create" :
                    $scope.createNewSample();
                    break;
                case "edit" :
                    $scope.updateSample();
                    break;
            }
        }
        $scope.showSample = function (type, id, index) {
            $scope.modalMode = type;
            $scope.currentID = id;
            $scope.currentIndex = index;
            var myOtherModal = $modal({scope: $scope, template: '/views/sample/modal/sampleModal.html', show: false});

            switch (type) {
                case 'create' :
                    $scope.modalData = {};
                    $scope.modalData.readOnly = false;
                    myOtherModal.$promise.then(myOtherModal.show);
                    break;
                case 'show' :
                    $scope.read(id, function (result) {
                        if (result != "ERROR") {
                            myOtherModal.$promise.then(myOtherModal.show);
                            $scope.modalData = result;
                            $scope.modalData.bCreate = JSON.parse(result.bCreate);
                            $scope.modalData.readOnly = true;
                        } else {
                            toastr.warning('การอ่านข้อมูลผิดพลาด' + result, 'การอ่านข้อมูลผิดพลาด');
                        }
                    });

                    break;
                case 'edit' :
                    $scope.read(id, function (result) {
                        if (result != "ERROR") {
                            myOtherModal.$promise.then(myOtherModal.show);
                            $scope.modalData = result;
                            $scope.modalData.bCreate = JSON.parse(result.bCreate);
                            $scope.modalData.readOnly = false;
                        } else {
                            toastr.warning('การอ่านข้อมูลผิดพลาด' + result, 'การอ่านข้อมูลผิดพลาด');
                        }
                    });
                    break;
            }
        };
        ///-------------------------------------------------
    });
})();

(function(){
    app.factory('sampleService', function ($http,$q) {
        var thisfact = {};
        thisfact.createSample = function(){
            spinner.show();
            var defer = $q.defer();
                $http({
                    method: "GET",
                    url: '/sample/create',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    headers: {
                        'RequestVerificationToken': token
                    }
                }).success(function(data) {
                    spinner.hide();
                    defer.resolve(data);
                }).error(function(data) {
                    spinner.hide();
                    defer.reject(data);
                });
            return defer.promise;
        };

        thisfact.createNewSample = function(obj){
            spinner.show();
            var defer = $q.defer();
            $http({
                method: "POST",
                url: '/sample/createnew',
                contentType: 'application/json; charset=utf-8',
                data: { Name: obj.Name, bCreate: obj.bCreate},
                dataType: 'json',
                headers: {
                    'RequestVerificationToken': token
                }
            }).success(function(data) {
                spinner.hide();
                defer.resolve(data);
            }).error(function(data) {
                spinner.hide();
                defer.reject(data);
            });
            return defer.promise;
        };

        thisfact.readAllSample = function(){
            spinner.show();
            var defer = $q.defer();
                $http(
                {
                    method: 'GET',
                    url: '/sample/read',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    headers: {
                        'RequestVerificationToken': token
                    }
                }).success(function(data) {
                    spinner.hide();
                    defer.resolve(data);
                }).error(function(data) {
                    spinner.hide();
                    defer.reject(data);
                });
            return defer.promise;
        };

        thisfact.deleteSample = function(id){
            spinner.show();
            var defer = $q.defer();
                $http({
                    method: 'GET',
                    url: '/sample/delete/'+id,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    headers: {
                        'RequestVerificationToken': token
                    }
                }).success(function(data) {
                    spinner.hide();
                    defer.resolve(data);
                }).error(function(data) {
                    spinner.hide();
                    defer.reject(data);
                });
            return defer.promise;
        };

        thisfact.readSample = function(id){
            spinner.show();
            var defer = $q.defer();
                $http({
                    method: 'GET',
                    url: '/sample/read/'+id,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    headers: {
                        'RequestVerificationToken': token
                    }
                }).success(function(data) {
                    spinner.hide();
                    defer.resolve(data);
                }).error(function(data) {
                    spinner.hide();
                    defer.reject(data);
                });
            return defer.promise;
        };

        thisfact.updateSample = function(obj,id){
            spinner.show();
            var defer = $q.defer();
                $http({
                    method: "POST",
                    url: '/sample/update/'+id,
                    data: { Name: obj.Name, bCreate: obj.bCreate},
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    headers: {
                        'RequestVerificationToken': token
                    }
                }).success(function(data) {
                    spinner.hide();
                    defer.resolve(data);
                }).error(function(data) {
                    spinner.hide();
                    defer.reject(data);
                });
            return defer.promise;
        };

        return thisfact;

    });
})();