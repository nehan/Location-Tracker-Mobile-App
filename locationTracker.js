var dist;

$(window).ready(function() {
	
  init();
  localStorage.setItem('prevDistant', -1.0);
});

function init(){
	var destination_address="1050 Benton street,Santa Clara, 95050";
	getUserDestinationLatLog(destination_address);
   
}
function getUserDestinationLatLog(destination_address){ 
var geocoder = new google.maps.Geocoder();
var destination=[];
geocoder.geocode( { 'address': destination_address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
               watchUserLocation(results[0].geometry.location.lat(), results[0].geometry.location.lng());
             }   

   });
 
}

function watchUserLocation(destLat,destLong){
  navigator.geolocation.watchPosition(function(position) {
   dist=calculateDistance(destLat, destLong,position.coords.latitude, position.coords.longitude);
  var str_prevDist = localStorage.getItem("prevDistant");
  prevDist = parseFloat(str_prevDist);
  if( prevDist == -1.0)
  {
     localStorage.setItem("prevDistant", dist);    
  }
   if(prevDist < 0.1 && dist >=0.1)
  {
      alert("You are moving away - so turning off Air Freshner");  
  }
  else if(prevDist > 0.5 && dist <=0.5)
  {
     alert("You are coming home - so turning on Air Freshner");  
  }
  localStorage.setItem("prevDistant", dist);
 
   
  });

}

function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}