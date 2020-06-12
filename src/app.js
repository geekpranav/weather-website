const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const publicdirpath = path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath)
app.use(express.static(publicdirpath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather-app',
        name:'pranav sankaran'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather-app',
        name:'pranav sankaran'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'weather-app',
        name:'pranav sankaran',
        help:'dont worry imma solve this thingy'
    })
})




app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide a location jarvis knows"
        })

    }
    geocode(req.query.address,(error,{lat,long,location}={})=>{

        if(error){
            return res.send({error})
        }
        forecast(lat,long,(error,forecastdata)=>{
            if(error){
                res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location, 
                address:req.query.address
            })
        })  
    })
    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must enter the name of the city or place or else jarvis cant find it for you '

        })


    }
    res.send({
        products:[]
    })
})

 








app.get('/help/*',(req,res)=>{
    res.render('helperror')

})
app.get('*',(req,res)=>{
    res.render('error')

})
app.listen(3000,()=>{
    console.log('MR.JARVIS THE SERVER IS UP AND RUNNING')
})