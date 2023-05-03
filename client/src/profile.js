//import ProfilePic from "./profilepic";
import Bio from "./bio";

export default function Profile(props) {
    return (
        <div className="profilediv">
            <div className="profilepicdiv">
                <img
                    id="profilepicProfile"
                    src={props.imageUrl || "/default.png"}
                    onClick={() => props.passDownToggleModal()}
                ></img>
            </div>
            <Bio
                bio={props.bio}
                first={props.first}
                last={props.last}
                setBioInBio={(arg) => props.setBioInProfile(arg)}
            />
        </div>
    );
}
/*
<ProfilePic
    first={props.first}
    last={props.last}
    imageUrl={props.imageUrl}
    alt={`${props.first} ${props.last}`}
/>;*/

//now we havre access to
//props.setBioInProfile()

//or destructuring... {first}
//update presentational from yesterdaa yto profilepic

//----- at this point profile pic needs image url
//pass down... but app cant give it to profilepic directly becasue profile is in between
//only direct child
//grandchildren of componenent.. app gives to profile... and progile gives to profilepic
//gives down first last and imageUrl

//props always signifies what doesnt belong to you but got passed down from your parents
//BE CONSISTENT ON LEFTHAND SiDE!!! of props

//for editor: first check if user has a bio
//if they dont have bio... render "add oyur bio"

//USE STATE... class component... for editor
//conditional rendering
//if

//<ProfilePic first={props.first} last={props.last} imageUrl={props.imageUrl} />;
