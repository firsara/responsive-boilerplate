if (app.route) {
  app.route.init(jQuery('base').attr('href'), ['language', 'controller', 'action', 'id'], {language: 'de'});
}

if (app.address && app.helper.supportsHistory()) {
  app.address.init(jQuery('[data-state]').attr('data-state'), app.template);
}

if (app.helper) {
  jQuery('html').addClass(app.helper.isTouchDevice() ? 'touch' : 'no-touch');
  jQuery('html').addClass(app.helper.supportsHistory() ? 'history' : 'no-history');
  jQuery('html').addClass(app.helper.supportsTransitions() ? 'transitions' : 'no-transitions');
}

if (jQuery.client) {
  jQuery('html').addClass('browser-'+jQuery.client.browser.toLowerCase());
  jQuery('html').addClass('os-'+jQuery.client.os.toLowerCase());
}