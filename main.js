


document.addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        geocode();
    }
});
var longitude;
var latitude;
// call geocode function

function geocode(){
    event.preventDefault();
    userInput.add
    var location = document.getElementById('userInput').value;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
       params:{
           address: location,
           key: 'YOUR_API KEY HERE'
       } 
    })
    .then(function(response){
        //log full response
        console.log(response);
        //formatted address
        var formattedAddress = (response.data.results[0].formatted_address);
        var formattedAddressOutput = `
            <ul class="list-group">
                <li class="list-group-item">${formattedAddress}</li>
            </ul>
        `;
        //address components
        var addressComponents = response.data.results[0].address_components;
        var addressComponentsOutput = '<ul class="list-group">';
        for(var i = 0; i < addressComponents.length; i++){
            addressComponentsOutput += `
                <li class="list-group-item"><strong>${addressComponents[i].types[0]
                }</strong>: ${addressComponents[i].long_name}</li>
            `;
        }
        addressComponentsOutput += '</ul>';
        // Latitude and logitude coordinates 
         latitude = (response.data.results[0].geometry.location.lat);
         longitude = (response.data.results[0].geometry.location.lng);
        var latnlongOutput = `
            <ul class="list-group">
                <li class="list-group-item"><strong>Latitude</strong>:${latitude}</li>
                <li class="list-group-item"><strong>Longitude</strong>:${longitude}</li>
            </ul>
        `;
        //Output to app
        document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
        document.getElementById('address-components').innerHTML = addressComponentsOutput;
        document.getElementById('latnlongdiv').innerHTML = latnlongOutput;
       initMap(); 
    })
    .catch(function(error){
        console.log(error)
    });
    
    
}





function initMap(){
//Map options
var options = {
zoom:18,
center: {lat: latitude, lng: longitude}
}
//New map
var map = new google.maps.Map(document.getElementById('map'), options);
//Add marker
var marker = new google.maps.Marker({
position:{lat: latitude, lng: longitude},
map:map

});
}