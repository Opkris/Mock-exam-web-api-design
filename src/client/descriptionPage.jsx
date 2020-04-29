import React from "react";
import HeaderBar from "./headerbar";
import {Link, withRouter} from 'react-router-dom';

export class DescriptionPage extends React.Component {
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

        let url = '/api/allPokemons';

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

    render() {

        let table;

        if (this.state.error !== null) {
            table = <p>{this.state.error}</p>;
        } else if (this.state.pokemon === null || this.state.pokemon.length === 0) {
            table = <p>There is no Menu registered in the database</p>;
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
                        </tr>
                    )}
                    </tbody>
                </table>

            </div>; // end table
        }
        return (


            <div>
                <HeaderBar
                    userId={this.props.userId}
                    updateLoggedInUserId={this.props.updateLoggedInUserId}
                />
                <div className="mainContent">
                </div>
                    <p>Your balance is currently: {this.state.balance}</p>
                    <h2>Pokèmon Available</h2>
                    {table}
                </div>

        );// end return
    }// end render
}
