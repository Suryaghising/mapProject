//firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC3i_VIJWm9GbwwDYbVASldzHp_FO_VUEo",
    authDomain: "map-project-266d6.firebaseapp.com",
    databaseURL: "https://map-project-266d6.firebaseio.com",
    projectId: "map-project-266d6",
    storageBucket: "map-project-266d6.appspot.com",
    messagingSenderId: "876572778116",
    appId: "1:876572778116:web:f3e3e24681b95431"
  };
firebase.initializeApp(firebaseConfig);
 
//reference to firebase node
var clickRef = firebase.database().ref('clicks');

//initial arrays
var latitudes = [];
var longitudes = [];
var places = [];

var map;
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

//user input
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

//add to firebase
function addToFirebase(data) {
    
    clickRef.push(data, function(err){
        if(err){
            console.warn(err);
        }

        if(clickRef){
            console.log('Successful.');
        }
    });
    
}

//map callback function 
function initMap() {
    //map initialization
    map = new google.maps.Map(document.getElementById('map'), options);
    
    clickRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            placeName = childData.place;
            places.push(childData.place);
            lats = Number(childData.latitude);
            latitudes.push(lats);
            lngs = Number(childData.longitude);
            longitudes.push(lngs);

            console.log('lats::', lats);
            console.log('longs', lngs);

      var myLatLng = {lat: lats, lng: lngs};

      //add marker
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: placeName
        });

        });
    });

    console.log('latitudes is::::',latitudes);
    
}