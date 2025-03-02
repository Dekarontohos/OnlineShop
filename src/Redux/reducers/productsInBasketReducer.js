import { ACTION_TYPE } from "../../actions";

const initialProductsInBasketState =
	JSON.parse(localStorage.getItem("productsInBasket")) || [];

export const productsInBasketReducer = (
	state = initialProductsInBasketState,
	action,
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_IN_BUSKET: {
			let newState;
			const existingProduct = state.find(
				(product) => product.id === action.payload.product.id,
			);
			if (existingProduct) {
				newState = state.map((product) =>
					product.id === action.payload.product.id
						? {
								...product,
								quantity: action.payload.decrease
									? product.quantity - 1
									: product.quantity + 1,
							}
						: product,
				);
			} else
				newState = [
					...state,
					{ ...action.payload.product, quantity: 1 },
				];
			localStorage.setItem("productsInBasket", JSON.stringify(newState));
			return newState;
		}
		case ACTION_TYPE.DELETE_PRODUCT_IN_BUSKET: {
			const newState = state.filter(
				(product) => product.id !== action.payload,
			);
			localStorage.setItem("productsInBasket", JSON.stringify(newState));
			return newState;
		}
		default:
			return state;
	}
};
