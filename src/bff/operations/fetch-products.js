import { ROLE } from "../../constants/role";
import { getProducts } from "../api";
import { sessions } from "../sessions";

export const fetchProducts = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return { error: "Доступ запрещён.", response: null };
	}

	const products = await getProducts();

	return { error: null, response: products };
};
