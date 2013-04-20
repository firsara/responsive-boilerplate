app.helper = (function(window, document, $, self, undefined){

  self.scrollTo = function(pos, speed, holder){
    if (pos === null) return;
    if (! speed) speed = 0;

    if (holder) {
      return $(holder).animate({scrollTop: pos}, 1);
    }

    $('html, body').animate({scrollTop: pos}, speed);
  };

  self.getScrollTop = function(){
    var scrollable = $(window)._scrollable();
    return scrollable.scrollTop();
  };

  self.resizeFor = function(timeoutTime){
    var clearResizing = function(){
      clearInterval(intervalID);
      $(window).trigger('resize');
    };

    var triggerResize = function(){
      $(window).trigger('resize');
    };

    var intervalID = setInterval(triggerResize, 10);
    setTimeout(clearResizing, timeoutTime + 100);
  };


  self.isTouchDevice = function(){
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  };

  self.isRetina = function(){
    return window.devicePixelRatio > 1;
  };

  self.supportsHistory = function(){
    return (window.history.pushState !== undefined);
  };

  self.supportsTransitions = (function(){
    var v = ['ms', 'Khtml', 'O', 'Moz', 'Webkit', ''];
    // Tests for vendor specific prop
    while( v.length )
      if( v.pop() + 'Transition' in document.body.style ) return function(){ return true; };
    return function(){ return false; };
  })();

  self.url = function(url){
    if (! (app.address && app.address.ready && $.address)) {
      if (url.indexOf('http') < 0) {
        url = $('base').attr('href') + url;
      }

      window.location.href = url;
    } else {
      $.address.path(url);
    }
  };

  return self;

})(window, window.document, jQuery, {});