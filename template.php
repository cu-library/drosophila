<?php

/**
 * @file
 * Process theme data.
 *
 * Use this file to run your theme specific implimentations of theme functions,
 * such preprocess, process, alters, and theme function overrides.
 *
 * Preprocess and process functions are used to modify or create variables for
 * templates and theme functions. They are a common theming tool in Drupal, often
 * used as an alternative to directly editing or adding code to templates. Its
 * worth spending some time to learn more about these functions - they are a
 * powerful way to easily modify the output of any template variable.
 * 
 * Preprocess and Process Functions SEE: http://drupal.org/node/254940#variables-processor
 * 1. Rename each function and instance of "drosophila" to match
 *    your subthemes name, e.g. if your theme name is "footheme" then the function
 *    name will be "footheme_preprocess_hook". Tip - you can search/replace
 *    on "drosophila".
 * 2. Uncomment the required function to use.
 */


/**
 * Preprocess variables for the html template.
 */
/* -- Delete this line to enable.
function drosophila_preprocess_html(&$vars) {
  global $theme_key;

  // Two examples of adding custom classes to the body.
  
  // Add a body class for the active theme name.
  // $vars['classes_array'][] = drupal_html_class($theme_key);

  // Browser/platform sniff - adds body classes such as ipad, webkit, chrome etc.
  // $vars['classes_array'][] = css_browser_selector();

}
// */


/**
 * Process variables for the html template.
 */
/* -- Delete this line if you want to use this function
function drosophila_process_html(&$vars) {
}
// */


/**
 * Override or insert variables for the page templates.
 */

function drosophila_preprocess_page(&$vars) {

  global $theme_key;
  $theme_name = $theme_key;

  // Set up logo element
  if (at_get_setting('toggle_logo', $theme_name) === 1) {
    $logo_path = file_create_url(drupal_get_path('theme', $theme_name) . '/logo.svg');
    $logo_alt = check_plain(variable_get('site_name', t('Site logo')));
    $logo_vars = array('path' => $logo_path, 'alt' => $logo_alt, 'attributes' => array('class' => 'site-logo'));
    $vars['logo_img'] = theme('image', $logo_vars);
    $vars['site_logo'] = $vars['logo_img'] ? l($vars['logo_img'], '<front>', array('attributes' => array('title' => t('Home page')), 'html' => TRUE)) : '';
  }

  // Javascript
  global $base_url;
  drupal_add_js('jQuery.extend(Drupal.settings, { "pathToTheme": "' . $base_url .'/'. path_to_theme() . '" });', 'inline');

}

function drosophila_process_page(&$vars) {

}



/**
 * Override or insert variables into the node templates.
 */
/* -- Delete this line if you want to use these functions
function drosophila_preprocess_node(&$vars) {
}
function drosophila_process_node(&$vars) {
}
// */


/**
 * Override or insert variables into the comment templates.
 */
/* -- Delete this line if you want to use these functions
function drosophila_preprocess_comment(&$vars) {
}
function drosophila_process_comment(&$vars) {
}
// */


/**
 * Override or insert variables into the block templates.
 */
function drosophila_preprocess_block(&$vars) {
  global $theme_key;
  global $user;
  $theme_name = $theme_key;

  // Block subject, under certain conditions, is not set
  $vars['tag'] = 'div';
  $vars['title'] = '';

  if (isset($vars['block']->subject)) {
    if (!empty($vars['block']->subject)) {
      // Generate the wrapper element, if there's a title use section
      $vars['tag'] = 'section';

      // Use a $title variable instead of $block->subject
      $vars['title'] = $vars['block']->subject;
    }
    // subject can be set and empty, i.e. using <none>
    else {
      $vars['classes_array'][] = 'no-title';
    }
  }
  // sometimes subject is not set at all
  else {
    $vars['classes_array'][] = 'no-title';
  }

  // Search is never a section, its just a div
  if ($vars['block_html_id'] == 'block-search-form') {
    $vars['tag'] = 'div';
  }

  // Block inner attributes
  $vars['block_inner_attributes_array']['class'][] = 'block-inner';
  $vars['block_inner_attributes_array']['class'][] = 'clearfix';

  // Use nav element for menu blocks and provide a suggestion for all of them
  $nav_blocks = array('navigation', 'main-menu', 'management', 'user-menu');
  if (in_array($vars['block']->delta, $nav_blocks)) {
    $vars['tag'] = 'nav';
    array_unshift($vars['theme_hook_suggestions'], 'block__menu');
  }

  $nav_modules = array('superfish', 'nice_menus', 'menu_block');
  if (in_array($vars['block']->module, $nav_modules)) {
    $vars['tag'] = 'nav';
    array_unshift($vars['theme_hook_suggestions'], 'block__menu');
  }

  $nav_modules = array('superfish', 'nice_menus', 'menu_block');
  if (in_array($vars['block']->module, $nav_modules)) {
    $vars['tag'] = 'nav';
    array_unshift($vars['theme_hook_suggestions'], 'block__menu');
  }

  // The menu bar region gets special treatment for the block template
  if ($vars['block']->region == 'menu_bar') {
    $vars['classes_array'][] = 'menu-wrapper';
    $vars['classes_array'][] = 'menu-bar-wrapper';
    $vars['classes_array'][] = 'clearfix';
    $vars['title_attributes_array']['class'][] = 'element-invisible';
  }

  // The menu bar region gets special treatment for the block template
  if (at_get_setting('enable_menu_toggle', $theme_name) == 1) {
    if (at_get_setting('menu_toggle_menu_bar', $theme_name) == 1) {
      if ($vars['block']->region == 'menu_bar') {
        $vars['classes_array'][] = 'at-menu-toggle';
      }
    }
    if (at_get_setting('menu_toggle_leaderboard', $theme_name) == 1 && $vars['block']->region == 'leaderboard') {
      $vars['classes_array'][] = 'at-menu-toggle';
      $vars['classes_array'][] = 'clearfix';
    }
    if (at_get_setting('menu_toggle_header', $theme_name) == 1 && $vars['block']->region == 'header') {
      $vars['classes_array'][] = 'at-menu-toggle';
      $vars['classes_array'][] = 'clearfix';
    }
  }

  // Add extra classes if required
  if (at_get_setting('extra_block_classes', $theme_name) == 1) {

    // Zebra
    $vars['classes_array'][] = $vars['block_zebra'];

    // Position?
    if ($vars['block_id'] == 1) {
      $vars['classes_array'][] = 'first';
    }
    if (isset($vars['block']->last_in_region)) {
      $vars['classes_array'][] = 'last';
    }

    // Count
    $vars['classes_array'][] = 'block-count-' . $vars['id'];

    // Region
    $vars['classes_array'][] = drupal_html_class('block-region-' . $vars['block']->region);

    // Delta
    $vars['classes_array'][] = drupal_html_class('block-' . $vars['block']->delta);
  }

  // Add classes to theme the horizontal block option
  if (at_get_setting('enable_extensions', $theme_name) == 1) {
    if (at_get_setting('enable_markup_overides', $theme_name) == 1) {
      // Change the user menu title to the user name.
      if (at_get_setting('user_block_user_name', $theme_name) == 1) {
        if ($vars['block']->module == 'system' && $vars['block']->delta == 'user-menu') {
          if (user_is_logged_in()) {
            $vars['title'] = check_plain($user->name);
          }
        }
      }
      // Horizontal block classes.
      if (at_get_setting('horizontal_login_block', $theme_name) == 1 && $vars['block']->module == 'user' && $vars['block']->delta == 'login') {
        $vars['classes_array'][] = 'lb-h';
        $vars['title_attributes_array']['class'][] = 'element-invisible';
      }
      if (at_get_setting('slider_login_block', $theme_name) == 1 && $vars['block']->module == 'user' && $vars['block']->delta == 'login') {
        $vars['classes_array'][] = 'lb-s';
      }
    }
  }

  // Give our block titles and content some additional class
  $vars['title_attributes_array']['class'][] = 'block-title';
  $vars['content_attributes_array']['class'] = array('block-content', 'content');

  // Support aria-describedby
  if ($vars['block']->subject && !empty($vars['attributes_array']['role'])) {
    $vars['title_attributes_array']['id'] = drupal_html_id($vars['block']->subject);
    $vars['attributes_array']['aria-describedby'] = $vars['title_attributes_array']['id'];
  }

  // Add Aria Roles via attributes
  switch ($vars['block']->module) {
    case 'system':
      switch ($vars['block']->delta) {
        case 'main':
          // Note: the "main" role goes in the page.tpl, not here.
          break;
        case 'help':
        case 'powered-by':
          $vars['attributes_array']['role'] = 'complementary';
          break;
        default:
          // Any other "system" block is a menu block.
          $vars['attributes_array']['role'] = 'navigation';
          break;
      }
      break;
    case 'menu':
    case 'menu_block':
    case 'blog':
    case 'book':
    case 'comment':
    case 'forum':
    case 'shortcut':
    case 'statistics':
      $vars['attributes_array']['role'] = 'navigation';
      break;
    case 'search':
      $vars['attributes_array']['role'] = 'search';
      break;
    case 'help':
    case 'aggregator':
    case 'locale':
    case 'poll':
    case 'profile':
      $vars['attributes_array']['role'] = 'complementary';
      break;
    case 'node':
      switch ($vars['block']->delta) {
        case 'syndicate':
          $vars['attributes_array']['role'] = 'complementary';
          break;
        case 'recent':
          $vars['attributes_array']['role'] = 'navigation';
          break;
      }
      break;
    case 'user':
      switch ($vars['block']->delta) {
        case 'login':
          $vars['attributes_array']['role'] = 'form';
          break;
        case 'new':
        case 'online':
          $vars['attributes_array']['role'] = 'complementary';
          break;
      }
      break;
  }
}

/*
function drosophila_process_block(&$vars) {
}
// */

function drosophila_preprocess_username(&$vars) {
  $vars['name'] = $vars['name_raw'];
}

function drosophila_admin_menu_output_alter(&$content) {
  $content['menu']['imce'] = array(
    "#title" => "File Browser",
    "#href" => "imce",
    "#weight" => -20,
    );
}
