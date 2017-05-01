
L.mapbox.accessToken = 'pk.eyJ1IjoiZWRvc2FudGlsbGFuYSIsImEiOiJjajFuYmRkYTQwMGV0MzJwamZpYXUzNnBvIn0.PUCQRbnNUJqi0FDCUqo9_A';

var map = L.mapbox.map('map', 'mapbox.light').setView([0, 0], 2);

function moveISS () {
  $.getJSON('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
      var lat = data['latitude'];
      var lon = data['longitude'];
      var alt = data['altitude'];
      var vel = data['velocity'];
      $('#latitud').html(lat.toString());
      $('#longitud').html(lon.toString());
      $('#altitud').html(alt.toString() + ' km');
      $('#velocidad').html(vel.toString() + ' km/h');
      iss.setLatLng([lat, lon]);
      isscirc.setLatLng([lat, lon]);
      map.panTo([lat, lon], animate=true);
    });
    setTimeout(moveISS, 3000);
}

function almeria() {
  $.getJSON('http://api.open-notify.org/iss-pass.json?lat=36.84&lon=-2.46&alt=20&n=3&callback=?', function(data) {
    data['response'].forEach(function (d) {
        var date = new Date(d['risetime']*1000);
         $('#isspass').append(date.toString() + '<br />');
    });
  });
}

var ISSIcon = L.icon({
    iconUrl: 'https://edosantillana.github.io/iss-data/img/ISSIcon.png',
    iconSize: [50, 30]
});

var iss = L.marker([0, 0], {icon: ISSIcon}).addTo(map);
var isscirc = L.circle([0,0], 2200e3, {color: "#333", opacity: 0.3, weight:1, fillColor: "#333", fillOpacity: 0.1}).addTo(map);

moveISS();
almeria();
