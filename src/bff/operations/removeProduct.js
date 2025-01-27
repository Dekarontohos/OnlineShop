import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
import { deleteProduct } from "../api";

export const removeProduct = async (userSession, id) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return { error: "Доступ запрещён.", response: null };
	}

	await deleteProduct(id);

	return { error: null, response: "success" };
};
