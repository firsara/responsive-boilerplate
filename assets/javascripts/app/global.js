app.global.resize = function(){
};

app.global.setup = function(){
};

app.global.match = function(){
  console.log('match: ' + app.is);

  // Adjust Grid-Layout based on data-attribute
  $('[data-span-'+app.is+']').each(function(){
    $(this).removeClass('span0 span1 span2 span3 span4 span5 span6 span7 span8 span9 span10 span11 span12');
    $(this).addClass('span' + $(this).attr('data-span-'+app.is).replace('span', ''));
  });

  // dynamically add classes based on data-attribute
  $('[data-classes-'+app.is+']').each(function(){
    $(this).addClass($(this).attr('data-classes-'+app.is));
  });
};

app.global.unmatch = function(){
  console.log('unmatch: ' + app.was);
  
  // dynamically remove classes based on data-attribute
  $('[data-classes-'+app.was+']').each(function(){
    $(this).removeClass($(this).attr('data-classes-'+app.was));
  });
};