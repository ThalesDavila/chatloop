const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const verification = require('./verification');
const webhook = require('./webhook');

module.exports = function server_exports_function(
    loopsController,
    customPort) {

    function passLoopsControllerToWebhook(req, res, next) {
        req.loopsController = loopsController;
        next();
    }

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    let port = customPort;
    if(typeof port == 'undefined') {
        port = 3000
    }

    console.log(port);
    console.log(loopsController)

    app.listen(port, function() {
    console.log('server rodando');
    });

    app.get('/', verification);
    app.post('/', passLoopsControllerToWebhook, webhook);

}