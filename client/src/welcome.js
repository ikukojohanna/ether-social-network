import Registration from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./reset";
import FiberTry from "./fibertry";

export default function Welcome() {
    return (
        <div id="welcome">
            <FiberTry />
            <BrowserRouter>
                <Route exact path="/">
                    <Registration />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/reset">
                    <ResetPassword />
                </Route>
            </BrowserRouter>
        </div>
    );
}
