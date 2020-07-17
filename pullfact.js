const https = require('https');
const fs = require('fs');

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

function writeFact(text) {
    fs.writeFile('fact.md', text, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');

        listFiles();
    });
}

function listFiles() {    
    fs.readdir(__dirname, function(err, items) {
        console.log(items);

        for (var i=0; i<items.length; i++) {
            console.log(items[i]);
        }
    });
}

getCatFact(function(text) {
    console.log('Fact: ', text);
    writeFact(text);
})


