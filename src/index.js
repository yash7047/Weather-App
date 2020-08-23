//Importing the Libraries
const express=require('express')
const ejs=require('ejs')
const path=require('path')
var request=require('request')
const app=express()

// APIKEY and URL
var api_key="appid=19cd8741e7e9b54c6de7fb031a80eb27";
var url="https://api.openweathermap.org/data/2.5/weather?q=";

//Setting up port
const port=process.env.PORT || 3000

//Path Configuration
const view_path=path.join(__dirname,'../template/views')

//Setting up ejs and View Locations
app.set('view engine','ejs')
app.set('views',view_path);

//<------------ROUTERS------------->

//Homepage
app.get('/',(req,res)=>{
    res.render('index')
})

//about section
app.get('/about',(req,res)=>{
    res.render('about')
})

//Weather Fetching Section
app.get('/weather',(req,res)=>{

    city=req.body.city;
    country=req.body.country;
    city=city+','+country;
    url=url+city+'&'+api_key;                           //London,uk&APPID=
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
            res.render("results",{data: data});
        } else{
            data=JSON.parse(body);
            console.log(response.statusCode);
        }
    });
})


app.listen(port,()=>{
    console.log('Server is up')
})