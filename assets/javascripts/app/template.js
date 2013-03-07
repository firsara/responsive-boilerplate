app.template = {};

app.template.before = function(){
  $('body').find('*').unbind().off();
};

app.template.parse = function(data){
  var htmlString = data;
  var html = $(htmlString);
  
  $('body').html(html.find('body').html());

  $('.dynamic-input').remove();
  app.global.setup();
  app.global.match();
  app[app.is].match();

  $(window).trigger('resize');
  app.global.resize();
  app[app.is].resize();
};
