/**
 * jQuery is not included as default. Please enable jQuery in config.js
 * if you wanna use jQuery.
 */

if (typeof jQuery === 'undefined') {
  // No Jquery
} else {
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
}

/* ---------------------------
    Ripple Effect Native JS
--------------------------- */

Element.prototype.rippleEffect = (e) => {
  let self;
  let size;
  let spanEl;
  let rippleX;
  let rippleY;
  let eWidth;
  let eHeight;

  const btn = Object.prototype.hasOwnProperty.call(e, 'disabled') || e.classList.contains('disabled') ? false : e;

  btn.addEventListener('mousedown', (ev) => {
    self = e;
    // Disable right click
    if (e.button === 2) {
      return false;
    }

    let rippleFlag = 0;
    for (let i = 0; i < self.childNodes.length; i += 1) {
      if (self.childNodes[i].nodeType === Node.ELEMENT_NODE) {
        if (self.childNodes[i].matches('.ripple')) rippleFlag += 1;
      }
    }

    if (rippleFlag === 0) {
      const elChild = document.createElement('span');
      elChild.classList.add('ripple');
      self.insertBefore(elChild, self.firstChild);
    }
    [spanEl] = self.querySelectorAll('.ripple');
    spanEl.classList.remove('animated');

    eWidth = self.getBoundingClientRect().width;
    eHeight = self.getBoundingClientRect().height;
    size = Math.max(eWidth, eHeight);

    spanEl.style.width = `${size}px`;
    spanEl.style.height = `${size}px`;

    rippleX = parseInt(ev.pageX - self.getBoundingClientRect().left, 10) - (size / 2);
    rippleY = parseInt(ev.pageY - self.getBoundingClientRect().top, 10) - (size / 2);

    spanEl.style.top = `${rippleY}px`;
    spanEl.style.left = `${rippleX}px`;
    spanEl.classList.add('animated');

    setTimeout(() => {
      spanEl.remove();
    }, 800);

    return ev;
  });
};

const rippleEl = document.querySelectorAll('.ripple-effect');
for (let i = 0; i < rippleEl.length; i += 1) {
  rippleEl[i].rippleEffect(rippleEl[i]);
}

