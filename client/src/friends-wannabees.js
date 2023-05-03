import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
//import functions from slice(subreducer)
import { makeFriend } from "./redux/friends/slice";
import { unfriend } from "./redux/friends/slice";
import { receiveFriendsAndWannabees } from "./redux/friends/slice";

export default function FriendsAndsWannabees() {
    //get acces to dispatch function:
    const dispatch = useDispatch();

    //friends and wannabees are in global state... need access to it here too. so we need useselector
    //use selector takes callback and object we pass to it is WHOLE OBJECT
    //filter because we need to filter out wannabees from firewnds

    //FRIENDS is what you call property in REDUX object IN ROOT REDUCER

    const wannabees = useSelector(
        (state) => state.friends.filter((friend) => !friend.accepted) // we need to define condition of accepted
    );

    //if you need different parts from global sate u can use useselector several times
    //use filter again

    const friends = useSelector(
        (state) => state.friends.filter((friend) => friend.accepted) //?
    );

    //get all of our friends and wannabees when the component mounts
    useEffect(() => {
        (async () => {
            try {
                //step 1.. make a get request to fetch friends and wannabees
                const resp = await fetch(`/friendswannabees.json`);
                const data = await resp.json();
                console.log("data after fetch friends wannabees", data);
                //when get data back:
                //step 2.. dispatch an action creator and pass to it data you just got back

                //this will start the process of adding your friends and wannabees (big array of objects containing both)
                //receiveFriendsAndWannabees is the action creator
                //this needs to be defined in slice.js
                //and imported in this files

                dispatch(receiveFriendsAndWannabees(data));
            } catch (err) {
                console.log("error fetch FriendButton", err);
            }
        })();
    }, []);

    const handleAccept = (id) => {
        console.log("handleaccept has been pressed", id);

        try {
            (async () => {
                const resp = await fetch(`/api/friendButton/` + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        buttonText: "Accept friend request",
                    }),
                });
                const data = await resp.json();
                console.log("data after ACCEPT friendbutton", data);
                dispatch(makeFriend(id));
            })();
        } catch (err) {
            console.log("error in posting users' relationship ", err);
        }
        //step1 make a post request to update the db
        //step2 dispatch the action to update the global state
    };

    const handleUnfriend = (id) => {
        console.log("handleunfriend has been pressed", id);

        try {
            (async () => {
                const resp = await fetch(`/api/friendButton/` + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ buttonText: "End Friendship" }),
                });
                const data = await resp.json();
                console.log("data after  UNFRIEND friendbutton", data);
                dispatch(unfriend(id));
            })();
        } catch (err) {
            console.log("error in posting users' relationship ", err);
        }
        //step1 make a post request to update the db
        //step2 dispatch the action to update the global state
        //for make friend
        //two action creat ors... need to devine in slice.js}
    };
    return (
        <>
            <div className="friendsAndWannabeesdiv">
                <div className="friendswannabeescontent">
                    <div className="friends">
                        <h1 className="title">Friends</h1>
                        <div className="friendlist">
                            {/* Display your friends */}
                            {friends?.map((friend) => {
                                return (
                                    <div className="friend" key={friend.id}>
                                        <img
                                            className="friendImg"
                                            src={friend.imageurl}
                                        />
                                        <div className="friendtext">
                                            <p>
                                                {friend.first} {friend.last}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    handleUnfriend(friend.id)
                                                }
                                            >
                                                Unfriend
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="wannabees">
                        <h1 className="title">Requests</h1>
                        <div className="wannabeelist">
                            {wannabees?.map((wannabee) => {
                                return (
                                    <div className="wannabee" key={wannabee.id}>
                                        <img
                                            className="wannabeeImg"
                                            src={wannabee.imageurl}
                                        />
                                        <div className="wannabeetext">
                                            <p>
                                                {wannabee.first}
                                                {wannabee.last}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    handleAccept(wannabee.id)
                                                }
                                            >
                                                Accept
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

//in h1 you render lists of users that are friends that want to be friends

//BBOTH of the users are actually 1 BIG ARRAY of both friends and pending firends

//JOB IS TO RENDER as 2 different lists

//CALL USE SELECTOR TWICE FOR TWO 2 LISTS?

//---------------------------- CODE FOR 9

//when u click on button... make requeset to db... and then runa ction to update reduce
//post request... for this user... accepted is true
//passing  id of person you just accepted
//similar to hot or not
//new funciton delete friendshipt? apss id
//and funciton handle accept

//reuse database of accept and delete can use from part 8
//BUT NEW BUTTON
