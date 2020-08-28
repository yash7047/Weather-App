//Importing the Libraries
const express=require('express')
const ejs=require('ejs')
const path=require('path')
const app=express()
const bodyParser=require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
//Settuping up port
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
    
})


app.listen(port,()=>{
    console.log('Server is up')
})