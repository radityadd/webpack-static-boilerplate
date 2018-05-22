/**
 * jQuery is not included as default. Please enable jQuery in config.js
 * if you wanna use jQuery.
 */

$(document).ready(function () {
  /* ================
   * Pivot Controller
   * ================ */
  var pivotDelay = 200, pivotEnterTimeout, pivotLeaveTimeout;
  var $overlay = $('.overlay');
  var $pivotContainer = $('.pivot-container');

  $('.pivot-button, .pivot-container').hover(function () {
    /* Dont display pivot if mouse enter < delay */
    clearTimeout(pivotLeaveTimeout);

    /* Setting delay on mouseenter */
    pivotEnterTimeout = setTimeout(function () {
      $pivotContainer.addClass('pivot-container--active');
      $overlay.show();
    }, pivotDelay);
  }, function () {
    /* Dont remove pivot if mouse leave < delay */
    clearTimeout(pivotEnterTimeout);

    /* Setting delay on mouseleave */
    pivotLeaveTimeout = setTimeout(function () {
      $pivotContainer.removeClass('pivot-container--active');
      $overlay.hide();
    }, pivotDelay);
  });
})