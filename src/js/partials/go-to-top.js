/**
 * Animation "Go to top"
 */
;(function () {
  'use strict';

  $('.go-to-top').each(function(){
    $(this).click(function(){

      $('html, body').animate({
        scrollTop: 0
      }, 'slow');

      return false;
    });
  });

}());