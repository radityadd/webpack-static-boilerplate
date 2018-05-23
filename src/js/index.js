/**
 * jQuery is not included as default. Please enable jQuery in config.js
 * if you wanna use jQuery.
 */

$(document).ready(() => {
  /**
   * Pivot controller
   */
  const pivotDelay = 200;
  const $overlay = $('.overlay');
  const $pivotContainer = $('.pivot-container');

  let pivotEnterTimeout;
  let pivotLeaveTimeout;

  $('.pivot-button, .pivot-container').hover(() => {
    clearTimeout(pivotLeaveTimeout);

    pivotEnterTimeout = setTimeout(() => {
      $pivotContainer.addClass('pivot-container--active');
      $overlay.show();
    }, pivotDelay);
  }, () => {
    clearTimeout(pivotEnterTimeout);

    pivotLeaveTimeout = setTimeout(() => {
      $pivotContainer.removeClass('pivot-container--active');
      $overlay.hide();
    }, pivotDelay);
  });
});
