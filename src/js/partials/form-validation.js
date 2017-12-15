/**
 * Validation of contacts form
 */
;(function () {
  'use strict';

  var $feedbackForm = $('#feedbackForm');

  $feedbackForm.on('submit', validation.bind($feedbackForm));

  function validation($form, e) {
    e.preventDefault();
    onRequiredFields($form);
  }

  function onRequiredFields($form) {
    var $fields = $form.find('.form-field');

    $.each($fields, function (i, item) {
      if (item.val() === '') {
        item.addClass('required-error');
        item.next().show();
      }
    });

    $fields.on('keypress', function () {
      console.log('keypress');
      $(this).removeClass('required-error');
      $(this).parent().find('.required-message').hide();
    });

  }

}());