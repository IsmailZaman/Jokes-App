const request = require('request');
const path = require('path');
const joke = require('./utils/jokesapi');
const countryNameInfo = require('./utils/countryapi/countryName');



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

app.get('/country',(req,res)=>{
    res.render('country',{})
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


app.get('/countryInfo',(req,res)=>{

    if(!req.query.name){
        return res.send({
            error: "Country name not given"
        })
    }
    
    const location = req.query.name;
    let full = false;
    if(req.query.full = 'true'){
        full = true;
    }
    
    countryNameInfo(location,full,(error,response)=>{

        if(error){
            return res.send({
                error
            })
        }
        else{

            if(response[0] === undefined){
                return res.send({
                    error: "Data not found"
                })
            }
            const {name,population,languages} = response[0];
            
            console.log(name,population,languages)
            return res.send({
                name,
                population,
                languages
            })
        }
    });

})



app.listen(port, ()=>{
    console.log('App running on ', port);
})