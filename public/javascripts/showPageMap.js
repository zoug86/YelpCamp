
campground = JSON.parse(campgroundMap);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 5 // starting zoom
});



const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>${campground.title}</h4> <p> ${campground.location}</p>`)
    )
    .addTo(map)
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

//'{"geometry":{"coordinates":[-123.3649,48.4283],"type":"Point"},"reviews":[],"_id":"602cec778e9de86e74f7fe61","title":"Victoria Hills","location":"Victoria, BC","price":22,"description":"cdsvxcvvvvvvvvvvvvvvvvvvvvvvvvv","images":[{"_id":"602cec778e9de86e74f7fe62","url":"https://res.cloudinary.com/dwuo25yqj/image/upload/v1613556855/YelpCamp/ic9odupchnx6ttuyuxma.jpg","filename":"YelpCamp/ic9odupchnx6ttuyuxma"}],"author":{"_id":"6014d40f1534c942d4ba7347","email":"tim@gmail.com","username":"tim","__v":0},"__v":0}'