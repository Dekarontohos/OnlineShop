import { ACTION_TYPE } from "../../actions";
import { request } from "../../utils/request";

const initialProductsInBasketState = sessionStorage.getItem("userData")
	? JSON.parse(sessionStorage.getItem("userData")).basket
	: localStorage.getItem("productsInBasket")
		? JSON.parse(localStorage.getItem("productsInBasket"))
		: [];

export const productsInBasketReducer = (
	state = initialProductsInBasketState,
	action,
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_IN_BASKET: {
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
			const userDataString = sessionStorage.getItem("userData");
			if (userDataString) {
				const userData = JSON.parse(userDataString);
				request(`/users/${userData.id}/basket`, "PATCH", {
					basket: newState.map((state) => {
						return { product: state.id, quantity: state.quantity };
					}),
				}).then((res) => {
					userData.basket = res.data;
					sessionStorage.setItem(
						"userData",
						JSON.stringify(userData),
					);
				});
			} else {
				localStorage.setItem(
					"productsInBasket",
					JSON.stringify(newState),
				);
			}
			return newState;
		}
		case ACTION_TYPE.DELETE_PRODUCT_IN_BASKET: {
			const newState = state.filter(
				(product) => product.id !== action.payload,
			);
			const userDataString = sessionStorage.getItem("userData");
			if (userDataString) {
				const userData = JSON.parse(userDataString);
				request(`/users/${userData.id}/basket`, "PATCH", {
					basket: newState.map((state) => {
						return { product: state.id, quantity: state.quantity };
					}),
				}).then((res) => {
					userData.basket = res.data;
					sessionStorage.setItem(
						"userData",
						JSON.stringify(userData),
					);
				});
			} else {
				localStorage.setItem(
					"productsInBasket",
					JSON.stringify(newState),
				);
			}
			return newState;
		}
		case ACTION_TYPE.CLEARE_BASKET: {
			const newState = [];
			const userDataString = sessionStorage.getItem("userData");
			if (userDataString) {
				const userData = JSON.parse(userDataString);
				request(`/users/${userData.id}/basket`, "PATCH", {
					basket: newState.map((state) => {
						return { product: state.id, quantity: state.quantity };
					}),
				}).then((res) => {
					userData.basket = res.data;
					sessionStorage.setItem(
						"userData",
						JSON.stringify(userData),
					);
				});
			} else {
				localStorage.setItem(
					"productsInBasket",
					JSON.stringify(newState),
				);
			}
			return newState;
		}
		case ACTION_TYPE.SET_PRODUCTS_IN_BASKET: {
			const newState = [...action.payload.products];
			return newState;
		}
		default:
			return state;
	}
};
