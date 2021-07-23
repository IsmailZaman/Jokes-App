const request = require('request');
const path = require('path');
const joke = require('./utils/jokesapi');
const hbs = require('hbs');
const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT ||3000;
app.use(cors());

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));



app.get('',(req,res)=>{
    res.render('index',{});
})

app.get('/joke',(req,res)=>{

    joke((error, {setup,punchline}={})=>{

        if(error){
            return res.send({
                error
            });
        }
        else{

            return res.send({
                setup,
                punchline
            });
        }
    });
    
})



app.listen(port, ()=>{
    console.log('App running on ', port);
})