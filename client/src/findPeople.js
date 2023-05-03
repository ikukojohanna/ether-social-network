import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FindPeople() {
    console.log("find people component here");

    const [searchUsers, setsearchUsers] = useState("");
    //recent users doens't only include the 3 most recent ones.. change name?
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        //this loads when component mounts
        //useEffect second argument....empty array to make it only happen once... can also put id...
        let abort = false;
        (async () => {
            try {
                const respBody = await fetch(
                    "/users/?findUsers=" + searchUsers
                );
                const data = await respBody.json();
                console.log("data", data);
                if (!abort) {
                    setRecentUsers(data);
                } else {
                    console.log("ignore don't run a a state update");
                    //error message?
                }
            } catch (err) {
                console.log("err on fetch spicedworld");
            }
        })(); // this closes the async iife

        return () => {
            // this function runs, whenever there is another useEffect that gets
            // triggered after the initial one
            console.log("cleanup running");
            abort = true;
        };
    }, [searchUsers]);

    //here fetch request to match users to input

    return (
        <div className="searchdiv">
            <input
                className="searchinput"
                onChange={(e) => setsearchUsers(e.target.value)}
                name="findUsers"
                value={searchUsers}
                placeholder="Search Users"
            />
            <div className="searchresult">
                {recentUsers &&
                    recentUsers.map((recentUser, idx) => {
                        return (
                            <div className="recentUsersdiv" key={idx}>
                                <Link to={`/user/${recentUser.id}`}>
                                    <img
                                        className="recentUsersImg"
                                        src={
                                            recentUser.imageurl ||
                                            "/default.png"
                                        }
                                    />
                                    <p>
                                        {recentUser.first} {recentUser.last}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

/*    {this.recentUsers &&
                this.recentUsers.map((recentUser, i) => {
                    // console.log("country", country);
                    // console.log("i", i);
                    return <li key={i}>{recentUser}</li>;
                })} 
                
                
                 {this.recentUsers.map((user) => (
                <div key={user.id}> </div>
            ))}*/
