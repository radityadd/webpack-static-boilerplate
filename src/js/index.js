/**
 * jQuery is not included as default. Please enable jQuery in config.js
 * if you wanna use jQuery.
 */

if (typeof jQuery === 'undefined') {
  Object.prototype.rippleEffect = (e) => {
    let btn;
    let self;
    let ripple;
    let size;
    let rippleX;
    let rippleY;
    let eWidth;
    let eHeight;

    btn = e.hasOwnProperty('disabled') || e.classList.contains('disabled') ? false : e;

    btn.addEventListener('mousedown', (ev) => {
      self = e;
  
      // Disable right click
      if(e.button === 2) {
        return false;
      }

      let rippleFlag = 0;
      for(let i = 0; i < self.childNodes.length; i++) {
        if(self.childNodes[i].nodeType === Node.ELEMENT_NODE) {
          if(self.childNodes[i].matches('.ripple')) rippleFlag++;
        }
      }

      let spanEl;
      if(rippleFlag === 0) {
        let elChild = document.createElement('span');
        elChild.classList.add('ripple');
        self.insertBefore(elChild, self.firstChild);
        spanEl = elChild;
      }
      spanEl.classList.remove('animated');

      eWidth = self.getBoundingClientRect().width;
      eHeight = self.getBoundingClientRect().height;
      size = Math.max(eWidth, eHeight);

      spanEl.style.width = size+'px';
      spanEl.style.height = size+'px';

      rippleX = parseInt(ev.pageX - self.getBoundingClientRect().left) - (size / 2);
      rippleY = parseInt(ev.pageY - self.getBoundingClientRect().top) - (size / 2);

      spanEl.style.top = rippleY+'px';
      spanEl.style.left = rippleX+'px';
      spanEl.classList.add('animated');

      setTimeout(function() {
        spanEl.remove();
      }, 800);

    });
  };

  const rippleEl = document.querySelectorAll('.ripple-effect');
  for(let i = 0; i < rippleEl.length; i++) {
    rippleEl[i].rippleEffect(rippleEl[i]);
  }
  
}
else {
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
  
  const rippleFunc = function() {
    let btn;
    let self;
    let ripple;
    let size;
    let rippleX;
    let rippleY;
    let eWidth;
    let eHeight;
  
    btn = ($(this).not('[disabled], .disabled'));
  
    btn.on('mousedown', function(e) {
      self = $(this);
  
      // Disable right click
      if(e.button === 2) {
        return false;
      }
  
      if(self.find('.ripple').length === 0) {
        self.prepend('<span class="ripple"></span>');
      }
      ripple = self.find('.ripple');
      ripple.removeClass('animated');
  
      eWidth = self.outerWidth();
      eHeight = self.outerHeight();
      size = Math.max(eWidth, eHeight);
      ripple.css({'width': size, 'height': size});
  
      rippleX = parseInt(e.pageX - self.offset().left) - (size / 2);
      rippleY = parseInt(e.pageY - self.offset().top) - (size / 2);
  
      ripple.css({ 'top': rippleY +'px', 'left': rippleX +'px' }).addClass('animated');
  
      setTimeout(function() {
        ripple.remove();
      }, 800);
  
    });
  };
  
  $.fn.rippleEffect = rippleFunc;
  
  const initRipple = () => {
    $('.ripple-effect').rippleEffect();
  };
  
  $(document).ready(() => {
    const dataLayer = window.dataLayer || [];
  
    initPivot();
    initGtmClickListener();
    initRipple();
    // $('.ripple-effect').rippleEffect();
  
    $(window).scroll(() => {
      gtmImpression(dataLayer);
    });
  
    document.querySelectorAll('#main-green')[0].addEventListener('click', (e) => {
      console.log(document.getElementById('main-btn').classList);
    });
  });
}

