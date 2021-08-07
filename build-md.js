const https = require('https');
const fs = require('fs');

// Configuration
var API_URI = 'https://catfact.ninja/fact?max_length=140';
var TEMPLATE_FILENAME = 'TEMPLATE.md';
var TEMPLATE_PLACEHOLDER = '[PLACEHOLDER]';
var TARGET_FILENAME = 'README.md'

function getCatFact(callback)
{
    console.log('Fetch cat fact with API');
    https.get(API_URI, (resp) => {
        let data = '';        
        resp.on('data', (chunk) => {
            data += chunk;
        });      
        resp.on('end', () => {
            callback(JSON.parse(data).fact);
        });      
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function writeMarkdown(text) {
    console.log('Write ' + TARGET_FILENAME);
    fs.writeFile(TARGET_FILENAME, text, function (err) {
        if (err) {
            return console.log(err);
        }        
    });
}

function readTemplate(callback) {
    console.log('Read ' + TEMPLATE_FILENAME);
    fs.readFile(TEMPLATE_FILENAME, 'utf8', function(err, contents) {
        callback(contents);
    });
}

function populateTemplate(template, text) {
    console.log('Generate the README contents')
    return template.replace(TEMPLATE_PLACEHOLDER, text);
}

getCatFact(function(text) {
    console.log('Fact: ', text);
    readTemplate(function(template) {                
        template = populateTemplate(template, text);
        writeMarkdown(template);
    });    
});
