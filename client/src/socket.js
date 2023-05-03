import { io } from "socket.io-client";
import { messagesReceived } from "./redux/messages/slice.js";
import { addNewMessage } from "./redux/messages/slice.js";
import { addOnlineUsers } from "./redux/online/slice.js";
import { openDm } from "./redux/chatrooms/slice.js";

export let socket; // let because at this point socket is undefined and ii'm going to have to create a connection

//sockets have access to redux store object. passed as argument for following function
export const init = (store) => {
    console.log("running init for sockets", store);
    if (!socket) {
        socket = io.connect();
        //listening evvent on client side

        socket.on("last-10-messages", (msgs) => {
            console.log("server just emitted last 10 message", msgs);
            // time to dispatch an action messages/received would be a good one
            // pass to action creator the messages your server emitted

            store.dispatch(messagesReceived(msgs));
            // dispatch(messagesReceived(msgs));
        });

        socket.on("add-new-message", (msgObj) => {
            // console.log("server just emitted a new msg to add", msgObj);

            // time to dispatch an action message/addNew would be a good one
            store.dispatch(addNewMessage(msgObj));
            // pass to action the object containing the message, and the user info
            // of the author
        });

        socket.on("online-users", (users) => {
            console.log("server just emitted userlist to add", users);
            store.dispatch(addOnlineUsers(users));
        });

        socket.on("join-dm", (userId) => {
            console.log("join-dm userId", userId);

            store.dispatch(openDm(userId));
        });
    }
};
