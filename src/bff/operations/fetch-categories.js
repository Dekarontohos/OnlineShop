import { ROLE } from "../../constants/role";
import { getCategories } from "../api";
import { sessions } from "../sessions";

export const fetchCategories = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return { error: "Доступ запрещён.", response: null };
	}

	const categories = await getCategories();

	return { error: null, response: categories };
};
