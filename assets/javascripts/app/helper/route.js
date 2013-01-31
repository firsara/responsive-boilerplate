app.route = {};

app.route.init = function(basePath, structure, defaults){
  app.route.basePath = basePath;
  app.route.structure = structure;
  app.route.defaults = defaults;
  app.route.fetch();
};

app.route.fetch = function(){
  app.route.data = {};

  var url = window.location.href.toString().replace(app.route.basePath, '').replace('#/', '').replace(/\/\//gi, '/');
  url = url.split('/');

  var key, value, defaultValue;

  for (var i = 0, len = app.route.structure.length; i < len; i++) {
    key = app.route.structure[i];
    defaultValue = app.route.defaults[key];
    value = url[i];

    if (defaultValue == 'undefined' || defaultValue == null) {
      defaultValue = '';
    }

    if (value == 'undefined' || value == null || value == '') {
      value = defaultValue;
    }


    app.route.data[key] = value;
  }
};

app.route.get = function(key) {
  if (key == null || key == '') {
    var value = '';

    for (var i = 0, len = app.route.structure.length; i < len; i++) {
      key = app.route.structure[i];
      value = value + app.route.get(key) + '/';
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

  return app.route.data[key];
};


app.route.all = function(key) {
  return app.route.data;
};