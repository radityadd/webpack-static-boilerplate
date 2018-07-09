/* ---------------------------
    Ripple Effect Native JS
--------------------------- */

Element.prototype.rippleEffect = function(e) {
    var self;
    var size;
    var spanEl;
    var rippleX;
    var rippleY;
    var offsetX;
    var offsetY;
    var eWidth;
    var eHeight;

    var btn = Object.prototype.hasOwnProperty.call(e, 'disabled') || e.classList.contains('disabled') ? false : e;

    btn.addEventListener('mousedown', function(ev) {
    self = e;
    // Disable right click
    if (e.button === 2) {
        return false;
    }

    var rippleFlag = 0;
    for (var i = 0; i < self.childNodes.length; i += 1) {
        if (self.childNodes[i].nodeType === Node.ELEMENT_NODE) {
        if (self.childNodes[i].matches('.ripple')) rippleFlag += 1;
        }
    }

    if (rippleFlag === 0) {
        var elChild = document.createElement('span');
        elChild.classList.add('ripple');
        self.insertBefore(elChild, self.firstChild);
    }
    spanEl = self.querySelectorAll('.ripple')[0];
    spanEl.classList.remove('animated');

    eWidth = self.getBoundingClientRect().width;
    eHeight = self.getBoundingClientRect().height;
    size = Math.max(eWidth, eHeight);

    spanEl.style.width = size+'px';
    spanEl.style.height = size+'px';

    offsetX = self.ownerDocument.defaultView.pageXOffset;
    offsetY = self.ownerDocument.defaultView.pageYOffset;

    rippleX = parseInt(ev.pageX - (self.getBoundingClientRect().left + offsetX), 10) - (size / 2);
    rippleY = parseInt(ev.pageY - (self.getBoundingClientRect().top + offsetY), 10) - (size / 2);

    spanEl.style.top = rippleY+'px';
    spanEl.style.left = rippleX+'px';
    spanEl.classList.add('animated');

    setTimeout(function() {
        spanEl.remove();
    }, 800);

    return ev;
    });
};

var rippleEl = document.querySelectorAll('.ripple-effect');
for (var i = 0; i < rippleEl.length; i += 1) {
    rippleEl[i].rippleEffect(rippleEl[i]);
}