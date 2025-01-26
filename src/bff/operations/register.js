import { createUser, getUser } from "../api";
import { sessions } from "../sessions";

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);

	if (existedUser) {
		return { error: "Логин уже занят", response: null };
	}

	const user = await createUser(regLogin, regPassword);

	return {
		error: null,
		response: {
			session: sessions.create(user),
			id: user.id,
			login: user.login,
			roleId: user.roleId,
		},
	};
};
