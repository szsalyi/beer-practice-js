const express = require('express');

const request = require('request');

let app = express();
let bodyParser = require('body-parser');
let url = 'https://api.punkapi.com/v2/beers';

let params = {
    'beer_name' : 'beer_name'
};

app.use(bodyParser.json());
app.get('/beers', (req,resp) => {
    let path = url;
    if(req.query.beer_name){
        path += `?${params.beer_name}=${req.query.beer_name}`;
    }
    request(path, (error, response, body) => {
        if(error){
            resp.status(500).json(error);
            return;
        }
        resp.json(JSON.parse(body));
    });
});

app.post('/binpost', (req, resp) =>{
    console.log(req.body);
    request.post('https://httpbin.org/post',{json:req.body}, (error, response, body) =>{
      console.log(body);
      resp.json(body);
    });
});

app.listen(3000, () => console.log('Server started!'));