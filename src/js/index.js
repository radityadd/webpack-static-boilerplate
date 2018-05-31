/**
 * jQuery is not included as default. Please enable jQuery in config.js
 * if you wanna use jQuery.
 */

const isOnViewport = (element) => {
  const $elem = $(element);
  const $window = $(window);

  const windowTop = $window.scrollTop();
  const windowBottom = windowTop + $window.height();

  const elemTop = $elem.offset().top;
  const elemBottom = elemTop + $elem.height();

  return (elemTop >= windowTop) && (elemBottom <= windowBottom);
};

const initPivot = () => {
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
};

const gtmImpression = (dataLayer) => {
  $('[data-impression]:not(.viewed)').each(() => {
    if (isOnViewport($(this))) {
      dataLayer.push(JSON.parse($(this).attr('data-impression')));

      $(this).addClass('viewed');
    }
  });
};

const initGtmClickListener = (dataLayer) => {
  $('body').on('click', 'a[data-click]', (event) => {
    event.preventDefault();

    const gtmProps = JSON.parse($(this).attr('data-click'));
    const targetUrl = $(this).attr('href');

    gtmProps.eventCallback = () => {
      document.location = targetUrl;
    };

    dataLayer.push(gtmProps);
  });
};


$(document).ready(() => {
  const dataLayer = window.dataLayer || [];

  initPivot();
  initGtmClickListener();

  $(window).scroll(() => {
    gtmImpression(dataLayer);
  });

  document.querySelectorAll('#main-green')[0].addEventListener('click', (e) => {
    console.log(document.getElementById('main-btn').classList);
  });
});
