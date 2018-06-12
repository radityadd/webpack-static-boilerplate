/**
 * jQuery is not included as default. Please enable jQuery in config.js
 * if you wanna use jQuery.
 */

/* ---------------------------
    Ripple Effect Native JS
--------------------------- */

Element.prototype.rippleEffect = (e) => {
  let self;
  let size;
  let spanEl;
  let rippleX;
  let rippleY;
  let offsetX;
  let offsetY;
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

    offsetX = self.ownerDocument.defaultView.pageXOffset;
    offsetY = self.ownerDocument.defaultView.pageYOffset;

    rippleX = parseInt(ev.pageX - (self.getBoundingClientRect().left + offsetX), 10) - (size / 2);
    rippleY = parseInt(ev.pageY - (self.getBoundingClientRect().top + offsetY), 10) - (size / 2);

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

const isOnViewport = (element) => {
  const windowTop = window.scrollY;
  const windowBottom = window.scrollY + window.innerHeight;

  const elemTop = element.offsetTop;
  const elemBottom = elemTop + element.offsetHeight;

  return (elemTop >= windowTop) && (elemBottom <= windowBottom);
};

const initPivot = () => {
  const pivotDelay = 200;
  const overlay = document.getElementsByClassName('overlay')[0];
  const pivotContainer = document.getElementsByClassName('pivot-container')[0];
  const pivotButton = document.querySelectorAll('.pivot-button, .pivot-container');

  let pivotEnterTimeout;
  let pivotLeaveTimeout;

  pivotButton.forEach((elem) => {
    elem.addEventListener('mouseenter', () => {
      clearTimeout(pivotLeaveTimeout);

      pivotEnterTimeout = setTimeout(() => {
        pivotContainer.classList.add('pivot-container--active');
        overlay.style.display = 'block';
      }, pivotDelay);
    });

    elem.addEventListener('mouseleave', () => {
      clearTimeout(pivotEnterTimeout);

      pivotLeaveTimeout = setTimeout(() => {
        pivotContainer.classList.remove('pivot-container--active');
        overlay.style.display = 'none';
      }, pivotDelay);
    });
  });
};

const gtmImpression = (dataLayer) => {
  const gtmElement = document.querySelectorAll('[data-impression]:not(.viewed)');

  gtmElement.forEach((elem) => {
    if (isOnViewport(elem)) {
      dataLayer.push(JSON.parse(elem.getAttribute('data-impression')));
      elem.classList.add('viewed');
    }
  });
};

const initGtmClickListener = (dataLayer) => {
  document.body.addEventListener('click', (event) => {
    if (event.target.matches('a[data-click]')) {
      const gtmProps = JSON.parse(event.target.getAttribute('data-click'));
      const targetUrl = event.target.getAttribute('href');

      gtmProps.eventCallback = () => {
        document.location = targetUrl;
      };

      dataLayer.push(gtmProps);
    }
  });
};

window.onload = () => {
  const dataLayer = window.dataLayer || [];

  initPivot();
  initGtmClickListener(dataLayer);

  gtmImpression(dataLayer);

  window.onscroll = () => {
    gtmImpression(dataLayer);
  };
};
