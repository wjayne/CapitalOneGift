(function(){
	var app = angular.module("myApp2",[]);
	var urll = sessionStorage.purch ; 
	console.log(urll) ;

	app.controller('lastController', ['$http', '$scope', function($http, $scope){
		$scope.purchases={
			merchantsid:[],
			amounts:[],
			dates:[],
      mnames:[]
		}


		$http({
  		method: 'GET',
  		url: urll,
		}).then(function successCallback(response) {
    		var out = response.data ;
    		for(var i = 0 ; i<out.length ; i++)
    		{
    			$scope.purchases.merchantsid[i] = out[i].merchant_id ;
    			$scope.purchases.amounts[i] = out[i].amount ;
    			$scope.purchases.dates[i] = out[i].date ;
    		}

        for(var j = 0; j<$scope.purchases.merchantsid.length ; j++)
        {
          console.log(j) ;
          $http({
            method: 'GET',
            url: "http://api.reimaginebanking.com/merchants/"+$scope.purchases.merchantsid[j]+"?key=d764c1c8d9c91cf3b44b23287560aae7",
          }).then(function successCallback(response){
            //console.log($scope.purchases.merchantsid.length);
            //console.log(response.data.name) ;
            console.log(j) ;
            $scope.purchases.mnames.push(response.data.name) ;
          },function errorCallback(response){
            console.log("fail") ;
          });
        }
  		}, function errorCallback(response) {
    		console.log("fail") ;
  		});

  		$scope.clicky = function click()
  		{
  			console.log($scope.out) ;
  			console.log("hello") ;
  		}

	}]) ;


function findTopThree(){
  var len = $scope.mnames.length ;
  var hash = {} ;
  top = {
    num:0,
    name:""
  },
  top2={
    num:0,
    name:""
  },
  top3={
    num:0,
    name:""
  }
  for(var i = 0 ; i < len ; i++)
  {
    hash[$scope.mnames[i]] += 1 ;
  }

  for(var k in hash)
  {
    if(hash.hasOwnProperty(k))
    {

      if(hash[k]>top3.num)
      {
        if(hash[k]>top2.num)
        {
          if(hash[k]>top.num)
          {
            top.num = hash[k] ;
            top.name = k ;
          }
          else
          {
            top2.num = hash[k] ;
            top2.name = k ;
          }
        }
        else
        {
          top3.num = hash[k] ;
          top3.name = k ;
        }
      }//end checking top 3

    }
  }
} 

})();