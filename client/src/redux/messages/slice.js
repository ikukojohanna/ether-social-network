// reducer for messages

export default function messagesReducer(messages = [], action) {
    if (action.type === "messages/received") {
        // console.log(action);
        messages = action.payload.messages.messages.reverse();
        console.log("messages in messages reducer", messages);
    }

    if (action.type === "messages/add") {
        console.log("action.pazload inside reducer: ", action.payload.message);

        messages = [...messages, action.payload.message];

        // console.log("messages", messages);
    }

    return messages;
}

//action creators

export function messagesReceived(messages) {
    console.log("messages in action creator", messages);
    return {
        type: "messages/received",
        payload: { messages },
    };
}

export function addNewMessage(message) {
    console.log("message in action creator", message);
    return {
        type: "messages/add",
        payload: { message },
    };
}
//TODO:

//- online users.... filter in server to get users in one room
//- räume sagen user joined mit socket.to() rest vom code normal
//world ... on click event filter through array

//_---------------------------------------------------------------------------------------------------------------------------------------
//_-------------------- RECAP OLI -------------------------
//_--------------------------------------------------------

/* 

//_--------------------_--------------------_-------------------- Back end_--------------------_--------------------_--------------------_--------------------

..express: web server
..bcrypt: for hashing passwords 
..uuid: create profile urls

//_--------------------_--------------------_-------------------- third party_--------------------_--------------------_--------------------_--------------------
aws-sdk: upload to s3, send emails to ses

//_--------------------_--------------------_-------------------- DATABASE_--------------------_--------------------_--------------------_--------------------
..spiced-pg:  postgresSQL diver- based on node-pg - spiced-pg wrapper around node-pg in order to use promises
COMMINUCATES to database....



//_-------------------- _--------------------_--------------------Front End_--------------------_--------------------_--------------------_--------------------

------------------------------------------------------------------Frameworks:
--------- FOR STATIC WEBSITES, very useful for things like blogs:
..handlebars: templating engine 

 ---------  FOR COMPLEXE FRONT-END applications with lots of state management and data flows 
 especially good for single page appications, as soon as complicated, lots of buttons, fetching lots of data....

..vue: front end framework ---------  FOR COMPLEXE FRONT-END applications with lots of state management and data flows  
..react: front end framework--------- FOR STATIC WEBSITES

(not so much difference between vue and react)

------Libraries:
..redux: state management... created by same ppl as react.
controlled state update... instead of passing loads of props we have a global obejct that can be accessed

.. Jquery 

both frameworks and libraries are pieces of code written by someone wlse who you use inside your code.
--framework will force yourself to do things a certain way.. imposing whole structure for whole application
--library is import that allows you to do certain things... just gives u pieces of funcctionality



NODE is runtime environment...
if i wwant to run could i need an environment to run on
theres either:BROWSER or SERVER
we use NODE to run code on server

//_-------------------- _------------------------BOILERPLATE / SETUP_ / DEVELOPPER TOOLS--------------------_--------------------_--------------------_--------------------
..wepback: bundler(combine files)
..babel: transpiler (translate to earlier js versions)

..eslint:linter (warn about possible errors)
..prettier: formatter(consistent code style)

..jest: testing library (many others)



..typescript: language to add type anotations to existing code.

LIBRARY /TOOL to help you with writing your code
dont impact how website would run in the end


*/
