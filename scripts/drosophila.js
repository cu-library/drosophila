

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


/* Toggle open and close  */
function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}


/* Subject Guide Accordion */
jQuery(document).ready(function($) {

  // Add permalinks to each detailed guide accordion content div. 
  $('div.detailed-guide-accordion-content').each(function() {
    var anchor = '#' + $(this).closest('div.content').find('a.guide-accordion-header-wrapper').attr('id');
    var anchorLink = '<a tabindex="-1" class="guide-accordion-header-permalink" href="'+anchor+'" title="Permalink to this section">¶</a>';
    $(this).append(anchorLink);
  });

  // On click of link around header, toggle classes for headers and content.
  $('a.guide-accordion-header-wrapper').click(function(e) {
    e.preventDefault();
    $(this).children('h2,h3').toggleClass('guide-accordion-header-collapsed');
    $(this).closest('div.content,section').find('div.guide-accordion-content').toggleClass('guide-accordion-content-collapsed');
  });

  // If the hash is an id of a accordion header wrapper a, emulate a click. 
  // This expands the content when using the permalinks. 
  // The extra call to filter() keeps this from being used to click on other elements on the page. 
  var hash = window.location.hash;
  if ( hash !== "" && hash !== "#" ){
    $(hash).filter("a.guide-accordion-header-wrapper").click();
  }

});

/* Subject Guides - Limit Number of Accordions */
jQuery(document).ready(function($) {

  function checkAndDisable(){
    var index = $('#edit-field-detailed-guide-section input[name="field_detailed_guide_section_add_more"]').parent().prev().find('tr:last').index();
    if (index >= 4) {
      $('#edit-field-detailed-guide-section input[name="field_detailed_guide_section_add_more"]').attr( "disabled", true ).after('<span id="guide-section-limit-reached-message">Contact Shelley or Kevin if you require additional sections.</span>');
    }
  }
  checkAndDisable();

  var target = document.getElementById('edit-field-detailed-guide-section');
  if (target != null) {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var myObserver = new MutationObserver(function(mutations) {
    checkAndDisable();
  });
  var config = { childList:true };
  myObserver.observe(target, config);
}

});
