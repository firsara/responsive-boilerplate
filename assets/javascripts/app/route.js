app.route = (function(window, document, $, self, undefined){

  self.init = function(basePath, structure, defaults){
    self.basePath = basePath;
    self.structure = structure;
    self.defaults = defaults;
    self.fetch();
  };

  self.fetch = function(){
    self.data = {};

    var url = window.location.href.toString().replace(self.basePath, '').replace('#/', '').replace(/\/\//gi, '/');
    url = url.split('/');

    var key, value, defaultValue;

    for (var i = 0, len = self.structure.length; i < len; i++) {
      key = self.structure[i];
      defaultValue = self.defaults[key];
      value = url[i];

      if (defaultValue == 'undefined' || defaultValue == null) {
        defaultValue = '';
      }

      if (value == 'undefined' || value == null || value == '') {
        value = defaultValue;
      }


      self.data[key] = value;
    }
  };

  self.get = function(key) {
    if (key == null || key == '') {
      var value = '';

      for (var i = 0, len = self.structure.length; i < len; i++) {
        key = self.structure[i];
        value = value + self.get(key) + '/';
      }

      var valid = false;
      var lastChar = '';

      do {
        lastChar = value.substring(value.length - 1);

        if (lastChar === '/') {
          valid = false;
          value = value.substring(0, value.length - 1);
        } else {
          valid = true;
        }
      } while (! valid);

      return value;
    }

    return self.data[key];
  };


  self.all = function(key) {
    return self.data;
  };

  return self;

})(window, window.document, jQuery, {});