var express = require('express');
var router = express.Router();
var request = require('request-promise');
var jsonxml = require('jsontoxml');

router.get('/', async function(req, res){
    // const someJSONFeed = require('./data.json')

    var options = {
        method: 'GET',
        uri: 'https://a575211fe47d.ngrok.io/leaderboard/api',
        json: true
    };
    let body =  await request(options)
    var xmlData = jsonxml(body)
    console.log(xmlData)

    res.set('Content-Type', 'text/plain');

    res.send(xmlData)
})

module.exports = router;
