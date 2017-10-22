const rp = require('request-promise');

module.exports = async function getProfileData(senderId) {
    console.log(process.env.PAGE_ACESS_TOKEN)
    const profile_data = await rp.get(
        'https://graph.facebook.com/v2.6/'
        + senderId 
        + '/?access_token='
        + process.env.PAGE_ACESS_TOKEN 
    )
    return(profile_data)    
}



    
