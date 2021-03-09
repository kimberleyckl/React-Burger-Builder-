import { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
	state = {
		// ingredients: null,
		// ingredients:{
		//     salad: 0,
		//     cheese: 0,
		//     meat: 0,
		//     bacon: 0,
		// },
		// totalPrice: 4,
		// purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	// componentDidMount() {
	// 	axios
	// 		.get("https://react-burger-kimikikiwi-default-rtdb.firebaseio.com/ingredients.json")
	// 		.then((res) => {
	// 			this.setState({ ingredients: res.data });
	// 		})
	// 		.catch((err) => {
	// 			this.setState({ error: true });
	// 		});
	// }

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	// addIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients,
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceAddition = INGREDIENT_PRICE[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const updatedPrice = oldPrice + priceAddition;
	// 	this.setState({
	// 		ingredients: updatedIngredients,
	// 		totalPrice: updatedPrice,
	// 	});
	// 	this.updatePurchaseState(updatedIngredients);
	// };

	// removeIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const updatedCount = oldCount - 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients,
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceDeduction = INGREDIENT_PRICE[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const updatedPrice = oldPrice - priceDeduction;
	// 	this.setState({
	// 		ingredients: updatedIngredients,
	// 		totalPrice: updatedPrice,
	// 	});
	// 	this.updatePurchaseState(updatedIngredients);
	// };

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.history.push("/checkout");
	};

	render() {
		const disableInfo = {
			...this.props.ings,
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}
		// {salad: true, meat: false, ...}

		let orderSum = null;

		let burger = this.state.error ? <p>ingredient can't be loaded</p> : <Spinner />;
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded} // onIngredientAdded(ings): the ings is passed in BuildControls.js (Line 20)
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disableInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
						orderClicked={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSum = (
				<OrderSummery
					ingredients={this.props.ings}
					purchaseCancel={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					totalPrice={this.props.price}
				/>
			);
		}
		if (this.state.loading) {
			orderSum = <Spinner />;
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSum}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
