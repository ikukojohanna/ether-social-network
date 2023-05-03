import Chatrooms from "./chatrooms";
//import Profile from "./profile";
import { useState } from "react";
import { socket } from "./socket";
import ClickApp from "./objectsclickapp";
import { useEffect } from "react";
export default function ChatWindow(props) {
    const [channel, setChannel] = useState("");
    const [planetClicked, setPlanetClicked] = useState(false);
    useEffect(() => {
        history.onpushstate = function (event) {
            //   console.log("slice:::", location.pathname.slice(1));
            // console.log("event state", event.state);

            if (event.state == "logoutwin") {
                console.log("logout was clicked");
                setPlanetClicked(false);
            }

            if (event.state == "empty") {
                setPlanetClicked(false);
            }
            if (
                event.state == "arrakis" ||
                event.state == "solaris" ||
                event.state == "philia" ||
                event.state == "lv-426" ||
                event.state == "vogsphere" ||
                event.state == "dagobah"
            ) {
                setPlanetClicked(true);
                socket.emit("join-room", event.state);
            }
        };
    }, []);

    return (
        <div>
            <div className="clickappdiv">
                <ClickApp />
            </div>

            {planetClicked && (
                <div className="chatdiv">
                    <Chatrooms
                        userId={props.userId}
                        setChannel={setChannel}
                        channel={channel}
                    />
                </div>
            )}
        </div>
    );
}

/* <div className="roomsli">
                            <p onClick={handleClickGeneral}>General</p>
                            <p onClick={handleClickArakis}>Arakis</p>
                            <p onClick={handleClickSolaris}>Solaris</p>
                        </div>*/
