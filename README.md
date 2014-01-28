# Drosophila - Carleton University Theme for Drupal 7

Based on the excellent [Adaptive Theme](https://drupal.org/project/adaptivetheme).

When completed, we hope this theme will be:

1. Responsive (useable on mobile and desktop devices)
2. Accessible
3. Beautiful 

##Requirements:

* [Adaptive Theme](https://drupal.org/project/adaptivetheme) version 7.x-3.1
* [DHTML Menus](https://drupal.org/project/dhtml_menu), with "No Collapsing" option selected, only for Main Menu. Add this patch: https://drupal.org/node/2044719 to line 31.
* [Nice Menus](https://drupal.org/project/nice_menus)

##Installation Instructions: 

1. Install Requirements.
3. Install Drosophila.
4. Set Site Slogan (if not already done).
5. Create the following menus:
  - Footer Menu
  - Leaderboard-Left
  - Secondary Menu
  - Secondary Menu to Hamburger
  - Secondary Menu To Leaderboard Left
6. Create and enable the following blocks:

  The following blocks be enabled and in the corresponding regions, in the correct order: 

  - Footer
   - Contact Us (this must be created manually)
   - Footer Menu 

  - Leaderboard 
   - Leaderboard-Left    
   - Main Menu (Nice menu)
   - Main menu   
  
  - Header
   - Secondary Menu To Leaderboard Left  
   - Secondary Menu to Hamburger 
   - Secondary Menu   
   - Search form 
  
  - Menu Bar
   - No blocks in this region
7. Create or import menu links. 

##Admin Menu

Compatable, ensure the "Adjust..." and "Keep Menu..." options are disabled in admin/config/administration/admin_menu

## Status Update - 2013/10/04

Image: ![Screenshot](http://i.imgur.com/PDJ9ddK.png?1)
