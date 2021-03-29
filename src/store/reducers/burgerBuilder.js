// import { nativeTouchData } from "react-dom/test-utils";
import * as actionTypes from "../actions/actionTypes";

const initial_state = {
	ingredients: null,
	totalPrice: 4,
	error: false,
};

const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

const reducer = (state = initial_state, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
				//something
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
				//something
			};
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				// ingredients: action.ingredients,         // this is more flexible but the position of ingredients not what we want!
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				totalPrice: 4,
				error: false,
			};
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			};

		default:
			return state;
	}
};

export default reducer;
