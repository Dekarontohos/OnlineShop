import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
import { deleteProduct } from "../api";

export const removeProduct = async (hash, id) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return { error: "Доступ запрещён.", response: null };
	}

	await deleteProduct(id);

	return { error: null, response: "success" };
};
