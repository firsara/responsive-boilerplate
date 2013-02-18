var app = {};

app.wide = {};
app.desktop = {};
app.tablet = {};
app.mobile = {};
app.global = {};

app.breakpoints = ['desktop', 'wide', 'tablet', 'mobile'];

app.wide.query = 'screen and (min-width: 1210px)';
app.desktop.query = 'screen and (min-width: 980px) and (max-width: 1209px)';
app.tablet.query = 'screen and (min-width: 768px) and (max-width: 979px)';
app.mobile.query = 'screen and (max-width: 767px)';