import { getUser } from "./get-user";
import { createuser } from "./create-user";
import { createSession } from "./create-session";

export const server = {
	async autorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return { error: "Пользователь не найден", response: null };
		}

		if (authPassword !== user.password) {
			return { error: "Неверный пароль", response: null };
		}

		const session = {
			logout() {
				Object.keys(session).forEach((key) => {
					delete session[key];
				});
			},
		};

		return {
			error: null,
			response: createSession(user.role),
		};
	},
	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);

		if (user) {
			return { error: "Логин уже занят", response: null };
		}

		await createuser(regLogin, regPassword);

		const session = {
			logout() {
				Object.keys(session).forEach((key) => {
					delete session[key];
				});
			},
		};

		return { error: null, response: createSession(user.role) };
	},
};
