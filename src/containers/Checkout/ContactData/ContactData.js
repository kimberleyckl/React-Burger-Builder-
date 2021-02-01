import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredient: this.props.ingredients,
			price: this.props.price, // in real world, for security issue, should calculate the price from server!
			customer: {
				name: "Kimi",
				address: {
					street: "Teststreet 1",
					zipcode: "12345",
					country: "NZ",
				},
				email: "test@test.com",
			},
			deliveryMethod: "fastest",
		};
		axios
			.post("/orders.json", order)
			.then((res) => {
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch((err) => this.setState({ loading: false }));
	};

	render() {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
				<input className={classes.Input} type="email" name="email" placeholder="Your Email" />
				<input className={classes.Input} type="text" name="street" placeholder="Street" />
				<input className={classes.Input} type="texT" name="postalCose" placeholder="Postal Code" />
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
				{/* <Button btnType='Danger' >CANCEL</Button> */}
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}
export default ContactData;
