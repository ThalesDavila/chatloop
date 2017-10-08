const rp = require('request-promise');

module.exports = function(json) {
    //throw new Error();
    rp({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.PAGE_ACESS_TOKEN},
        method: 'POST',
        json: json
    });
};

/*const request = require('request');
const Promise = require('bluebird');

module.exports = function(json) {
    return new Promise(function(resolve, reject) {
       request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.PAGE_ACESS_TOKEN},
        method: 'POST',
        json: json
    });
    resolve();
    });
};
//npm i -g npm
*/