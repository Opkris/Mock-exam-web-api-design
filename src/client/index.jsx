import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Home} from "./home";
import Login from "./login";
import SignUp from "./signup";
import {LootBox} from "./lootBox";
import {DescriptionPage} from "./descriptionPage";


export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userCount: 1
        };
    }

    componentDidMount() {
        this.fetchAndUpdateUserInfo();
    }

        fetchAndUpdateUserInfo = async () => {

        const url = "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            //that is ok
            this.updateLoggedInUserId(null);
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();
            this.updateLoggedInUserId(payload);
        }
    };


    updateLoggedInUserId = (userId) => {
        this.setState({userId: userId});
    };

    notFound() {

        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );

    };

    render() {


        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       userId={this.state.userId}
                                                       updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        userId={this.state.userId}
                                                        updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/home"
                               render={props => <Home {...props}
                                                      userId={this.state.userId}
                                                      updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/"
                               render={props => <DescriptionPage {...props}
                                                                 userId={this.state.userId}
                                                                 updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/descriptionPage"
                               render={props => <DescriptionPage {...props}
                                                                 userId={this.state.userId}
                                                                 updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/lootBox"
                               render={props => <LootBox {...props}
                                                         userId={this.state.userId}
                                                         updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById("root"));
