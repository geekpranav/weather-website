const request  = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=4f3f9083703b6e5a20c1200cfff70bd1&units=metric'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to reach crew dragon',undefined)

        }else if(response.body.error){
            callback('the matrix has a glitch',undefined)

        }else{
            callback(undefined,'in the location you have chosen  today it is ' + response.body.main.temp +' degree celsius with  overall ' + response.body.weather[0].description)

        }
    })


}

module.exports=forecast