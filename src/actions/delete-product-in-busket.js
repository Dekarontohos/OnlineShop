import { ACTION_TYPE } from "./action-type";

export const deleteProductInBusket = (product) => ({
	type: ACTION_TYPE.DELETE_PRODUCT_IN_BUSKET,
	payload: product,
});
