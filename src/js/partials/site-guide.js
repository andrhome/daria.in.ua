/**
 * Right site guide
 */
;(function() {
    'use strict';

    $(window).on('scroll', function () {
        setSiteGuide(1);
    });

    var $currentSection = $('#currentSection'),
        $sectionName = $('#sectionName'),
        $sectionsCount = $('#sectionCount'),
        $sections = $('.site-section'),
        count = $sections.length,
        firstSectionHeight = $($sections[0]).height();

    function setCurrentSectionNumber(number) {
        if (number < 10) {
            $currentSection.text('0' + number);
        } else {
            $currentSection.text(number);
        }
    }

    function setStateByFirsItem() {
        var name = $($sections[0]).data('name'),
            firstNumber = $($sections[0]).data('number');

        $currentSection.text('0' + firstNumber);
        $sectionName.text(name);
    }

    function setDefaultState() {

        if ($(window).scrollTop() > 0 && $(window).scrollTop() > firstSectionHeight) {
            $.each($sections, function(i, item) {
                var itemOffsetTop = $(item).offset().top;

                if (i + 1 < $sections.length) {
                    var nextItemOffsetTop = $($sections[i + 1]).offset().top;
                } else {
                    return;
                }

                if ( itemOffsetTop <= $(window).scrollTop() && nextItemOffsetTop > $(window).scrollTop() ) {
                    var name = $(item).data('name'),
                        firstNumber = $(item).data('number');

                    $currentSection.text('0' + firstNumber);
                    $sectionName.text(name);
                }
            });
        } else {
            setStateByFirsItem();
        }

        if (count < 10) {
            $sectionsCount.text('0' + $sections.length);
        } else {
            $sectionsCount.text($sections.length);
        }
    }
    setDefaultState();

    function setSiteGuide(i) {
        if ( $($sections[i]).offset() ) {
            var startPoint = $($sections[i]).offset().top - 250;

            if ($(window).scrollTop() > startPoint) {
                var sectionName = $($sections[i]).data('name'),
                    sectionNumber = $($sections[i]).data('number');

                setCurrentSectionNumber(sectionNumber);
                $sectionName.text(sectionName);

                setSiteGuide(i + 1);
            }
        }

        if ( $(window).scrollTop() < firstSectionHeight ) {
            setStateByFirsItem();
        }
    }

}());
