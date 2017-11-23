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