import { ACTION_TYPE } from "../../actions";

const initialProductOnEditionState = {
	id: null,
	name: null,
	category: null,
	price: null,
	count: null,
	image_url: null,
};

export const productOnEditionReducer = (
	state = initialProductOnEditionState,
	action,
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_EDITING_PRODUCT: {
			if (action.payload.id === state.id) {
				return initialProductOnEditionState;
			} else {
				return {
					...state,
					...action.payload,
				};
			}
		}
		default:
			return state;
	}
};
