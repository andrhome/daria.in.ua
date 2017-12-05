/**
 * Fixing header on the scroll event
 */
;(function() {
    'use strict';

    $(window).scroll(function () {
        fixingHeader();
    });

    function fixingHeader(){
        var $mainTitle = $('#mainTitle'),
            mainTitleOffsetTop = $mainTitle.offset().top;

        if ($(window).scrollTop() >= mainTitleOffsetTop) {
            $('#header').addClass('fixed');
        }
        else {
            $('#header').removeClass('fixed');
        }
    }

}());