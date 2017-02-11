function fun() {
    return "4 people";
}

/*
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Dam";
    }
}
*/
var path = [[40.446022, -79.942693], [40.446014, -79.942827], [40.446110, -79.942824], [40.446096, -79.942695]];

var alex_room = GMaps.prototype.drawPolygon({
    paths: path, // pre-defined polygon shape
    strokeColor: '#BBD8E9',
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: '#BBD8E9',
    fillOpacity: 0.6
});

function getLat() {
    var output = document.getElementById("alex_room");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;

        output.innerHTML = latitude;
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function getLong() {
    var output = document.getElementById("alex_room_pop");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var longitude = position.coords.longitude;

        output.innerHTML = longitude;
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function getLongi() {
    var long = parseFloat(document.getElementById("alex_room_pop").innerHTML);
    getLong();
    return long;
}

function getLati() {
    var lat = parseFloat(document.getElementById("alex_room").innerHTML);
    getLat();
    return lat;
}

function geoFindMe() {
    var output = document.getElementById("alex_room_pop");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        var img = new Image();
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

        output.appendChild(img);
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
}

function check() {
    var lat = getLati();
    var long = getLongi();
    var sum = 0.0;
    var path = [[40.446022, -79.942693],
                [40.446014, -79.942827],
                [40.446110, -79.942824],
                [40.446096, -79.942695]];

    var area = Math.abs(path[0][0]*path[1][1] + path[1][0]*path[2][1] + path[2][0]*path[3][1] + path[3][0]*path[0][1] -
                path[1][0]*path[0][1] - path[2][0]*path[1][1] - path[3][0]*path[2][1] - path[0][0]*path[3][1]) / 2
    for (var i = 0; i < 3; i++) {       
        sum = sum + Math.abs((lat - path[i + 1][0]) * (path[i][1] - long) - (lat - path[i][0]) * (path[i + 1][1] - long)) / 2;
    }
    sum = sum + Math.abs((lat - path[0][0])*(path[3][1] - long) - (lat - [3][0])*(path[0][1] - long));
   
    if (sum <= area) {
        document.getElementById("joseph_room_pop").innerHTML = 1;
        alert("true");
        return true;
    }
    else if (sum > area) {
        document.getElementById("joseph_room_pop").innerHTML = 0;
        alert("false");
        return false;
    }
}

check();
var intervalID = setInterval(function(){check();}, 120000);
