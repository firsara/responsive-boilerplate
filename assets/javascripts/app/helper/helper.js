app.helper = {};

app.helper.scrollTo = function(pos, speed, holder){
  if (pos === null) return;
  if (! speed) speed = 0;

  if (holder) {
    return $(holder).animate({scrollTop: pos}, 1);
  }

  $('html, body').animate({scrollTop: pos}, speed);
};

app.helper.resizeFor = function(timeoutTime){
  var intervalID = window.setInterval(function(){
    $(window).trigger('resize');
  }, 10);

  window.setTimeout(function(){
    window.clearInterval(intervalID);
    $(window).trigger('resize');
  }, timeoutTime + 100);
};


app.helper.isTouchDevice = function(){
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
};

app.helper.isRetina = function(){
  return window.devicePixelRatio > 1;
};

app.helper.supportsHistory = function(){
  return (window.history.pushState !== undefined);
};

app.helper.supportsTransitions = function(){
  if (! app.helper.supportsTransitionsVar) {
    app.helper.supportsTransitionsVar = (function() {
      var v = ['ms', 'Khtml', 'O', 'Moz', 'Webkit', ''];
      // Tests for vendor specific prop
      while( v.length )
        if( v.pop() + 'Transition' in document.body.style ) return true;
      return false;
    })();
  }

  return app.helper.supportsTransitionsVar;
};

app.helper.url = function(url){
  if (! (app.address && app.address.ready)) {
    if (url.indexOf('http') < 0) {
      url = $('base').attr('href') + url;
    }

    window.location.href = url;
  } else {
    $.address.path(url);
  }
};