import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = { error: false };
    }

    handleChange(e) {
        console.log(e.target.value);

        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state:", this.state)
        );
    }

    handleSubmit() {
        console.log("submit was pressed");
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                // console.log("data from POST/login: ", data);

                if (data.success) {
                    location.replace("/");
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
            <div className="logindiv">
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.handleSubmit()}>Login</button>
                <div className="links">
                    <Link to="/reset">
                        <p>Forgot your password?</p>
                    </Link>
                    <img id="line" src="/linie.png" />
                    <Link to="/">
                        <p>Sign up</p>
                    </Link>
                    {this.state.error && (
                        <h1 className="error">
                            Something went wrong, try again.
                        </h1>
                    )}
                </div>
            </div>
        );
    }
}
