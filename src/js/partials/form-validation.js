/**
 * Validation of contacts form
 */
;(function () {
  'use strict';

  var $feedbackForm = $('#feedbackForm');

  $feedbackForm.on('submit', function (e) {
    e.preventDefault();

    if (checkOnEmptyField($(this))) {
      if (checkEmail($(this))) {
        console.log('submit');
        sendForm($(this));
        clearFields($(this));
      }
    }
  });

  function checkOnEmptyField($form) {
    var $fields = $form.find('.form-field');
    var fieldCount = 0;

    $.each($fields, function (i, item) {
      if ($(item).val() === '') {
        $(item).parent().addClass('required-error');
        fieldCount -= 1;
      } else {
        fieldCount += 1;
      }
    });

    $fields.on('keypress', function () {
      $(this).parent().removeClass('required-error email-error');
    });

    if (fieldCount === $fields.length) {
      return true;
    }
  }

  function checkEmail($form) {
    var $emailField = $form.find('.form-field-email');
    var emailVal = $emailField.val();

    if ($emailField.length <= 0) return;

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(emailVal)) {
      $emailField.parent().addClass('email-error');
      return false;
    } else {
      $emailField.parent().removeClass('email-error');
      return true;
    }
  }

  function sendForm($form) {
    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: $form.serializeArray(),
      success: function (response) {
        console.log(response);
      }
    });
  }

  function clearFields($form) {
    var $fields = $form.find('.form-field');

    $.each($fields, function (i, item) {
      $(item).val('');
    });
  }


}());