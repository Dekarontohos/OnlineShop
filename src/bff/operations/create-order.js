import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
import { createOrder } from "../api";

export const addOrder = async (hash, orderData) => {
	const accessRoles = [ROLE.ADMIN, ROLE.USER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return { error: "Необходимо авторизоваться.", response: null };
	}

	await createOrder(orderData);

	return { error: null, response: "success" };
};
