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
