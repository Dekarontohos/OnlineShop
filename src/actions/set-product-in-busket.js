import { ACTION_TYPE } from "./action-type";

export const setProductInBusket = (product, decrease) => ({
	type: ACTION_TYPE.SET_PRODUCT_IN_BUSKET,
	payload: { product, decrease },
});
