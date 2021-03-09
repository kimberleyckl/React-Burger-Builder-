import React, { Component } from "react";
import CheckoutSum from "../../components/Order/CheckoutSum/CheckoutSum";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
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
					ingredients={this.props.ings}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route path={this.props.match.url + "/contact-data"} component={ContactData} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		// price: state.totalPrice,
	};
};

export default connect(mapStateToProps)(Checkout);
