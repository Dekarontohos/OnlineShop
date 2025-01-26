import { getUser } from "../api";
import { sessions } from "../sessions";

export const autorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return { error: "Пользователь не найден", response: null };
	}

	const { id, login, password, roleId } = user;

	if (authPassword !== password) {
		return { error: "Неверный пароль", response: null };
	}

	return {
		error: null,
		response: {
			session: sessions.create(user),
			id,
			login,
			roleId,
		},
	};
};
