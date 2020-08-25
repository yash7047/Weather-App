//Importing the Libraries
const express=require('express')
const ejs=require('ejs')
const path=require('path')
var request=require('request')
const app=express()

// APIKEY and URL
var api_key="appid=19cd8741e7e9b54c6de7fb031a80eb27";
var url1="https://api.openweathermap.org/data/2.5/weather?q=";
var url2="https://api.openweathermap.org/data/2.5/onecall?";  //lat=33.441792&lon=-94.037689&"

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

//Weather Fetching Section
app.get('/weather',(req,res)=>{
    var city=req.query.city;
    var url=url1+city+api_key;
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
            var data=JSON.parse(body);
            var lat=data["coord"]["lat"];
            var lon=data["coord"]["lon"];
            var main_url=url2+"lat="+String(lat)+"&lon="+String(lon)+api_key;
            //console.log(main_url);
            request(main_url,function(error,response,body){
                if(!error && response.statusCode===200){
                    var result=JSON.parse(body);
                    res.render("results",{data: result});
                }else{
                    console.log(error);
                    console.log(response.statusCode);
                }
            });
        } else{
            console.log(error);
            console.log(response.statusCode);
        }
    });
})

app.listen(port,()=>{
    console.log('Server is up')
})