import { Component } from "react";
import { Link } from "react-router-dom";
//import { BrowserRouter, Route } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 1, // make 1 DYNAMIC

            error: false,
        };
    }
    //keep track of typing in input fields
    handleChange(e) {
        console.log(e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state:", this.state)
        );
    }

    submitEmail() {
        console.log("submitEmail was pressed");
        fetch("/password/reset/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data fromSubmitEmail ", data);

                if (data.success) {
                    this.setState({
                        view: 2,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error RESET fetch request", err);
                this.setState({
                    error: true,
                });
            });
    }

    submitCodeNewPw() {
        console.log("submitEmail was pressed");
        fetch("/password/reset/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data SubmitcodenewPW ", data);

                if (data.success) {
                    this.setState({
                        view: 3,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error CODEPW fetch request", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div>
                <h2> Reset Password</h2>

                {this.state.error && (
                    <h1 className="error">Something went wrong, try again.</h1>
                )}

                {this.state.view === 1 && (
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button onClick={() => this.submitEmail()}>
                            Submit
                        </button>
                    </div>
                )}
                {this.state.view === 2 && (
                    <div>
                        <input
                            type="text"
                            name="code"
                            placeholder="Code"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button onClick={() => this.submitCodeNewPw()}>
                            Submit
                        </button>
                    </div>
                )}
                {this.state.view === 3 && (
                    <div>
                        <h1>view3</h1>

                        <h1>You have successfully reset your password.</h1>

                        <Link to="/login">Back to Login</Link>
                    </div>
                )}
            </div>
        );
    }
}

/*<BrowserRouter>
        <div>
            <Route exact path="/">
                <Registration />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
        </div>
    </BrowserRouter>;*/
