import { ACTION_TYPE } from "./action-type";

export const setProductInBasket = (product, decrease) => ({
	type: ACTION_TYPE.SET_PRODUCT_IN_BASKET,
	payload: { product, decrease },
});
