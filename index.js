//config constants
require('dotenv').config();

const Loop = require('./status/Loop');
const Send = require('./send/send')
const server = require('./server');
const Development = require('./development/developmentIndex');

Connect = function(
    loopsController,
    customPort
) {
    server(
        loopsController,
        customPort
    )
};

module.exports.Connect = Connect;
module.exports.Send = Send;
module.exports.Loop = Loop;
module.exports.Development = Development;
