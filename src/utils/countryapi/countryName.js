const request = require('request');

const searchByCountryName = (name,full=false,callback)=>{
    let url = ""
    
    
    if(full === true){
        console.log(full);
        url = url + "https://restcountries.eu/rest/v2/name/" + name +"?fullText=true";
    }
    else{
        url = url + "https://restcountries.eu/rest/v2/name/" + name;
    }
    request({url,json:true},(error,{body}={})=>{
        if(error){
           callback("unable to connect to country api service");
        }
        if(body.error){
            callback("unable to find location data")
        }
        else{
            callback(undefined,body);
        }


    })

}



module.exports = searchByCountryName;