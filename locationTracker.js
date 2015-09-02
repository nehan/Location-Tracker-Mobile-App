$(window).ready(function() {
	
  init();
});

function init(){
	getUserCurrentLocation();
	 //var lat1=37.3496015,lon1=-121.94556539999998,lat2=37.3496154,lon2=-121.9455874;
	//d=calculateDistance(lat1, lon1, lat2, lon2);
	//alert("distance is"+d);
}

function showError(error) {
    alert("Error in geolocation :- "+error.message);
}

function showLocation(pos) {
   var current_location = {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude
    };
	alert("Current Location is  - "+current_location.latitude+"Long is "+current_location.longitude);
	$(".location_alert").html(current_location.latitude+","+current_location.longitude);
	var destination="1050 Benton Street, Apt 3211 , Santa Clara, 95050";
    calculateDistance(current_location.latitude,current_location.longitude,destination);	
	watchPosition(pos);
}
function watchPosition(startPos)
{
	//alert("In watch position");
	navigator.geolocation.watchPosition(function(position) {
	alert("Start position is - "+position.coords.latitude+","+position.coords.longitude);
	var dist=calculateDistance(startPos.coords.latitude, startPos.coords.longitude,position.coords.latitude, position.coords.longitude);
     $(".new_position").html(position.coords.latitude+","+ position.coords.longitude);					
	 $("#travelled_distance").html(calculateDistance(startPos.coords.latitude, startPos.coords.longitude,
                        position.coords.latitude, position.coords.longitude));					
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

function getUserCurrentLocation(){
	 if (navigator.geolocation) {
        var options = {
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(showLocation, showError, options);
    } else {
        showError();
    }
}

function calculateDistance_gmap(current_lat, current_long,destination)
{

        var self=this;
        var origin=[];
        origin.push(new google.maps.LatLng(current_lat,current_long));
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': destination}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var destination=[];
                destination.push(results[0].geometry.location);
                var service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix(
                    {
                        origins:origin ,
                        destinations:destination ,
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                        durationInTraffic: true,
                        avoidHighways: false,
                        avoidTolls: false
                    },function distance_callback(response, status){
                        var distance;
                        if (status === google.maps.DistanceMatrixStatus.OK) {
                            var origins = response.originAddresses;
                            for (var i = 0; i < origins.length; i++) {
                                var results = response.rows[i].elements;
                                for (var j = 0; j < results.length; j++) {
                                    var element = results[j];
								    distance = element.distance.value/1560;
                                    var duration = element.duration.value/60;
									alert("Distance is - "+element.duration.value);
									alert("Duration is  - "+ duration);
									//$(".location_alert").html(distance);
                                }
                            }
                        }
                    });

                    

            }
        });
}

