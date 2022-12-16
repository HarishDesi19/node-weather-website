const request=require('request')
const reversegeocode = (longitude,latitude, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+','+latitude+'.json?access_token=pk.eyJ1IjoiaGFyaXNoZGVzaSIsImEiOiJjbGJrcHJheXcwMHBjM3dxbGk4dXlidmc1In0.PTWVtNTKIvvA2j-wnKruzw'
    request({url,json:true},(error,{body})=>{
    //    const data = JSON.parse(response.body)
       if(error)
       {
         callback('unable to connect to this location',undefined);
       }else if(body.features.length === 0){
           callback('No location found',undefined);
       }else {
         callback(undefined , {
           latitude : body.features[0].center[0],
           longitude : body.features[0].center[1],
           location : body.features[0].place_name,
           body : body
         }) 
       }
   })
}

module.exports=reversegeocode