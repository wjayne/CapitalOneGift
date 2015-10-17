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
          //console.log(j) ;
          $http({
            method: 'GET',
            url: "http://api.reimaginebanking.com/merchants/"+$scope.purchases.merchantsid[j]+"?key=d764c1c8d9c91cf3b44b23287560aae7",
          }).then(function successCallback(response){
            //console.log($scope.purchases.merchantsid.length);
            //console.log(response.data.name) ;
            //console.log(j) ;
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
        var stuff = findTopThree()
        //console.log(stuff) ;
        //console.log(stuff.top1) ;
        console.log(stuff.top1.num) ;
  			console.log(stuff.top1.name) ;
        //console.log(stuff.top.num) ;
  			//console.log("hello") ;
  		}

      function findTopThree(){
  var len = $scope.purchases.mnames.length ;
  var hash = [] ;
  top1 = {
    num:1,
    name:""
  },
  top2={
    num:1,
    name:""
  },
  top3={
    num:1,
    name:""
  }
  for(var i = 0 ; i < len ; i++)
  {
    if(isNaN(hash[$scope.purchases.mnames[i]]))
    {
        hash[$scope.purchases.mnames[i]] = 1 ;
    }
    else
    {
        hash[$scope.purchases.mnames[i]]++ ;
    }
    //console.log($scope.purchases.mnames[i]) ;
    //console.log(hash[$scope.purchases.mnames[i]])
    //console.log(hash[$scope.purchases.mnames[i]]) ;
  }

  for(var k in hash)
  {
    //console.log(k) ;
    if(hash.hasOwnProperty(k))
    {
      //console.log("working") ;
      //console.log(hash[k]) ;
      if(hash[k]>top3.num)
      {
        if(hash[k]>top2.num)
        {
          if(hash[k]>top1.num)
          {
            top1.num = hash[k] ;
            //console.log(top.num) ;
            top1.name = k ;
            //console.log(k) ;
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

    }//end for
    //console.log(top.name + "-----hello") ;
    //console.log(top1.num) ;
    //console.log(top1.name) ;
    var stuff = {top1, top2, top3} ;
    return stuff ;
  }
}

	}]) ;


 

})();