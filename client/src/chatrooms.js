import { useSelector } from "react-redux";
import { socket } from "./socket";
import { useEffect, useRef } from "react";

export default function Chatrooms() {
    const messages = useSelector((state) => state.messages);
    const onlineUsers = useSelector((state) => state.online);
    const dm = useSelector((state) => state.dm);

    const chatContainerRef = useRef();
    /*
    const rooms = [
        { name: "general" },
        { name: "Arakis" },
        { name: "Solaris" },
    ];*/

    //console.log("messages in chat component", messages);
    console.log("onlineusers in chat component", onlineUsers);
    console.log("rooms in chat component", messages);
    console.log("messages[0]in chat component", messages[0]);
    console.log("dm other user in chat component", dm.otherUser);
    /*
    useEffect(() => {
        socket.emit("join-room", "general");
        console.log("useeffect join general");
    }, []);*/

    useEffect(() => {
        // on first mount and every time a new message gets added
        // we want to adjust our elements scrollTop to be the scrollHeight minus height
        // of the element, as that means we are scrolled to the bottom msg

        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight -
            chatContainerRef.current.clientHeight;
    }, [messages]);

    const keyCheck = (e) => {
        // console.log("what was pressed:", e.key);

        //CHECK IF PRIVATE DM!!!
        //HOW???

        if (e.key === "Enter") {
            e.preventDefault();
            //  console.log("what's the value of our input field", e.target.value);
            // time to let the server there is a new message

            if (messages[0] && messages[0].room) {
                const keyCheckObject = {
                    message: e.target.value,
                    room: messages[0].room,
                };
                console.log("keyCheckObject", keyCheckObject);
                socket.emit("new-message", keyCheckObject);
            } else {
                const keyCheckObject = {
                    message: e.target.value,
                    user: dm.otherUser,
                };
                console.log("keyCheckObject", keyCheckObject);
                socket.emit("new-dm", keyCheckObject);
            }

            // after emitting our msg, we clear the textarea
            e.target.value = "";
        }
    };

    const handleClickUser = (dmuserid, dmusername) => {
        console.log(`${dmusername} with ${dmuserid}has been clicked`);
        socket.emit("dm", dmuserid);
    };

    return (
        <>
            <div className="chatmiddle">
                {messages[0] && (
                    <h2>{messages[0]?.room || messages[0]?.otherUser} </h2>
                )}

                <div className="container-chat" ref={chatContainerRef}>
                    {messages.map((message) => {
                        return (
                            <div className="chatline" key={message.id}>
                                <img
                                    className="messageImg"
                                    src={message.imageurl || "/default.png"}
                                />

                                <div className="chattext">
                                    <p className="chatname">
                                        {message.first} {message.last}
                                    </p>
                                    <p className="chatmessage">
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    {!messages[0] && <p>Start a conversation</p>}
                </div>
            </div>
            <div className="chatright">
                <div className="container-online">
                    <div className="titleandspot">
                        <h2>Online users:</h2>
                    </div>

                    <div className="onlineusersdiv">
                        {onlineUsers.map((user) => {
                            return (
                                <div
                                    onClick={() =>
                                        handleClickUser(user.id, user.first)
                                    }
                                    className="onlineuserli"
                                    key={user.id}
                                >
                                    <img
                                        className="onlineImg"
                                        src={user.imageurl}
                                    />{" "}
                                    <div className="ring-container">
                                        <div className="ringring"></div>
                                        <div className="circle"></div>
                                    </div>
                                    <p>
                                        {user.first} {user.last}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <textarea
                    onKeyDown={keyCheck}
                    className="textAreaChat"
                    name="textAreaChat"
                    placeholder="Your message..."
                ></textarea>
            </div>
        </>
    );
}

/* {rooms.map((room) => {
                        return (
                            <div className="channel" key={room.name}>
                                <p onClick={handleRoomClick()}>{room.name}</p>
                            </div>
                        );
                    })}*/

/*
   {rooms.room && (
                    <div className="chatline" key={rooms.messages}>
                        {rooms.messages}
                    </div>
                )}
*/
