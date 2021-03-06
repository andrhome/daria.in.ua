/**
 * Project background animation
 */
;(function() {
  'use strict';

  var $projects = $('.project');
  var $projectPage = $('.project-page');

  if ($projectPage.length > 0) return;

  $projects.on('mouseover', function () {
    var $this = $(this);

    setTimeout(function () {
      $this.find('.project__bg').fadeIn(500);
    }, 100);

    $(this).find('.project__canvas').css({
      boxShadow: 'none',
      background: 'none'
    });
  }).on('mouseleave', function () {
    var $this = $(this);

    function animate(boxShadowColor, bgColor) {
      $this.find('.project__canvas').css({
        boxShadow: '0 0 13px 1px ' + boxShadowColor,
        backgroundColor: bgColor
      });
    }

    setTimeout(function () {
      $this.find('.project__bg').fadeOut(500);
    }, 100);

    setTimeout(function () {
      if ($this.hasClass('project-zernobot')) {
        animate('#08171c', '#194957');
      }

      if ($this.hasClass('project-logbook')) {
        animate('#f2f2f2', '#f2f2f2');
      }

      if ($this.hasClass('project-street-quests')) {
        animate('#060606', '#2c2c2c');
      }
    }, 500)
  });

}());
