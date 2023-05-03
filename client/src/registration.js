import { Component } from "react";

import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = { error: false };
        // this.handleChange = this.handleChange.bind(this); (other optin instead of arrow function)
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
        console.log("submit was pressed");
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from POST/register: ", data);

                if (data.success) {
                    location.reload();
                } else {
                    this.setState({
                        error: true,
                    });
                }
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
            <div className="registrationdiv">
                {this.state.error && (
                    <h1 className="error">Something went wrong, try again.</h1>
                )}
                <input
                    type="text"
                    name="first"
                    placeholder="First Name"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    type="text"
                    name="last"
                    placeholder="Last Name"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.handleSubmit()}>Submit</button>
                <img id="line" src="/linie.png" />
                <div className="links">
                    <Link to="/login">
                        <p> Log in</p>
                    </Link>
                </div>
            </div>
        );
    }
}

// PART3
//secrets json.. copy paste spiced credentials form aws in there
// to verify adress go trhough aws

//we can do this for conditional rendering
//{this.state.view.1 && (<p></p>)
//}

//OR
//if (this.state.view === 1) // in notes
