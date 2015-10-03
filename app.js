function myFunction(){
      var idd = document.getElementById("acn").value ;
    var ur = "http://api.reimaginebanking.com/customers/" + idd + "/accounts?key=d764c1c8d9c91cf3b44b23287560aae7"
    $.ajax({
    url: ur,
    success: function(results){
        for(var i = 0 ; i < results.length ; i++)
        {
          console.log(results[i].balance)
        }
    },

    fail: function(){
      console.log("fail") ;
    }
});
    return false ;
    }