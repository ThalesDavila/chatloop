# Introduction

Chatbot framework designed taking user context as a priority. 
* Created mixing game loop and web routing concepts.
* Chatloop has a very easy to use a function to keep the user context under development. So, you don't need to worry about databases in the beginning.
* Actually only supports Messenger.


# Architecture Main Idea

Every time user sends an input, the loopsRoutes file will be called. Then, based on the user context, will define the correct conversational loop to call.

# Usage

Send the loopRoutes to chatloop:
```js
const chatloop = require('chatloop');
const loopsRoutes = require('./loops/loopsRoutes');

chatloop.Connect(
    loopsRoutes
    //The default port is 3000
    //Can put here any port number you want
);
```


/loops/loopsRoutes.js
```js
const Loop = require('chatloop').Loop;
const context = require('chatloop').Development.context;

const getStartedLoop = require('./getStarted-loop');
const likePizza = require('./likePizza-loop');
const dontlikePizza = require('./dontlikePizza-loop');

module.exports = async function (event) {    
  /*
  Will return the current context. 
  If does not have loopToBeCalled defined,
  will call the getStartedLoop.
  */
    const read_context = await context();
  if(read_context && read_context.loopToBeCalled) {
    loopToBeCalled = read_context.loopToBeCalled
  } else {
    await context('getstartedLoop');
    loopToBeCalled = 'getstartedLoop'
  }

//ArrayOfLoops have all conversational loops
  let ArrayOfLoops = [];
  ArrayOfLoops.push(new Loop(
      'getStartedLoop',
      function() {
        getStartedLoop(event, context)
      }
));
  ArrayOfLoops.push(new Loop(
      'likePizza',
      function() {
        likePizza(event, context)
      }
));
  ArrayOfLoops.push(new Loop(
      'dontLikePizza',
      function() {
        dontlikePizza(event, context)
      }
));

Loop.findCurrentLoop(
    loopToBeCalled,
    ArrayOfLoops
)
}
```


Exemple of conversational loop:

/loops/getStarted-loop.js
```js
const send = require('chatloop').Send;
const context = require('chatloop').Development.context;

module.exports = function(event, context) {
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
        send.Button(event.senderId, 'Do You like pizza?', buttons)

        if(event.payload === "LIKE_PIZZA_PAYLOAD") {
            context('likePizzaLoop')
            //change the loop to be called to likePizzaLoop
            send.Text(event.senderId, 'Me too')
            send.Text(event.senderId, 'What pizza flavour do you prefer?')
        }
         else if(event.payload === "DONT_LIKE_PIZZA_PAYLOAD") {
            context('dontLikePizzaLoop') 
            //change the loop to be called to dontLikePizzaLoop
            send.Text(event.senderId, 'I do not belive')
            senD.Text(event.senderId, 'Do you like hamburguer?')
        }
}
```
Based on user context, /loops/likePizza-loop.js or 
/loops/dontlikePizza-loop.js will be called. 


Create a /.env file to put config data
```.env
PAGE_ACESS_TOKEN = <messenger page token>
VERIFICATION = <large string>
```


Under Production, you can easily substitute the context 
functions for database functions. 


# Functions
```js
send.Text(event.senderId, 'some_text')
send.Image(event.senderId, 'url')
send.RequestLocation(event.senderId, 'some_text')
send.Button(event.senderId, 'some_text', buttons)
send.QuickReply(event.senderId, 'some_text', quick_reply)
send.GenericTemplate(event.senderId, elements,
/*
image_aspect_ratio can be:
'horizontal' or 'square'
default is 'horizontal'
*/
/*
sharable 
default is true
*/
)
send.ListTemplate(event.senderId, elements,
/*
top_element_style can be 'large' or 'compact'
default is 'large'
*/
)
send.Typing(event.senderId)
send.Random(
//Will send random between 'text_1' and 'text_2' 
    [
        function() {
            send.Text(event.senderId, 'text_1');
        },
        function() {
            send.Text(event.senderId, 'text_2');
        }
    ]
)
//the send. funtions became from require('chatloop').Send;


context() 
//will return the current context
context('someLoop') 
/*
will store {"loopToBeCalled": "likePizzaLoop"}
in a local file
*/
context(undefined, 'some_position')
/* second element are used for some position inside
the loop, will store {"position": "not choose a flavor"}
undefined in a parameter results in no change
(only in parameter field) 
*/
contextDelete()
//"reboot" the local file

/*
the context functions become from: 
require('chatloop').Development.context

contextDelete from: 
require('chatloop').Development.contextDelete
*/
```


# Examples, Tutorials
[Build your first Chatbot with Chatloop](https://medium.com/@thalesmdav/build-your-first-chatbot-with-chatloop-ddd21e47e21)


# License

MIT