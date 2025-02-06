import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
import { updateProduct } from "../api";

export const changeProduct = async (hash, productData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return { error: "Доступ запрещён.", response: null };
	}

	await updateProduct(productData);

	return { error: null, response: "success" };
};
