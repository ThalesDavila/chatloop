# Introduction

Chatbot framework designed taking user context as a priority. 
* Created mixing game loops and web routes concepts.
* Actually only supports Messenger.

# Usage

Every time user sends input, loopsRoutes.js will be called. And based on the user status, define the correct loop to call. 

/loops/loopsRoutes.js
```js
const Loop = require('chatloop').Loop;

const getStartedLoop = require('./getStarted-loop');
const likePizza = require('./likePizza-loop');
const dontlikePizza = require('./dontlikePizza-loop');
//need to call status from some database
module.exports = function (event) {
    
//ArrayOfLoops have all conversational loops
  let ArrayOfLoops = [];

  ArrayOfLoops.push(new Loop(
      'getStartedLoop',
      function() {
        getStartedLoop(event, status)
      }
));

  ArrayOfLoops.push(new Loop(
      'likePizza',
      function() {
        likePizza(event, status)
      }
));

  ArrayOfLoops.push(new Loop(
      'dontlikePizza',
      function() {
        dontlikePizza(event, status)
      }
));

Loop.findCurrentLoop(
    status,
    /*
    Returned by Database, should return
    the string defined in ArrayOfLoops.
    */  
    ArrayOfLoops
)
}
```

Exemple of conversational loop:

/loops/getStarted-loop.js
```js
const send = require('../../index').Send;

module.exports = function(event, status) {
    if(status.FIST_INTERACTION === 'true') {}
        send.Text(event.senderId, 'Hi');

        let buttons = [
        {
            type:"postback",
            title:"Yes",
            payload:"DONT_LIKE_PIZZA_PAYLOAD"
        },
        {
            type:"postback",
            title:"No",
            payload:"LIKE_PIZZA_PAYLOAD"
        }
        ];
        send.Button(event.senderId, 'Do You like pizza?', buttons);
    else {
        if(event.payload === "LIKE_PIZZA_PAYLOAD") {
            //Change status: status.CALL_LOOP_FUNCTION = true
            //You can do it in every database you want
            //now next user input will call likePizza-loop.js
            send.Text(event.senderId, 'Me too');
            send.Text(event.senderId, 'What pizza flavour do you prefer?');
        }
         else if(event.payload === "DONT_LIKE_PIZZA_PAYLOAD") {
            send.Text(event.senderId, 'I do not belive');
            senD.Text(event.senderId, 'Do you like hamburguer?')
        }
    }
}
```
Based on user status, /loops/likePizza-loop.js or 
/loops/dontlikePizza-loop.js will be called. 

FUNCTIONS:
```js
send.Text(event.senderId, 'some_text')
send.RequestLocation(event.senderId, 'some_text')
send.Button(event.senderId, 'some_text', buttons)
send.QuickReply(event.senderId, 'some_text', quick_reply)
//new features coming soon
```
Create a /.wnv file to put config data
```.env
PAGE_ACESS_TOKEN = <messenger page token>
VERIFICATION = <large string>
```

# Examples, Tutorials
coming soon

#Contribute
We have the "quests" below: 
* Add more Messenger features.
* Add support for other messaging platforms.
* Add testing features.
* Create database feature for easily persist user status
(I'm finishing one in MongoDB).   
* Create some feature for persisting user status data in a local JSON file, for testing and prototyping without a database.

# License

MIT