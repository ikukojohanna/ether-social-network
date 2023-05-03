// reducer for messages

export default function onlineReducer(onlineUsers = [], action) {
    if (action.type === "online/received") {
        console.log(
            "action.pazload .users inside reducer: ",
            action.payload.users
        );
        onlineUsers = action.payload.users;
    }

    return onlineUsers;
}

//actioncreators

export function addOnlineUsers(users) {
    console.log("users in action creator", users);
    return {
        type: "online/received",
        payload: { users },
    };
}
