import { ACTION_TYPE } from "./action-type";

export const deleteProductInBasket = (product) => ({
	type: ACTION_TYPE.DELETE_PRODUCT_IN_BASKET,
	payload: product,
});
