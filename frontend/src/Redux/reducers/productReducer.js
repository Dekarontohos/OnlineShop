import { ACTION_TYPE } from "../../actions";

const initialProductState = {
	id: null,
	name: null,
	category: null,
	price: null,
	count: null,
	image_url: null,
};

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT_DATA:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
