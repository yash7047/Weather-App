//Importing the Libraries
const express=require('express')
const ejs=require('ejs')
const path=require('path')
const app=express()

//Settuping up port
const port=process.env.PORT || 3000

//Path Configuration
const view_path=path.join(__dirname,'../template/views')

//Setting up ejs and View Locations
app.set('view engine','ejs')
app.set('views',view_path);

//<------------ROUTERS------------->

//Homepage
app.get('',(req,res)=>{
    res.render('index')
})

//about section
app.get('/about',(req,res)=>{
    res.render('about')
})

//Weather Fetching Section
app.get('/weather',(req,res)=>{
    
})


app.listen(port,()=>{
    console.log('Server is up')
})