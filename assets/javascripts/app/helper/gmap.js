// google-maps helper functions
app.helper.gmap = {};
app.helper.gmap.maps = [];
app.helper.gmap.MIN_ZOOM = 12;

app.helper.gmap.load = function(){
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=app.helper.gmap.loaded";
  document.body.appendChild(script);
};

app.helper.gmap.loaded = function(){
  app.helper.gmap.ready = true;
  app.helper.gmap.init();
};

app.helper.gmap.init = function(){
  if (! app.helper.gmap.ready) return;

  var id = 0;

  $('.gmap').each(function(){
    $(this).find('.gmap-inner').append($('<div class="gmap-canvas" id="gmap-dynamic'+id+'"></div>'));
    $(this).attr('data-gmap-id', id);

    var markerImage = "assets/images/gmap-marker.png";
    if ($(this).attr('data-marker')) markerImage = $(this).attr('data-marker');
    
    var mapOptions = {
      center: null,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('gmap-dynamic'+id), mapOptions);

    if ($(this).attr('data-locations')) {
      var latLngList = new Array();
      var bounds = new google.maps.LatLngBounds();
      var locations = $.parseJSON($(this).attr('data-locations'));

      for (var i = 0; i < locations.length; i++) {
        var myLatlng = new google.maps.LatLng(locations[i].lat, locations[i].lng);

        latLngList.push(myLatlng);
        bounds.extend(myLatlng);

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          icon: markerImage
        });

        if (locations[i].link) {
          app.helper.gmap.addLink(marker, locations[i].link);
        }

        if (locations[i].detail) {
          app.helper.gmap.addDetail(map, marker, locations[i].detail);
        }

        directionsDisplay.setMap(map);
      }

      map.fitBounds(bounds);

      if (locations.length <= 1) {
        app.helper.gmap.zoom(map, app.helper.gmap.MIN_ZOOM);
      }
    }

    // store map options
    var storedMap = {};
    storedMap.map = map;
    storedMap.bounds = bounds;
    storedMap.locations = locations;
    storedMap.options = mapOptions;
    storedMap.directionsService = directionsService;
    storedMap.directionsDisplay = directionsDisplay;

    app.helper.gmap.maps[id] = storedMap;

    id++;
  });
};

app.helper.gmap.addLink = function(marker, url){
  google.maps.event.addListener(marker, 'click', function() {
    window.location.href = url;
  });
};

app.helper.gmap.addDetail = function(map, marker, detail){
  google.maps.event.addListener(marker, 'click', function() {
    var infoWindow = new google.maps.InfoWindow({
      maxWidth: 600,
      content: detail
    }).open(map, marker);
  });
};

app.helper.gmap.resize = function(){
  var i, map, len;
  for (i = 0, len = app.helper.gmap.maps.length; i < len; i++) {
    map = app.helper.gmap.maps[i].map;
    google.maps.event.trigger(map, 'resize');
  }
};

app.helper.gmap.center = function(){
  var i, map, len;
  for (i = 0, len = app.helper.gmap.maps.length; i < len; i++) {
    map = app.helper.gmap.maps[i].map;

    if (app.helper.gmap.maps[i].bounds) {
      map.fitBounds(app.helper.gmap.maps[i].bounds);

      if (app.helper.gmap.maps[i].locations.length <= 1) {
        app.helper.gmap.zoom(map, app.helper.gmap.MIN_ZOOM);
      }
    }
  }
};


app.helper.gmap.zoom = function(map, zoom){
  var listener = google.maps.event.addListener(map, "idle", function() { 
    if (map.getZoom() > zoom) map.setZoom(zoom);
    google.maps.event.removeListener(listener); 
  });
};


app.helper.gmap.fit = function(mapID, latLng){
  var index = parseFloat( mapID.replace('gmap-dynamic', '') );
  var data = app.helper.gmap.maps[index];
  var map = data.map;

  var bounds = new google.maps.LatLngBounds();
  bounds.extend(latLng);
  map.fitBounds(bounds);

  app.helper.gmap.zoom(map, app.helper.gmap.MIN_ZOOM);
};