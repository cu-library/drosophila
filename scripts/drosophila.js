

//Move the admin menu to the top of the page
jQuery(document).ready(function($){
  playNiceAdmin();
  svgeezy.init('nocheck', 'png');
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

//Enable jump menus in pages (weird)
jQuery(document).ready(function($) {
 $('#jump-menu-button').click(function() {
   var $select = $(this).parents('form').find('.jump-menu-select');
   var loc = $select.val();
   if (loc) {
    location.href = loc;
   }
   return false;
 });
});

jQuery(document).ready(function($) {
 $('.jump-menu-select').change(function() {
   var loc = $(this).val();
   if (loc) {
    location.href = loc;
   }
   return false;
 });
});

jQuery(document).ready(function($) {
  $('#nice-menu-1>li>a').each(function(index){
     $(this).attr('oldhref', $(this).attr('href'));
     $(this).attr('href', '#'); 
     $(this).click(function() {
       if ($(this).parent().hasClass("over")) {
          $(this).attr('href', $(this).attr('oldhref')); 
       }
     });
  });
  
});

jQuery(document).ready(function($) {
  $('td.views-field-field-database-link a').each(function(index){
    $(this).attr('href', decodeURIComponent($(this).attr('href')));
  });

  $('div.field-name-field-database-link a').each(function(index){
    $(this).attr('href', decodeURIComponent($(this).attr('href')));
  });

});


function submit_form() {
selind = document.forms.course_reserves_search.search_action.selectedIndex;
selval = document.forms.course_reserves_search.search_action[selind].value;
document.forms.course_reserves_search.action=selval;
document.forms.course_reserves_search.submit();
}

/* Redirect search to Scholars Portal Journals  */

function search_scholars_portal_journals() {
var url="http://proxy.library.carleton.ca/login?url=http://journals2.scholarsportal.info./search-advanced.xqy?q=";
var input_element = document.getElementById("search_terms");
document.location = url + encodeURIComponent(input_element.value);
}


/* Float the major subject guides to the top of "by subject" views */

jQuery(document).ready(function($) {
 major = $('.major_subject_guide').parents('tr').addClass('major');
 major.parent().prepend(major);
 major.removeClass('odd even');
 major.siblings().removeClass('odd even views-row-first');
 major.addClass('odd views-row-first');
 major.siblings('tr:odd').addClass('odd');
 major.siblings('tr:even').addClass('even');
});

/* Add hash when field group's horizontal tab is clicked */
jQuery(document).ready(function($) {
  $('div.field-group-htabs div.horizontal-tabs ul.horizontal-tabs-list li a').click(function() {
    history.pushState(null,null,$(this).attr('href'));
    console.log('new history pushed'); 
  });
});


