const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const verification = require('./verification');
const webhook = require('./webhook');

module.exports = function server_exports_function(
    loopsController,
    port = 3000) {

    function passLoopsControllerToWebhook(req, res, next) {
        req.loopsController = loopsController;
        next();
    }

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.listen(port, function() {
    console.log('Running on port %i', port);
    });
    app.get('/', verification);
    app.post('/', passLoopsControllerToWebhook, webhook);
}