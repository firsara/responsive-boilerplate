app.template = {};

app.template.before = function(){
  $('body').find('*').unbind().off();
};

app.template.parse = function(data){
  var htmlString = data;
  var html = $(htmlString);
  
  $('body').html(html.find('body').html());

  app.global.initializeNewContent();
};
