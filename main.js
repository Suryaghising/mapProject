//firebase real-time database api
var firebase = new Firebase('https://map-project-266d6.firebaseio.com/');


//initial data inputs
var data = {
    place: null,
    latitude: null,
    longitude: null,
};


//map settings
var options = {
    zoom:12,
    center:{lat: 27.7172, lng: 85.3240}
};


// Dummy data for showing markers
var markers = [
    {
        coords:{lat: 27.7172, lng: 85.3240},
        placeName:'<h1>Kathmandu</h1>'
    },
    {
        coords:{lat:27.6710,lng:85.4298},
        placeName:'<h1>Bhaktapur</h1>'
    },
    {
        coords:{lat:27.6644,lng:85.3188},
        placeName:'<h1>Lalitpur</h1>'
    }
];

//user input for describing the name of place along with latitude and longitude
function locationInput() {
    var place = document.getElementById('place');
    var latitude = document.getElementById('lat');
    var longitude = document.getElementById('lng');

    var placeName = place.value;
    var lati = latitude.value;
    var longi = longitude.value;


    //user input validation
    if (placeName.length===0 || lati.length===0 || longi.length===0) {
        console.log('Empty...');
        alert('Please fill up all the fields...');
    }

    else {
        console.log('Place:::', placeName);
        console.log('Latitude:::', lati);
        console.log('Longitude::::', longi);

        data.place = placeName;
        data.latitude = lati;
        data.longitude = longi;

        addToFirebase(data);

        place.value = '';
        latitude.value = '';
        longitude.value = '';

        console.log('Place:::', data.place);
        console.log('Latitude:::', data.latitude);
        console.log('Longitude::::', data.longitude);
    }

}

//storing data to firebase database
function addToFirebase(data) {
    var ref = firebase.child('clicks').push(data, function (err) {
        if (err) {  // Data was not written to firebase.
            console.warn(err);
        }

        if (ref) {
            console.log('Successful...');
        }
    });
}


//async callback function called from map api
function initMap() {

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Listen for click on map
    google.maps.event.addListener(map, 'click', function(event){
        // Add marker
        addMarker({coords:event.latLng});
    });


    // Loop through markers
    for(var i = 0;i < markers.length;i++){
        // Add marker
        addMarker(markers[i]);
    }

    // Add new markers function
    function addMarker(props){
        var marker = new google.maps.Marker({
            position:props.coords,
            map:map,
        });


        // Check placeName
        if(props.placeName){
            var infoWindow = new google.maps.InfoWindow({
                placeName:props.placeName
            });


            //display marker's place name info on marker clicks
            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            });
        }
    }

}