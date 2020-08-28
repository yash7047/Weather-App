//Importing the Libraries
const express=require('express')
const ejs=require('ejs')
const path=require('path')
var request=require('request')
var bodyParser=require('body-parser')

const app=express()
//Settuping up port
app.use(bodyParser.urlencoded({extended: true}));

var city='kanpur', lat=26.47, lon=80.35;

//Setting up port
const port=process.env.PORT || 3000


//Path Configuration
const view_path=path.join(__dirname,'../template/views')
const public_path=path.join(__dirname,'../public')

//Setting up ejs and View Locations
app.set('view engine','ejs')
app.set('views',view_path);

//setup static directory to serve
app.use(express.static(public_path))

//<------------ROUTERS------------->

//Homepage
app.get('/',(req,res)=>{
    res.render('index',{qs:req.query})
})



//Weather Fetching Section
app.get('/weather',(req,res)=>{
    var url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=19cd8741e7e9b54c6de7fb031a80eb27`;
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
            var data=JSON.parse(body);
            var lat=data["coord"]["lat"];
            var lon=data["coord"]["lon"];
            var main_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=19cd8741e7e9b54c6de7fb031a80eb27`;
            request(main_url,function(error,response,body){
                if(!error && response.statusCode===200){
                    var result=JSON.parse(body);
                    var weather_data={
                        city: city,
                        temp: result.current.temp,
                        desc: result.current.weather[0].description,
                        icon: result.current.weather[0].icon,
                        next: [
                            {min_temp: result.daily[0].temp.min, max_temp: result.daily[0].temp.max,desc: result.daily[0].weather[0].description, icon: result.daily[0].weather[0].icon},
                            {min_temp: result.daily[1].temp.min, max_temp: result.daily[1].temp.max,desc: result.daily[1].weather[0].description, icon: result.daily[1].weather[0].icon},
                            {min_temp: result.daily[2].temp.min, max_temp: result.daily[2].temp.max,desc: result.daily[2].weather[0].description, icon: result.daily[2].weather[0].icon},
                            {min_temp: result.daily[3].temp.min, max_temp: result.daily[3].temp.max,desc: result.daily[3].weather[0].description, icon: result.daily[3].weather[0].icon}
                        ]
                    }
                    res.render("index",{data: weather_data});
                }else{
                    console.log(error);
                    console.log(response.statusCode);
                }
            });
        }else{
            console.log(error);
            console.log(response.statusCode);
        }
    });
})

app.post("/",function(req,res){
    city=req.body.city_name;
    res.redirect("/");
});

app.listen(port,()=>{
    console.log('Server is up')
})
