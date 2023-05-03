import { useState, useEffect } from "react";
import FriendButton from "./friendButton";

import { useHistory, useParams } from "react-router";
export default function OtherProfile() {
    const [user, setUser] = useState({});
    const { otherUserId } = useParams();
    //otherUserId is name path of the Route in app.js
    //otherUserId is id we want to fetch information for

    const history = useHistory();
    // console.log("history:", history);

    useEffect(() => {
        let abort = false;
        if (isNaN(parseInt(otherUserId))) {
            setUser(false);
            return;
        }

        (async () => {
            try {
                const respBody = await fetch("/api/user/" + otherUserId);
                const data = await respBody.json();
                console.log("data", data);

                if (otherUserId == data.currentUserId) {
                    console.log(
                        "need to change UI trying to access our own profile"
                    );
                    history.push("/");
                } else if (data.noMatch) {
                    setUser(false);
                    console.log("nomatch3");
                } else if (!abort) {
                    setUser(data);
                } else {
                    console.log("ignore don't run a state update");
                }
            } catch (err) {
                console.log("ERROR fetch request otherProfile", err);
            }
        })();

        return () => {
            abort = true;
        };
    }, []);

    return (
        <>
            {user && (
                <div className="otherprofilediv">
                    <div className="otherprofilepicdiv">
                        <img
                            className="otherprofileimg"
                            src={user.imageurl || "/default.png"}
                        />
                    </div>
                    <div className="otherprofilebio">
                        <h1>
                            {user.first} {user.last}
                        </h1>

                        <h2>{user.bio} </h2>

                        <FriendButton otherUserId={otherUserId} />
                    </div>
                </div>
            )}
        </>
    );
}
