(function($, window, document, undefined){

// delegate resizing
var resizeTimeout;
var storeSize = {width: 0, height: 0};

var resize = function(){
  if (resizeTimeout) window.clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(triggerResize, 250);
};

var triggerResize = function(){
  if (resizeTimeout) window.clearTimeout(resizeTimeout);

  app.window = {
    width: $(window).width(),
    height: $(window).height()
  };

  app.document = {
    width: $(document).width(),
    height: $(document).height()
  };

  // only dispatch resize if it's not a "fake"-resizing
  // fix error on iphone
  if (app.window.width === storeSize.width && app.window.height === storeSize.height) {
    return false;
  }

  storeSize = app.window;

  app.global.resize();

  // fix css vw / vh value bugs
  $('body').slideUp(0);
  $('body').slideDown(0);

  if (app[app.is] && app[app.is].resize) {
    app[app.is].resize();
  }
};

$(window).resize(resize);
$(document).ready(resize);
$(window).load(function(){
  triggerResize();
});

window.setTimeout(resize, 350);


// Fix width bug on iPhone
$(window).bind('orientationchange', function(e) {
  $('body').slideUp(10);
  $('body').slideDown(10);
});


// Internet Explorer -> bug in enquire
if (typeof enquire === 'undefined') {
  app.desktop.setup();
  app.desktop.match();
  
  app.global.setup();
  app.global.match();

  return;
}


// initialize enquire and start firing events

for (var i = 0, length = app.breakpoints.length; i < length; i++) {

  var breakpoint = app.breakpoints[i];

  enquire.register(app[breakpoint].query, [
    {
      match: app[breakpoint].match,
      unmatch: app[breakpoint].unmatch,
      setup: app[breakpoint].setup
    },
    {
      match: app.global.match,
      unmatch: app.global.unmatch,
      setup: (i === 0 ? app.global.setup : null)
    }
  ]);
}

enquire.listen(100);

triggerResize();

})(jQuery, window, window.document);