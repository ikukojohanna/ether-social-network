import { useState, useEffect } from "react";

export default function FriendButton(props) {
    //figure out buttentext moment we navigate to /user/some-number
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        //make a fetch request to our server to figure out the intial status of our friendship

        (async () => {
            try {
                //change path name?
                const resp = await fetch(
                    `/api/relationship/` + props.otherUserId
                );
                const data = await resp.json();

                if (data.notFriends) {
                    setButtonText("Make Friend Request");
                } else if (data.accepted) {
                    setButtonText("End Friendship");
                } else if (
                    !data.accepted &&
                    data.sender_id == props.otherUserId
                ) {
                    setButtonText("Accept friend request");
                } else if (
                    !data.accepted &&
                    data.sender_id != props.otherUserId
                ) {
                    setButtonText("Cancel friend request");
                }
            } catch (err) {
                console.log("error fetch FriendButton", err);
            }
        })();
    }, []);

    const handleFriendButton = () => {
        console.log("handlefreidnbutton was pressed");
        console.log({ buttonText });

        try {
            (async () => {
                const resp = await fetch(
                    `/api/friendButton/` + props.otherUserId,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ buttonText }),
                    }
                );
                const data = await resp.json();

                console.log(
                    "data.friendshipRequested",
                    data.friendshipRequested
                );
                console.log("data.buttonText", data.buttonText);
                setButtonText(data.buttonText);
            })();
        } catch (err) {
            console.log("error in posting users' relationship ", err);
        }
    };

    return (
        <div>
            <button onClick={() => handleFriendButton()}>{buttonText}</button>
        </div>
    );
}
