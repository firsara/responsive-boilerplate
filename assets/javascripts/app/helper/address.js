app.address = (function(window, document, $, self, undefined){

  var request = null;
  var initialized = false;

  if (! app.helper.supportsHistory()) return;

  self.ready = true;
  self.templateEngine = null;

  self.init = function(state, templateEngine){
    self.templateEngine = templateEngine;
    $.address.state(state).init(initialize).change(app.address.change);
  };

  var initialize = function(){
    self.bind();
  };

  self.bind = function(){
    $('a').each(function(){
      if ($(this).attr('data-bypass')) {
      } else {
        if ($(this).attr('target') === '_blank' || $(this).attr('href').indexOf('mailto') > 0) {
          // internal links
        } else {
          if (! $(this).attr('data-address-initialized')) {
            $(this).attr('data-address-initialized', 'true');
            $(this).address();
          }
        }
      }
    });
  };

  self.change = function(event){
    if (! initialized) {
      initialized = true;
      return;
    }

    if (event.path === '/') {
    }

    var page = $.address.state().replace(/^\/$/, '') + event.path;
    page = page.replace(/\/\//g, '/');
    page += (page.indexOf('?') === -1 ? '?' : '&') + '_=' + new Date().getTime();
    page += '&is_ajax=true';

    // Loads and populates the page data
    if (request) request.abort();

    window.setTimeout(function(){
      self.templateEngine.before();

      request = $.ajax({
        cache: false,
        type: 'GET',
        url: page,
        success: self.handler
      });
    }, 10);
  };

  self.handler = function(response){
    if (typeof response !== 'object') {
      try {
        response = $.parseJSON(response);
      } catch(e) {}
    }

    request = null;

    self.templateEngine.parse(response);
  }

  return self;

})(window, window.document, jQuery, {});