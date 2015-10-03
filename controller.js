(function(){
	var app = angular.module('myApp', []) ;
    var urll = sessionStorage.ids ;
    console.log(urll) ;

    app.controller('accountController',['$http', '$scope', function($http, $scope){
        $scope.account = {
            actions: []
        }

        $http({
            method: 'GET',
            url: urll,
            }).then(function successCallback(response) {
            var out = response.data;
            for(var i = 0 ; i < out.length ; i++)
            {
                $scope.account.actions[i]=out[i].nickname ;
            }
            /*for (var i = 0; i < out.data.length; i++) {
                $scope.account.actions.push(out.data[i]);
            }*/
            //console.log(out[4].nickname) ;
            }, function errorCallback(response) {
            console.log(response) ;
            });

            console.log($scope.account.actions[0])

       }]) ;
})();