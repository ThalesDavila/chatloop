const rp = require('request-promise');

module.exports = function(json) {
    rp({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.PAGE_ACESS_TOKEN},
        method: 'POST',
        json: json
    });
};
