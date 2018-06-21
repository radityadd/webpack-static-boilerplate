/**
 * jQuery is not included as default. Please enable jQuery in config.js
 * if you wanna use jQuery.
 */
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
  return function( elem ) {
      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  };
});

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

  $('.unify-banner').height($('.unify-banner').width() * 0.0988023952);

  $('*[data-copy]').click(function(){
    var stringHTML = $(this).parent().html().replace('<div class="components-copy-btn" data-copy="">Copy Code</div>', '');
    $("#copy-code").val(stringHTML);
    $("#copy-code").select();
    document.execCommand("copy");
  });

  $('*[data-click-to-expand]').each(function(){
    $(this).css("cursor", "pointer");
  });
  
  $('*[data-click-to-expand]').each(function(){
    $(this).closest('.unify-card').find('*[data-expandable-view]').css({
      height: $(this).attr('data-click-to-expand'),
      overflowY: 'scroll',
    });
  });

  $('*[data-click-to-expand]').click(function(){
    $(this).closest('.unify-card').find('.expandable').slideToggle(100);
  });

  $('*[data-click-to-expand-button]').click(function(){
    if($(this).closest('.unify-card').find('.expandable').is(':hidden')){
      $(this).text('Collapse');
    }else{
      $(this).text('Expand');
    }
    $(this).closest('.unify-card').find('.expandable').slideToggle(100);
  });

  $('#error-input-example').on('input',function(){
    if($(this).val() != "") {
      $(this).attr('error','true');
      $(this).next().children().first().removeClass('unify-form-input--info__hidden');
      $(this).closest('.unify-form-input--container').find('.unify-form-input--label').addClass('unify-form-input--label__error');
    }else {
      $(this).removeAttr('error');
      $(this).next().children().first().addClass('unify-form-input--info__hidden');
      $(this).closest('.unify-form-input--container').find('.unify-form-input--label').removeClass('unify-form-input--label__error');
    }
  });

  if($('.unify-tab-tabs').length) {
    $('.unify-tab-thumb').each(function() {
      $(this).width($(this).siblings('.unify-tab').first().outerWidth());
    });

    $('.unify-tab').click(function() {
      $(this).closest('.unify-tab-tabs').find('.unify-tab').removeClass('unify-tab__active');
      $(this).addClass('unify-tab__active');
      const left = $(this).position().left;
      const width = $(this).outerWidth();
      const index = $(this).index();
      const contentWrapper = $(this).closest('.unify-tab--container').siblings('.unify-tab--content-wrapper');
      $(this).siblings('.unify-tab-thumb').css({'left': left, 'width': width});
      contentWrapper.height(contentWrapper.height());
      contentWrapper.children().fadeOut(150, function() {contentWrapper.css('height', 'auto');});
      contentWrapper.children().eq(index).css('paddingTop', 30);
      contentWrapper.children().eq(index).delay(150).animate({'opacity': 'show', 'paddingTop': 0}, 700);
    });
  }

  $('.unify-dropdown-container li').hover(function() {
    $(this).siblings('.dropdown-indicator').css({
      'top': $(this).position().top,
      'height': $(this).outerHeight()
    });
  });

  $('.unify-dropdown-container').on('click', 'li', function(event) {
    let value = $(this).text();
    $(this).closest('.unify-relative').find('input').val(value);
  });

  $('.unify-dropdown-container').mouseleave(function() {
    $(this).find('.dropdown-indicator').hide();
  });

  $('.unify-dropdown-container').mouseenter(function() {
    $(this).find('.dropdown-indicator').show();
  });

  $('*[dropdown-menu]').focus(function() {
    $(this).siblings('.unify-dropdown-container').slideDown({
      easing: 'easeOutBounce'
    });
    $(this).siblings('.unify-dropdown-container').find('ul li').css({'marginTop': 20, 'display': 'none'});
    // $(this).siblings('.unify-dropdown-container').find('ul li').animate({'opacity': 'show', 'marginTop': 0}, 200);
    let delay = 10;
    let v = 5;
    $(this).siblings('.unify-dropdown-container').find('ul li').each(function() {
      $(this).animate({'opacity': 'show', 'marginTop': 0}, 300);
      delay += v;
      v += 20;
    });
  });

  $('*[dropdown-menu]').on('input', function(){
    $(this).siblings('.unify-dropdown-container').find('li').hide();
    $(this).siblings('.unify-dropdown-container').find('li:contains('+$(this).val()+')').show();
  });

  $('*[dropdown-menu]').blur(function() {
    $(this).siblings('.unify-dropdown-container').delay(200).slideUp(200);
  });

})
