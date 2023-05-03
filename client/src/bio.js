import { Component } from "react";

export default class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: false,
            draftBio: "",
        };
    }

    //methods
    editBio() {
        console.log("editing bio");
        this.setState({
            showTextArea: true,
            draftBio: this.props.bio,
        });
    }

    handleChange(e) {
        console.log(e.target.value);
        //ARROW FUNCTIONS KEEP THE MEANING OF "THIS" instead of having to binf it inside constructor
        this.setState(
            {
                //left side DYNAMIC thanks to []
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state:", this.state)
        );
    }

    handleSubmit() {
        console.log("submit in BIO was pressed");

        fetch("/updateBio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            //body: JSON.stringify(this.state),
            // send along (this.state.draftBio

            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(
                    "data from fetch post /updateBio: ",
                    data.updatedBio.bio
                );

                this.props.setBioInBio(data.updatedBio.bio);
                this.setState({
                    showTextArea: false,
                });
            })
            .catch((err) => {
                console.log("error handleSubmit ", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="biodiv">
                <h1>
                    {this.props.first} {this.props.last}
                </h1>
                {!this.state.showTextArea && !this.props.bio && (
                    <div>
                        <button onClick={() => this.editBio()}>Add bio</button>
                    </div>
                )}

                {!this.state.showTextArea && this.props.bio && (
                    <div>
                        <h2>{this.props.bio}</h2>

                        <button onClick={() => this.editBio()}>Edit Bio</button>
                    </div>
                )}

                {this.state.showTextArea && (
                    <div className="draftBio">
                        <textarea
                            className="textAreaBio"
                            name="draftBio"
                            placeholder={this.props.bio}
                            onChange={(e) => this.handleChange(e)}
                        ></textarea>
                        <button onClick={() => this.handleSubmit()}>
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

/*

//BIO EDITOR ..
//class component


this.state = {
    showTextArea: false,
    draftBio:""
};

//begining false because they have to click on add or edit button

handleBioChange() {
//WHEN USER TYPES::: CHANGE EVENT fires.. 
//we need to capture everythign user types and store it into draft bio
//whatever is currently happening and could become bio
//necessary because we are going to make post request when press on button and send along with requeset 
//WHATEVER IS STORED IN draftbio

}

submitBio()
{
    //this should run whenever user clicks submit... wheneve33r theyre done writing their bio

    //to do:
    //1- fetch post request and send along the draftbio the user typed... (this.state.draftBio)
    //2- after the draft bio was successfully inserted into the db, make sure the server sends it back to react!
    //once you get it back... this is now the official BIO

    //BUT the official BIO lives in APP! APP holds all the indormation of the user
    //so this information of the official BIO has to be handed over back to app... so that app can store in into its state

    //SO WE NEED TO DECLARE A FUNCITON IN APP... whose sole function is to get back the BIo
    //same thjing with uploader for part 4
}
render() {
    return (
        <div>
{this.state.showTextArea && (
    <div>
<h1>i am the bio editor</h1>
<textarea></textarea>
</div>
)}



<p>
//if the text area is hidden, check to see if there is a bio
//if there is bio, allow user to edit

//if no bio allow nthem to add bio
</p>

        </div>
    )};

    */
