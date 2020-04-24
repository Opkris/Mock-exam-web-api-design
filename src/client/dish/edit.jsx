import React from "react";
import Dish from "./dish";

export class Edit extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            dish: null,
            error: null
        };

        this.dishId = new URLSearchParams(window.location.search).get("bookId");

        if(this.dishId === null){
            this.state.error = "Unspecified book id";
        }
    }

    componentDidMount(){
        if(this.state.error === null) {
            this.fetchBook();
        }
    }

    async fetchBook(){

        const url = "/api/books/" + this.dishId;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving book: " + err,
                dish: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                dish: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                dish: null
            });
        }
    }


    onOk = async (name, price, allergies, id) => {


        const url = "/api/books/"+id;

        const payload = {id, name, price, allergies};

        let response;

        try {
            response = await fetch(url, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }

        return response.status === 204;
    };


    render(){

        if(this.state.error !== null){
            return(
                <div>
                    <p>Cannot edit Meal. {this.state.error}</p>
                </div>
            );
        }

        if(this.state.dish === null){
            return(<p>Loading...</p>);
        }

        return(
            <div>
                <h3>Edit Dish</h3>
                <Dish
                    name={this.state.dish.name}
                    price={this.state.dish.price}
                    allergies={this.state.dish.allergies}
                    dishId={this.dishId}
                    ok={"Update"}
                    okCallback={this.onOk}
                />
            </div>
        );
    }
}