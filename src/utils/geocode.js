const request=require('request')
const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaGFyaXNoZGVzaSIsImEiOiJjbGJrcHJheXcwMHBjM3dxbGk4dXlidmc1In0.PTWVtNTKIvvA2j-wnKruzw'
    //const url = 'https://api.openweathermap.org/data/3.0/onecall?lat='+latitude+'&lon='+longitude+'&exclude=hourly,daily&appid=5972cce95696af87d99fbebec5ee7c81'

    request({url,json:true},(error,{body})=>{
      //  const data = JSON.parse(response.body)
       if(error)
       {
         callback('unable to connect to this location',undefined);
       }else if(body.features.length === 0){
           callback('No location found',undefined);
       }else {
         callback(undefined , {
           latitude : body.features[0].center[0],
           longitude : body.features[0].center[1],
           location : body.features[0].place_name
         }) 
       }
   })
}

module.exports=geocode