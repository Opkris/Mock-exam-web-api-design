import React from "react";
import {Link} from "react-router-dom";


export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }


    render() {
        const user = this.props.user;

        return (
            <div>
                <div>
                    <h2>Sweet Escape</h2>

                    <p>
                        Welcome to the Sweet Escape!
                        Here are a list for this weeks menu
                    </p>

                    <div className="left_menu">
                        <div className="appetizer_menu">
                            <h2>-Appetizer-</h2>

                            <p> 1 food </p>
                            <p> 2 food </p>
                            <p> 3 food </p>
                            <p> 4 food </p>
                            <p> 5 food </p>
                        </div>

                        <div className="salad_menu">
                            <h2>-Salad-</h2>

                            <p> 1 food </p>
                            <p> 2 food </p>
                            <p> 3 food </p>
                            <p> 4 food </p>
                            <p> 5 food </p>


                        </div>
                    </div>

                    <div className="middle_menu">
                        <div className="main_dish_menu">
                            <h2>-Main Dish-</h2>

                            <p> 1 food </p> <p>-0.00$</p>
                            <p> 2 food </p>
                            <p> 3 food </p>
                            <p> 4 food </p>
                            <p> 5 food </p>
                            <p> 6 food </p>
                            <p> 7 food </p>
                            <p> 8 food </p>
                            <p> 9 food </p>
                            <p> 10 food </p>

                        </div>
                    </div>

                    <div className="right_menu">
                        <div className="pizza_menu">
                            <h2>-Pizza-</h2>

                            <p> 1 food </p>
                            <p> 2 food </p>
                            <p> 3 food </p>
                            <p> 4 food </p>
                            <p> 5 food </p>


                        </div>
                        <div className="drink_menu">
                            <h2>-Drink-</h2>
                            <p> 1 food </p>
                            <p> 2 food </p>
                            <p> 3 food </p>
                            <p> 4 food </p>
                            <p> 5 food </p>


                        </div>
                    </div>
                </div>


                {user ? (
                    <div>
                        <div className="btnPart">
                            <Link to={"/match"} className={"btn"}>
                                Play
                            </Link>
                        </div>
                        <p>Victories: {user.victories}</p>
                        <p>Defeats: {user.defeats}</p>
                    </div>
                ) : (
                    <p></p>
                )}

            </div>
        );
    }
}
