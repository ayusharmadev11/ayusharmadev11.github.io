jQuery(document).ready(function($) {
  "use strict";

  $('form.contactForm').submit(function(e) {
    e.preventDefault();

    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    $('.validation').html('').hide();

    f.children('input').each(function() {
      var i = $(this);
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(':', 0);
        var exp;
        if (pos >= 0) {
          exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Wrong input') : '')).show('blind');
      }
    });

    f.children('textarea').each(function() {
      var i = $(this);
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(':', 0);
        var exp;
        if (pos >= 0) {
          exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Wrong input') : '')).show('blind');
      }
    });

    if (ferror) return false;

    var form = $(this);
    var formData = form.serialize();

    $.ajax({
      type: "POST",
      url: "https://formspree.io/f/xeoanydd", // Replace with your Formspree form ID
      data: formData,
      dataType: "json",
      success: function(response) {
        $("#sendmessage").addClass("show").show();
        $("#errormessage").removeClass("show").hide();
        form.find("input, textarea").val("");
      },
      error: function(xhr, status, error) {
        $("#sendmessage").removeClass("show").hide();
        $("#errormessage").addClass("show").show();
        $("#errormessage").html("Failed to send message. Please try again.");
      }
    });

    return false;
  });
});