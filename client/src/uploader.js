// MAKE UPLOADER LOOK LIKE A MODAL WITH CSS!!

import { Component } from "react";
//in classes you need to pass prop argument in both constructor and super
export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("uploader jsut mounted");
    }
    //change name of function
    //used to be called:  methodInUploader
    uploadImg(e) {
        console.log("method in uploader running");

        e.preventDefault();

        console.log("handle SUBMIT");

        fetch("/upload", {
            method: "POST",
            //e.target is our form
            body: new FormData(e.target),
            //create formdata out of is... encoded it the right way so the surver can pick it up
            //this is what function was doing in backgroubd before we prevented default behavior thats why we have to do it manually
        })
            .then((res) => {
                //console.log("response from server after FETCH/UPLOAD", res);
                return res.json();
            })
            .then((data) => {
                // console.log(data);
                console.log("uploadedImg", data.uploadedImg);
                //this.images.unshift(data.uploadedImg);
                this.props.setProfilePic(data.uploadedImg.imageurl);
                this.props.passDownToggleModal();
                console.log("reultquery? upload", data);
                console.log("img url after upload:", data.uploadedImg.imageurl);
            })
            .catch((err) => {
                console.log("error in FETCH/UPLOAD ", err);
            });

        //here fd.append(image?? )
        //which will be key value pair conencting to app.post(/uplpoad)

        //before we call methodInAPp
        //we need to work with formData
        //we need to make fetch reqwuest to insert pic into database, get it back
        //ONly then we call this.props.methodInApp and pass it img url as argument

        //call function that lives in app via props

        //make sure new image... GET AFTER it was inserted (and returned)... in case something went wrong with database
        //  this.props.methodInApp("whoawa");
        //After this.... methodInApp will run with argument whoawa
        //click something that lives in child BUT ends up running a funciton that lives in the parent WHILE passing it an argrument

        //HERE is also where we hide uploader again .. call the func in app that is responsible for toggling uploader
        //PASS DOWN ANOTHER FUNCTION AS PROP
    }
    render() {
        return (
            <div className="uploaderdiv">
                <img
                    id="uploaderimg"
                    src={this.props.imageUrl || "/default.png"}
                />
                <img id="line" src="/linie.png" />

                <div className="uploaderbuttons">
                    <form onSubmit={(e) => this.uploadImg(e)}>
                        <label htmlFor="chooseImg">
                            {" "}
                            Update profile picture
                        </label>
                        <input
                            id="chooseImg"
                            name="image"
                            type="file"
                            accept="image/*"
                            required
                        />
                        <button>Submit</button>
                    </form>
                </div>
                <div
                    onClick={() => this.props.passDownToggleModal()}
                    className="close"
                >
                    X
                </div>
            </div>
        );
    }
}

//uploader is responsible for funnctionitly of uploadiung
//but once that is done ive information back to parent app.... because thats where it's stored

//write a funciton that you can call in the child.. pass it down
// <h3 onClick={(e) => this.uploadImg(e)}>click her for methodInUploader</h3>;
