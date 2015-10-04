function myFunction(){
      var idd = document.getElementById("acn").value ;
      var action = "" ;
      var ret = false ;
      var ur = "http://api.reimaginebanking.com/customers/" + idd + "/accounts?key=d764c1c8d9c91cf3b44b23287560aae7"
      sessionStorage.setItem("ids", ur) ;
      return true ;
}






