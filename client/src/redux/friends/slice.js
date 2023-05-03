//slice.js will be responsible for any change made inside friend component
// a mini reducer that handles changes to the global state - but only specific to the friends component
//friends=[] is PROPERTY INSIDE GLOBAL STATE
// we are using default parameter her

//action... describes the change we want to make
export default function friendsAndsWannabeesReducer(friends = [], action) {
    //everything we do inside of here has to make copy of objects and arrays

    if (action.type === "friendswannabees/receive") {
        friends = action.payload.friendsAndWannabees;
    }

    if (action.type === "friendswannabees/accept") {
        console.log("action.payload.id", action.payload.id);
        friends = friends.map(
            //do your mapping here
            (friend) => {
                //check if the id of ANY of the users matches the id of the yuser you just lciked
                if (friend.id == action.payload.id) {
                    //if it does, copy that user and changes its accepted wvalue to true

                    return { ...friend, accepted: true };
                } else {
                    return friend;
                }
            }
        );
    }

    if (action.type === "friendswannabees/unfriend") {
        console.log("action.payload.id", action.payload.id);

        friends = friends.filter((friend) => {
            if (friend.id !== action.payload.id) {
                return friend;
            }
        });
    }

    return friends;
}

//------------------------------------------------------------------------------------------ getFriendsAndWannabees
export function receiveFriendsAndWannabees(friendsAndWannabees) {
    return {
        type: "friendswannabees/receive",
        payload: { friendsAndWannabees },
    };
}

//watch out because we can export default twice... so to impornt we need curly brackets
//this is action creator:
export function makeFriend(id) {
    return {
        type: "friendswannabees/accept",
        payload: { id },
    };
}

export function unfriend(id) {
    return {
        type: "friendswannabees/unfriend",
        payload: { id },
    };
}

//now we wnat main reducer to have access to this

//------------------------------- // HOW TO AVOID MUTATION - 3 methods TO USE INSIDE REDUCER!!!

/*
var obj = {
    name: "Layla",
};

//1- spread operator. works for objects and arrays
var newObj = { ...obj };

//clone and add somothing on top of it
var newObj = { ...obj, last: "arias" };

var arr = [1, 2, 3];
var newArr = [...arr];
var newArr = [...arr, 4];

*/
//2- MAP - works ONLY on arrays
//useful for cloning, looping and changing each element in the array
//just a loop!
//by default it returns A NEW ARRAY

//3- FILTER - also AND ARRAY METHOD
//great for removing things from an array
//also a loop that creates copy of the array you are looping over
//and then removes things from the copy

// NEXT STEPS 9

//recuder action type?

//------------ redux dev tools allow us to see our state
//i can see action being kicked off
//see action what is happening and payload inside

//------------------ PART 9 -----

//new functionality: friends component
//create route in brwoser router /friends... whenever clicked render page with friends and friend requests
//component has to be built with redux

//FUNCTIONALITY PART 9

//navbar...
//inside is list of friends

//listen to click event
//UPDATE DATABASE...
//UPDATE GLOBAL STATE update redux

//step 1
//when friends component mounts... make request to server to fetch all our firends and wannabees

//step 2
//server is giong to make request to db
//db.get friends and wannabees

//step 3
//dbsend back result to server

//step 4 server sends back to friends component data

//step 5 call dispatch.. (slice.js)

//action creator.... pass it array of users we just got back rfrom serve
//return object that has a type... friends/receive friends and wannabees

// step 6-.. action will then talk to sub reducer(slice.js)
// with specific action.. changes state... taking whats in state.. making copy and replacing old version (step 7?)

// step 7
//?

//use selector allows us to pull down information from global statwe

//8grab what was done in redux... and pass it back to friends

//once we have redux and have friends information... this will be accessible from any component ANY WHERE IN our app
