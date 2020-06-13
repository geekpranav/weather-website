const request = require('request')




const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhbmF2c2hhbmthcmFuOTg0MDAiLCJhIjoiY2theGxreW5jMDdmdDJ3cXFqYjdibW5mbSJ9.Qxu43X0P54uS5VhyzWmf5A&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to fetch you data right now', undefined)
        }else if(response.body.features.length===0){
            callback('hm,..akward but can u check the data that u entered',undefined)

        }else{
             callback(undefined,{
              lat:   response.body.features[0].center[1],
              long:response.body.features[0].center[0],
              location:response.body.features[0].place_name

             })
        }
    })

}
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 8
  });
}

module.exports=geocode