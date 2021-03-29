import React, { Component } from "react";
import CheckoutSum from "../../components/Order/CheckoutSum/CheckoutSum";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		let summery = <Redirect to="/" />;
		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
			summery = (
				<div>
					{console.log(this.props.purchased)}
					{purchasedRedirect}
					<CheckoutSum
						ingredients={this.props.ings}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route path={this.props.match.url + "/contact-data"} component={ContactData} />
				</div>
			);
		}
		return summery;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
		// price: state.totalPrice,
	};
};

export default connect(mapStateToProps)(Checkout);
