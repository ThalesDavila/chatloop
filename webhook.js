module.exports = function(req, res) {    
    if (req.body.object === 'page') {
        req.body.entry.forEach(function(entry) {
            entry.messaging.forEach(function(event) {
                if(event.message) {
                    if(event.message.text && !event.message.attachments) {
                        req.loopsController({
                            senderId: event.sender.id,
                            text_message: event.message.text
                        })
                    } else if(event.message.quick_reply){
                        req.loopsController({
                            senderId: event.sender.id,
                            quick_reply: event.message.quick_reply
                        })
                    } else if(event.message.attachments) {
                        req.loopsController({
                            senderId: event.sender.id,
                            coordinates: event.message.attachments[0].payload.coordinates
                        })
                    }
                } else if(event.postback) {
                    if(event.postback.payload) {
                        req.loopsController({
                            senderId: event.sender.id,
                            payload: event.postback.payload
                        })
                    }
                }
            });
        });

        res.sendStatus(200);
    }
}