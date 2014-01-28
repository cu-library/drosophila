svgeezy.init('nocheck', 'png');

jQuery(document).ready(function($){

  function playNiceAdmin(){
    if($("#admin-menu").length){
      //Get admin menu to play nice
      $("#admin-menu").detach().prependTo('#page');
    }
    else{
      window.setTimeout(playNiceAdmin,1000)
    }
  }
 



});


