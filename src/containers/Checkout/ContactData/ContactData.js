import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
	};

	orderHandler = () => {
		console.log("a");
	};

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
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
			</div>
		);
	}
}
export default ContactData;
