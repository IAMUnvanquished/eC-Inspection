/*Weather Functions*/
//alert('this gets loaded');
var onWeatherSuccess = function (position) {
        //alert("On weather success");
        console.log(position);
        var Latitude = position.coords.latitude;
        var Longitude = position.coords.longitude;
        console.log('the latitude and longitude is ',Latitude, Longitude);
        getWeather(Latitude, Longitude);
    }
    
    function getWeather(latitude, longitude) {
       
        // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
        var OpenWeatherAppKey = "4a2b3d1efe73d025200c73c8fc934cf7";
    
        var queryString =
            'http://api.openweathermap.org/data/2.5/weather?lat='
            + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=metric';
        console.log('the query string', queryString);
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var results = JSON.parse(xhttp.responseText);
                document.getElementById("weatherDisplay").innerHTML = results.main.temp + "&#8451";
            }
        };
        xhttp.open("GET", queryString, true);
        xhttp.send();
    }
    
    function showPosition(position) {
      //  alert("Show position");
        var latlon = position.coords.latitude + "," + position.coords.longitude;
    

        var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
            + latlon + "&zoom=14&size=400x300&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
        document.getElementById("latlon").innerHTML = "latitude: " + position.coords.latitude + 
        " longitude: " + position.coords.longitude;
        document.getElementById("locationMap").innerHTML = "<img src='" + img_url + "'>";

    }
    
    function showError(error) {
        alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }
    
    