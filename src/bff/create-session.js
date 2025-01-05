import { createProduct } from "./session";
import { ROLE } from "../constants";

export const createSession = (roleId) => {
	let session = {
		logout() {
			Object.keys(session).forEach((key) => {
				delete session[key];
			});
		},
	};

	switch (roleId) {
		case ROLE.ADMIN: {
			session.createProduct = createProduct;
			break;
		}
		case ROLE.USER: {
			break;
		}
		default: //ничего не делать
	}

	return session;
};
