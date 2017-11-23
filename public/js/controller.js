(function() {
    app.controller("globalCtrl", function ($scope) {
        $scope.pageData = [
            {Name: 'Home'},
            {Name: 'Sample'}
        ];
        $scope.directiveTest = "HELLO WORLD";
    });
})();