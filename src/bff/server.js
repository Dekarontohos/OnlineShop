import { getUser } from "./get-user";
import { createUser } from "./create-user";
import { sessions } from "./sessions";

export const server = {
	async logout(session) {
		sessions.remove(session);
	},

	async autorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return { error: "Пользователь не найден", response: null };
		}

		if (authPassword !== user.password) {
			return { error: "Неверный пароль", response: null };
		}

		return {
			error: null,
			response: {
				session: sessions.create(user),
				id: user.id,
				login: user.login,
				roleId: user.role,
			},
		};
	},

	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);

		if (user) {
			return { error: "Логин уже занят", response: null };
		}

		await createUser(regLogin, regPassword);

		return {
			error: null,
			response: {
				session: sessions.create(user),
				id: user.id,
				login: user.login,
				roleId: user.role,
			},
		};
	},
};
