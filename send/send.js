const sendToMessenger = require('./sendToMessenger');
const GetProfileData = require('./getProfileData');

exports.Text = async function (
    senderId,
    text
) {
    try {
        await sendToMessenger({
            recipient: { id: senderId },
            message: { text }
        })
    } catch(e) {
        console.error(e);
    } 
};

exports.Button = async function(
    senderId,
    text,
    buttons
) {
    try {
        await sendToMessenger({
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'template',
                    payload: { template_type: 'button',
                    text: text,
                    buttons: buttons
                    },
                }
            }
        })
    } catch(e) {
        console.error(e);
    } 
}

exports.QuickReply = async function(
    senderId,
    text,
    quickReplies
) {
    try {
        await sendToMessenger({
            recipient: { id: senderId },
            message: {
                text: text,
                quick_replies: quickReplies
        }
        })
    } catch(e) {
        console.error(e);
    } 
}

exports.GenericTemplate = async function(
    senderId,
    elements,
    image_aspect_ratio = 'horizontal',
    sharable = true
) {
    try {
        await sendToMessenger({
            recipient: { id: senderId },
            message: {
                attachment: {
                    type:'template',
                    payload:{
                    template_type:'generic',
                    image_aspect_ratio: image_aspect_ratio,
                    sharable: sharable,
                    elements: elements  
                    }
                }
            }
        })
    } catch (e) {
        console.error(e);
    }
}

exports.Image = async function(
    senderId,
    url
) {
    try {
        await sendToMessenger({
            recipient: { id: senderId },
            message: {
                attachment: {
                  type: 'image',
                  payload: {
                    url: url
                  }
                }
            }
        })
    } catch(e) {
        console.error(e)
    }
}

exports.ListTemplate = async function(
    senderId,
    elements,
    top_element_style = 'large'
) {
    try {
        await sendToMessenger({
            recipient: { id: senderId },
            message: {
                attachment: {
                    type:'template',
                    payload:{
                        template_type:'list',
                        top_element_style: top_element_style,
                        elements: elements  
                    }
                }
            }
        })
    } catch (e) {
        console.error(e);
    }
}

exports.RequestLocation = async function(
    senderId,
    text
) {
    try {
        await sendToMessenger({
            recipient: { id: senderId },
                message: {
                    text: text,
                    quick_replies: [
                        {
                            content_type:'location'
                        }
                    ]
            }
        })
    } catch(e) {
        console.error(e);
    } 
}



exports.Typing = async function(
    senderId
) {
    try {
        await sendToMessenger({        
            recipient: { id: senderId },
            sender_action: "typing_on"
        })
    } catch(e) {
        console.error(e);
    }
}

exports.GetProfileData = async function(
    senderId
) {
    try {
        console.log(senderId)
        const profile_data = await GetProfileData(senderId)
        return profile_data
    } catch(e) {
        console.error(e);
    }
}

exports.Random = function(
    rand
) {
    randomItem = rand[Math.floor(Math.random()*rand.length)];
    return(randomItem());
}
