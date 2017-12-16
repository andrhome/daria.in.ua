/**
 * Validation of contacts form
 */
;(function () {
  'use strict';

  var $feedbackForm = $('#feedbackForm');
  var fbFormEmptyIsValid = false;
  var fbFormEmailIsValid = false;

  $feedbackForm.on('submit', function (e) {
    e.preventDefault();

    checkOnEmptyField($(this));
    checkEmail($(this));

    if (fbFormEmptyIsValid && fbFormEmailIsValid) {
      sendForm($(this));
    }
  });

  function checkOnEmptyField($form) {
    var $fields = $form.find('.form-field');

    $.each($fields, function (i, item) {
      if ($(item).val() === '') {
        $(item).parent().addClass('required-error');
        fbFormEmptyIsValid = false;
      }
    });

    $fields.on('keypress', function () {
      $(this).parent().removeClass('required-error email-error');
      fbFormEmptyIsValid = true;
    });

  }

  function checkEmail($form) {
    var $emailField = $form.find('.form-field-email'),
      emailVal = $emailField.val();

    if ($emailField.length <= 0) return;

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(emailVal)) {
      $emailField.parent().addClass('email-error');
      fbFormEmailIsValid = false;
    } else {
      $emailField.parent().removeClass('email-error');
      fbFormEmailIsValid = true;
    }
  }

  function sendForm($form) {
    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: $form.serialize(),
      success: function (response) {
        console.log(response);
      }
    });
  }

}());