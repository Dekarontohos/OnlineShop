import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
import { createProduct } from "../api";

export const addProduct = async (userSession, productData) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return { error: "Доступ запрещён.", response: null };
	}

	await createProduct(productData);

	return { error: null, response: "success" };
};
