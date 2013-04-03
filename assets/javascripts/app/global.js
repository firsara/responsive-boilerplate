app.global.resize = function(){
};

app.global.setup = function(){
  $('[data-span-desktop]').each(function(){
    if (! $(this).attr('data-span-wide')) {
      $(this).attr('data-span-wide', $(this).attr('data-span-desktop'));
    }
  });
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

  $('[data-breakpoint-'+app.is+']').each(function(){
    $(this).remove().insertAfter($($(this).attr('data-breakpoint-'+app.is)));
  });
};

app.global.unmatch = function(){
  console.log('unmatch: ' + app.was);
  
  // dynamically remove classes based on data-attribute
  $('[data-classes-'+app.was+']').each(function(){
    $(this).removeClass($(this).attr('data-classes-'+app.was));
  });
};



app.global.ajaxComplete = function(e, xhr, settings){
  setTimeout(app.global.initializeNewContent, 250);
};

app.global.initializeNewContent = function(){
  $('*').unbind().off();
  $('.dynamic-input').remove();
  app.global.setup();
  app.global.match();
  app[app.is].match();

  $(window).trigger('resize');
  app.global.resize();
  app[app.is].resize();
};