import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
import { updateProduct } from "../api";

export const changeProduct = async (userSession, productData) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return { error: "Доступ запрещён.", response: null };
	}

	await updateProduct(productData);

	return { error: null, response: "success" };
};
