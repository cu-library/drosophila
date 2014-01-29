svgeezy.init('nocheck', 'png');

jQuery(document).ready(function($){
  playNiceAdmin();
});

function playNiceAdmin(){
  jQuery(document).ready(function($){
  if($("#admin-menu").length){
    //Get admin menu to play nice
    $("#admin-menu").detach().prependTo('#page');
  }
  else{
    window.setTimeout(playNiceAdmin,20)
  }
  });
}


