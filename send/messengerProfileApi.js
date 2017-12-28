const rp = require('request-promise');

module.exports = async function(
    menu_data
    ) {
        try {
            await rp({
                url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
                qs: { access_token: process.env.PAGE_ACESS_TOKEN},
                method: 'POST',
                json: menu_data 
            })
            console.log('Sending the POST request to the Profile API')
        } catch(e) {
            console.error(e);
        }
}