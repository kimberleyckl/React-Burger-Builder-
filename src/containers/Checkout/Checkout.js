import React, { Component } from "react";
import CheckoutSum from "../../components/Order/CheckoutSum/CheckoutSum";

class Checkout extends Component {
	state = {
		ingredients: {
			salad: 1,
			meat: 1,
			cheese: 2,
			bacon: 1,
		},
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		for (let param of query.entries()) {
			ingredients[param[0]] = +param[1]; //the "+" is make sure convert it to number
		}
		this.setState({ ingredients: ingredients });
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		return (
			<div>
				<CheckoutSum
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
			</div>
		);
	}
}

export default Checkout;
