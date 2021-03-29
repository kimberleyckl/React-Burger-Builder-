import * as actionTypes from "../actions/actionTypes";

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			console.log("init");

			return {
				...state,
				purchased: false,
			};
		case actionTypes.PURCHASE_BURGER_START:
			console.log("start");

			return {
				...state,
				loading: true,
			};

		case actionTypes.PURCHASE_BURGER_SUCCESS:
			console.log("success");
			const newOrder = {
				...action.orderData,
				id: action.orderId,
			};
			return {
				...state,
				purchased: true,
				loading: false,
				orders: state.orders.concat(newOrder),
			};

		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default reducer;
