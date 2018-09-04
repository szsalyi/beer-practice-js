const express = require('express');

const request = require('request');

const rp = require('request-promise');

let app = express();
let bodyParser = require('body-parser');
let url = 'https://api.punkapi.com/v2/beers';

let params = {
    'beer_name' : 'beer_name'
};

let options = {
    uri: url,
    json: true
};

app.use(bodyParser.json());

app.get('/beers', (req,resp) => {
    let path = url;
    if(req.query.beer_name){
        path += `?${params.beer_name}=${req.query.beer_name}`;
        options.uri = path;
    }
    rp(options).then(function (body) {
        resp.send(body);
    }).catch(function (err) {
        resp.status(500).json(err);
    });
});


let postOptions = {
    method: 'POST',
    uri: 'https://httpbin.org/post',
    header:{
        'content-type': 'application/json'
    },
    json: true
};

app.post('/binpost', (req, resp) =>{
    console.log(req.body);
    options.body= {json : req.body};
    console.log(JSON.stringify(options.body)+ "-----");
    rp(postOptions).then(function (body) {
        resp.json(body);
    }).catch(function (err) {
        resp.status(500).json(err);
    });
});

app.listen(3000, () => console.log('Server started!'));