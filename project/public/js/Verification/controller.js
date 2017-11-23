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
