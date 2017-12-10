/**
 * Fixed header on the scroll event
 */
;(function () {
  'use strict';

  $(window).scroll(function () {
    fixingHeader($('#mainTitle'));
    fixingHeader($('.fixed-header-flag'));
  });

  function fixingHeader($selector) {
    var $header = $('#header');

    if ($selector.length === 0) return;

    var selectorOffsetTop = $selector.offset().top;

    if ($(window).scrollTop() >= selectorOffsetTop) {
      $header.addClass('fixed');
    }
    else {
      $header.removeClass('fixed');
    }
  }

}());