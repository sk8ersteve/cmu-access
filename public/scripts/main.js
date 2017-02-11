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
    var lng = parseFloat(document.getElementById("alex_room_pop").innerHTML);
    getLong();
    return lng;
}

function getLati() {
    var lat = document.getElementById("alex_room").innerHTML;
    getLat();
    //document.getElementById("alex_room").innerHTML = "Latitude: " + lat;
    return parseFloat(lat);
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

function check(path) {
    var lat = getLati();
    var long = getLongi();
    var sum = 0.0;
    //var path = [[40.446022, -79.942693],
    //            [40.446014, -79.942827],
    //            [40.446110, -79.942824],
    //            [40.446096, -79.942695]];

    var area = Math.abs(path[0][0] * path[1][1] + path[1][0] * path[2][1] + path[2][0] * path[3][1] + path[3][0] * path[0][1] -
                path[1][0] * path[0][1] - path[2][0] * path[1][1] - path[3][0] * path[2][1] - path[0][0] * path[3][1]) / 2
    for (var i = 0; i < 3; i++) {
        sum = sum + Math.abs((lat - path[i + 1][0]) * (path[i][1] - long) - (lat - path[i][0]) * (path[i + 1][1] - long)) / 2;
    }
<<<<<<< Updated upstream
    sum = sum + Math.abs((lat - path[0][0]) * (path[3][1] - long) - (lat - [3][0]) * (path[0][1] - long));

=======
    sum = sum + Math.abs((lat - path[0][0])*(path[3][1] - long) - (lat - [3][0])*(path[0][1] - long));
>>>>>>> Stashed changes
    if (sum <= area) {
        //document.getElementById("joseph_room_pop").innerHTML = 1;
        //alert("true");
        return true;
    }
    else if (sum > area) {
        //document.getElementById("joseph_room_pop").innerHTML = 0;
        //alert("false");
        return false;
    }
}

function restaurants() {
    var inoodle = [[40.443215, -79.945262], [40.443291, -79.945639], [40.443420, -79.945586], [40.443357, -79.945212]];
    var rothberg = [[40.442275, -79.946124], [40.442515, -79.946048], [40.442558, -79.946240], [40.442336, -79.946359]];
    var maggie = [[40.441232, -79.943617], [40.441174, -79.943357], [40.441073, -79.943396], [40.441118, -79.943609]];
    var zebra = [[40.441723, -79.942816], [40.441733, -79.942867], [40.441589, -79.942912], [40.441588, -79.942857]];
    var exchange = [[40.441506, -79.941976], [40.441484, -79.941889], [40.441321, -79.941959], [40.441321, -79.941959]];
    var cafe = [[40.442635, -79.939722], [40.442365, -79.939840], [40.442343, -79.939642], [40.442600, -79.939580]];
    var servery = [[40.442415, -79.939919], [40.442528, -79.939892], [40.442602, -79.940244], [40.442499, -79.940281]];
    var pavillion = [[40.442751, -79.940255], [40.442657, -79.939868], [40.442555, -79.939897], [40.442642, -79.940295]];
    var schatz = [[40.443247, -79.942610], [40.443013, -79.942695], [40.442987, -79.942494], [40.443179, -79.942419]];
    var abp = [[40.444112, -79.942097], [40.444154, -79.942270], [40.443932, -79.942352], [40.443902, -79.942165]];
    var gallo = [[40.443048, -79.941964], [40.443075, -79.942169], [40.443207, -79.942115], [40.443174, -79.941922]];
    var uccafe = [[40.443207, -79.942115], [40.443174, -79.941922], [40.443278, -79.941797], [40.443329, -79.942002]];
    var underground = [[40.445373, -79.943264], [40.445432, -79.943458], [40.445241, -79.943573], [40.445191, -79.943425]];
    var laprima = [[40.442542, -79.945850], [40.442678, -79.945805], [40.442706, -79.945954], [40.442596, -79.945993]];
    var heinz = [[40.444273, -79.945369], [40.444111, -79.945443], [40.444111, -79.945641], [40.444242, -79.945756]];
    var tazza = [[40.443396, -79.944354], [40.443263, -79.944396], [40.443327, -79.944787], [40.443474, -79.944715]];
    var gingers = [[40.441148, -79.944440], [40.441208, -79.944410], [40.441222, -79.944495], [40.441169, -79.944510]];
    
    //alert("yes");

    var restaurant = [inoodle, rothberg, maggie, zebra, exchange, cafe, servery, pavillion, schatz, abp, gallo, uccafe, underground,
                        laprima, heinz, tazza, gingers];

    //alert(restaurant[0]);

    for (var i = 0; i < 17; i++) {
        var val = check(restaurant[i]);
        if (val == true) {
            return i;
        }
        else {
            var a = i * 10;
            document.getElementById(a.toString()).innerHTML = 0;
        }
    }
    //alert(1);
    return -1;
}


