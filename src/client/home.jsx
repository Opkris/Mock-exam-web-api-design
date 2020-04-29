import React from "react";
import HeaderBar from "./headerbar";
import {Link, withRouter} from 'react-router-dom';

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sendTo: "",
            amountToSend: "",
            balance: null,
            pokemon: null,
            errorMsg: null
        };
    }

    componentDidMount() {
        this.fetchPokemon();
        this.updateBalance();
    }

    async fetchPokemon() {

        let url = '/api/myPokemons';

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving list of Pokèmon's: " + err,
                pokemon: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                pokemon: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                pokemon: null
            });
        }
    }

    salePokemon = async (id) => {

        const url = "/api/pokemon/" + id;

        let response;

        try {
            response = await fetch(url, {method: "delete"});
        } catch (err) {
            alert("Delete operation failed: " + err + " daimn");
            return false;
        }

        if (response.status !== 204) {
            alert(" !204 Delete operation failed: status code " + response.status);
            return false;
        }

        this.fetchPokemon();

        return true;
    };












    onSendToChange = (event) => {
        this.setState({sendTo: event.target.value});
    };

    onAmountToSendChange = (event) => {
        this.setState({amountToSend: event.target.value});
    };

    transferMoney = async () => {
        if (!this.props.userId) {
            return;
        }

        const url = "/api/transfers";

        const payload = {to: this.state.sendTo, amount: this.state.amountToSend};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.setState({errorMsg: "Invalid userId/password"});
            return;
        }

        if (response.status !== 204) {
            this.setState({
                errorMsg:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        this.updateBalance();
    };

    async updateBalance() {
        const url = "/api/user";

        let response;

        try {
            response = await fetch(url);
        } catch (err) {
            this.setState({
                errorMsg: "ERROR when retrieving balance: " + err,
                balance: null
            });
            return;
        }

        if (response.status === 401) {
            //we are not logged in, or session did timeout
            this.props.updateLoggedInUserId(null);
            return;
        }

        if (response.status === 200) {
            const payload = await response.json();

            this.setState({
                errorMsg: null,
                balance: payload.balance
            });

            this.props.updateLoggedInUserId(payload.userId);
        } else {
            this.setState({
                errorMsg: "Issue with HTTP connection: status code " + response.status,
                balance: null
            });
        }
    }

    dontShowLootBox() {
        return(
          <p></p>
        );
    }

    showLootBox() {
        return(
            <div>
                <Link to={"/lootBox"}>
                    <button className="btn btnM">
                        <i className="fas fa-box"></i>
                    </button>
                </Link>
            </div>
        );
    }

    render() {
        let table;
        let content;

        if (this.state.error !== null) {
            table = <p>{this.state.error}</p>;
        } else if (this.state.pokemon === null || this.state.pokemon.length === 0) {
            table = <p>There is no Pokèmon registered in the database</p>;
        } else {

            table = <div>
                <table className="allPokemons">
                    <thead>
                    <tr>
                        <th>Pokèmon's</th>
                        <th>Price</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.pokemon.map(m =>
                        <tr key={"key_" + m.id} className="onePokemon">
                            <td>{m.name}</td>
                            <td>{m.price}</td>
                            <td>{m.type}</td>
                            <td>
                                <button className="btn btnM" onClick={_ => this.salePokemon(m.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>

                    )}
                    </tbody>
                </table>

            </div>; // end table
        }

        if (this.state.balance < 100) {
            content = this.dontShowLootBox();
        } else {
            content = this.showLootBox();
        }

        return (


            <div>
                <HeaderBar
                    userId={this.props.userId}
                />
                <p>Your balance is currently: {this.state.balance}</p>
                <h2>Your Pokèmon's</h2>
                {content}
                {table}
            </div>

        );// end return
    }// end render
}
export default withRouter(Home);
