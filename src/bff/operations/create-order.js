import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
import { createOrder } from "../api";

export const addOrder = async (hash, orderData) => {
	if (hash === null) {
		return { error: "Необходимо авторизоваться.", response: null };
	}

	await createOrder(orderData);

	return { error: null, response: "success" };
};
