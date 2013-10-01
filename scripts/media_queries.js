/**
 * @file
 * Fire callbacks for media query breakpoints
 *
 * To use this file enable the OnMediaQuery.js polyfill in your subthemes
 * appearance settings - this will load the required plugin and this file.
 *
 * This allows you to write context (media query) specific JS without hard
 * coding the media queries, aka like matchMedia. Each context matches the
 * media queries you set in theme settings (by adding the font-family
 * declarations to the responsive layout CSS).
 *
 * SEE: https://github.com/JoshBarr/js-media-queries (really, go look, lots of
 * useful documentation available).
 *
 * IMPORTANT: do not rename or move this file, or change the directory name!
 */

function moveCarletonLinkDown() {

  if (jQuery('#leaderboard-wrapper #block-menu-menu-leaderboard-left').length){
    jQuery('#block-menu-menu-leaderboard-left').hide()
    jQuery('#footer div.region div.region-inner').prepend(jQuery('#block-menu-menu-leaderboard-left'));
    jQuery('#block-menu-menu-leaderboard-left').show()  

  }

}

function moveCarletonLinkUp() {
  
  if (! jQuery('#leaderboard-wrapper #block-menu-menu-leaderboard-left').length){
    jQuery('#block-menu-menu-leaderboard-left').hide();
    jQuery('#leaderboard-wrapper div.container div.region div.region-inner').prepend(jQuery('#block-menu-menu-leaderboard-left'));
    jQuery('#block-menu-menu-leaderboard-left').show();
  }

}

function makeMenuLink() {
 
  if (! jQuery('#leaderboard-wrapper #menu-link').length){
    jQuery('#block-system-main-menu').hide();
    var menuImage = Drupal.settings.pathToTheme+"/images/menu.svg";
    jQuery('#leaderboard-wrapper div.container div.region div.region-inner').prepend("<img id=\"menu-link\" src=\""+menuImage+"\" class=\"inactive\"/>");
  }
}

function destroyMenuLink() {  
  jQuery('#block-system-main-menu').removeClass('accordion').show(); 
  jQuery('#menu-link').remove();

}

var queries = [
  // README! The following are examples, remove what you don't need!


  // Smartphone
  {
    context: ['smartphone_portrait', 'smartphone_landscape'],
    call_in_each_context: false,
    callback: function() {      
      makeMenuLink();
      console.log('smartphone');
    },
  },
  // portrait only
  {
    context: 'smartphone_portrait',
    callback: function() {
      moveCarletonLinkDown();
      // Debug
      console.log('smartphone portrait');
    }
  },
  // landscape only
  {
    context: 'smartphone_landscape',
    callback: function() {
      // Debug
      moveCarletonLinkUp();
      console.log('smartphone_landscape ');
    }
  },


  // Tablet
  {
    context: ['tablet_portrait', 'tablet_landscape'],
    call_in_each_context: false,
    callback: function() {
      moveCarletonLinkUp();      
      console.log('tablet');
    }
  },
  // portrait only
  {
    context: 'tablet_portrait',
    callback: function() {
      makeMenuLink();
      console.log('tablet_portrait');
    }
  },
  // landscape only
  {
    context: 'tablet_landscape',
    callback: function() {
      destroyMenuLink();
      // Debug
      console.log('tablet_landscape');
    }
  },


  // Standard desktop context
  {
    context: 'standard',
    callback: function() {
      moveCarletonLinkUp();     
      destroyMenuLink();
      console.log('standard desktop');
    }
  },
];

// Go!
MQ.init(queries);

//Here we start getting the menu working...
jQuery(document).ready(function($){
  
  $('body').delegate('#menu-link.inactive', 'hover', function(event){
    if( event.type === 'mouseenter' ){  
      var menuImage = Drupal.settings.pathToTheme+"/images/menu-hover.svg";
      $(this).addClass('hover');
      $(this).attr('src', menuImage);      
    }
    else {
      var menuImage = Drupal.settings.pathToTheme+"/images/menu.svg";
      $(this).removeClass('hover');
      $(this).attr('src', menuImage); 
    }
  });

  $('body').delegate('#menu-link.active', 'hover', function(event){
    if( event.type === 'mouseenter' ){  
      var menuImage = Drupal.settings.pathToTheme+"/images/menu-active-hover.svg";
      $(this).addClass('hover');
      $(this).attr('src', menuImage);      
    }
    else {
      var menuImage = Drupal.settings.pathToTheme+"/images/menu-active.svg";
      $(this).removeClass('hover');
      $(this).attr('src', menuImage); 
    }
  });

  $('body').delegate('#menu-link', 'click', function(event){
    if($(this).hasClass('active')){
      var menuImage = Drupal.settings.pathToTheme+"/images/menu.svg";
      $(this).attr('src', menuImage);
      $(this).removeClass('active');
      $(this).addClass('inactive');
      $(this).removeClass('hover');
      $('#block-system-main-menu').hide();
      $('#block-system-main-menu').removeClass('accordion');
    }
    else{
      var menuImage = Drupal.settings.pathToTheme+"/images/menu-active.svg";
      $(this).attr('src', menuImage); 
      $(this).addClass('active');
      $(this).removeClass('inactive');
      $(this).removeClass('hover');
      $('#block-system-main-menu').show();
      $('#block-system-main-menu').addClass('accordion');
    }
  });

});