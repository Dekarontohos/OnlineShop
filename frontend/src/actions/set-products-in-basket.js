import { ACTION_TYPE } from "./action-type";

export const setProductsInBasket = (products) => ({
	type: ACTION_TYPE.SET_PRODUCTS_IN_BASKET,
	payload: { products },
});
