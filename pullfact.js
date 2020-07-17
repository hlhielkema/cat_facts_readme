const https = require('https');

var API_URI = 'https://cat-fact.herokuapp.com/facts/random';

function getCatFact(callback)
{
    https.get(API_URI, (resp) => {
        let data = '';        
        resp.on('data', (chunk) => {
            data += chunk;
        });      
        resp.on('end', () => {
            callback(JSON.parse(data).text);
        });      
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

getCatFact(function(text) {
    console.log('Fact: ', text);
})