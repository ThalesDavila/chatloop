# Introduction

Chatbot framework designed based on game loop. 
Actualy only supports Messenger.




# Main idea

File structure:
/loops
/loops/loopsIndex.js
/loops/someFeature-loop.js
/loops/otherFeature-loop.js

Basics:
Every time user send some input, loopsIndex.js will be called and define the correct loop to call(based on status you define in some loop file).

/loops/loopsIndex.js
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

# Examples, Tutorials
coming soon

#Contribute
We have the "quests" below: 

* Add support for other messaging platforms
* Add testing features
* Create database feature for easily persist user status
(I'm finishing one in Mongodb)   
* Create status using local json file, for testing without database

But feel free to build anything with chatloop.

# License

MIT