import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
import { createProduct } from "../api";

export const addProduct = async (hash, productData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return { error: "Доступ запрещён.", response: null };
	}

	await createProduct(productData);

	return { error: null, response: "success" };
};
