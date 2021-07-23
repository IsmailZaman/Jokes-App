const request = require('request');


const joke =(callback)=>{

    const url = 'https://official-joke-api.appspot.com/random_joke';
    request({url: url, json: true},(error,response)=>{
    
        if(error){
            callback('We ran out of jokes!')
        }
        else if(response.body.length == 0){
            callback('No jokes found!')
        }
        else{
            callback(undefined,{
                setup: response.body.setup,
                punchline: response.body.punchline
            })
        }
    })
}
module.exports = joke;


