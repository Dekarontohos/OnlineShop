import { ACTION_TYPE } from "./action-type";

export const setEditingProduct = (product) => ({
	type: ACTION_TYPE.SET_EDITING_PRODUCT,
	payload: product,
});
